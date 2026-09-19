"""Source-preserving UTF-8 Markdown -> embedded-CJK PDF, with mandatory QA.

No research, editing, web requests, or content summarization occurs here.
Uses the already bundled marked lexer, ReportLab, pypdf and PDFium/Poppler.
"""
from __future__ import annotations

import argparse
from collections import Counter
from functools import partial
import hashlib
import html
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas
from reportlab.platypus import (
    HRFlowable, Image, KeepTogether, Paragraph, SimpleDocTemplate,
    Spacer, Table, TableStyle,
)
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parent
RUNTIME = Path(os.environ.get('USERPROFILE', str(Path.home()))) / '.cache/codex-runtimes/codex-primary-runtime/dependencies'
INK = colors.HexColor('#183138')
TEAL = colors.HexColor('#006E76')
MUTED = colors.HexColor('#56656A')
PALE = colors.HexColor('#ECF3F2')
PAGE_W, PAGE_H = 210 * mm, 297 * mm
MARGIN = 17 * mm
CONTENT_W = PAGE_W - 2 * MARGIN


def normalize(text):
    return re.sub(r'\s+', '', text)


class Builder:
    def __init__(self, source, regular, bold):
        self.source = source
        self.regular = regular
        self.bold = bold
        self.expected_blocks = []
        self.expected_links = []
        self.images = []
        self.missing = set()
        self.styles = {}
        pdfmetrics.registerFont(TTFont('CJKRegular', str(regular), subfontIndex=0))
        pdfmetrics.registerFont(TTFont('CJKBold', str(bold), subfontIndex=0))
        pdfmetrics.registerFontFamily('CJKRegular', normal='CJKRegular', bold='CJKBold', italic='CJKRegular', boldItalic='CJKBold')
        # Italic CJK deliberately uses the regular face: the exact characters are preserved.
        self.cmaps = {name: pdfmetrics.getFont(name).face.charToGlyph for name in ['CJKRegular', 'CJKBold']}
        self.fallbacks = {False: [], True: []}
        for name, filename, weight in [
            ('UnicodeRegular', 'arial.ttf', False), ('UnicodeBold', 'arialbd.ttf', True),
            ('UnicodeSymbols', 'seguisym.ttf', None),
        ]:
            font_path = regular.parent / filename
            if font_path.is_file():
                pdfmetrics.registerFont(TTFont(name, str(font_path)))
                self.cmaps[name] = pdfmetrics.getFont(name).face.charToGlyph
                if weight is None:
                    self.fallbacks[False].append(name); self.fallbacks[True].append(name)
                else:
                    self.fallbacks[weight].append(name)
        configs = {
            'body': dict(fontSize=11, leading=18.4, spaceAfter=8),
            'h1': dict(fontName='CJKBold', fontSize=22, leading=31, spaceAfter=14, spaceBefore=6, keepWithNext=True),
            'h2': dict(fontName='CJKBold', fontSize=15, leading=23, spaceAfter=9, spaceBefore=13, keepWithNext=True, textColor=TEAL),
            'h3': dict(fontName='CJKBold', fontSize=12.5, leading=19, spaceAfter=8, spaceBefore=10, keepWithNext=True),
            'cell': dict(fontSize=9, leading=14, spaceAfter=0, wordWrap='LTR'),
            'tablehead': dict(fontName='CJKBold', fontSize=9, leading=14, textColor=colors.white, spaceAfter=0, wordWrap='LTR'),
            'code': dict(fontSize=9.5, leading=15.5, spaceAfter=9, backColor=PALE, borderPadding=7),
            'quote': dict(fontSize=10.5, leading=17.5, leftIndent=12, rightIndent=8, textColor=MUTED, spaceAfter=9, borderColor=TEAL, borderWidth=0.5, borderPadding=7),
        }
        for name, cfg in configs.items():
            defaults = dict(fontName='CJKRegular', textColor=INK, wordWrap='CJK', allowWidows=0, allowOrphans=0, splitLongWords=1)
            defaults.update(cfg)
            self.styles[name] = ParagraphStyle(name, **defaults)

    def checked(self, text, bold=False, preserve_spaces=False):
        text = html.unescape(text)
        font = 'CJKBold' if bold else 'CJKRegular'
        runs = []
        for ch in text:
            selected = font
            if not ch.isspace() and ord(ch) not in self.cmaps[selected]:
                selected = next((candidate for candidate in self.fallbacks[bold] if ord(ch) in self.cmaps[candidate]), None)
                if selected is None:
                    self.missing.add(f'{ch} U+{ord(ch):04X} ({font})')
                    selected = font
            if runs and runs[-1][0] == selected:
                runs[-1][1] += ch
            else:
                runs.append([selected, ch])
        output = []
        for selected, run in runs:
            escaped = html.escape(run, quote=False)
            if preserve_spaces:
                escaped = escaped.replace(' ', '&#160;').replace('\n', '<br/>')
            output.append(escaped if selected == font else f'<font name="{selected}">{escaped}</font>')
        return ''.join(output)

    def inlines(self, tokens, bold=False):
        output, plain = [], []
        for token in tokens:
            kind = token['type']
            if kind in ('text', 'escape'):
                if token.get('tokens'):
                    rich, raw = self.inlines(token['tokens'], bold)
                    output.append(rich); plain.append(raw)
                else:
                    output.append(self.checked(token['text'], bold))
                    plain.append(html.unescape(token['text']))
            elif kind in ('strong', 'em', 'del'):
                rich, raw = self.inlines(token.get('tokens', []), bold or kind == 'strong')
                tag = {'strong': 'b', 'em': 'i', 'del': 'strike'}[kind]
                output.append(f'<{tag}>{rich}</{tag}>'); plain.append(raw)
            elif kind == 'codespan':
                output.append('<font backColor="#ECF3F2">' + self.checked(token['text'], bold) + '</font>')
                plain.append(html.unescape(token['text']))
            elif kind == 'br':
                output.append('<br/>'); plain.append('\n')
            elif kind == 'link':
                href = html.unescape(token['href'])
                if not re.match(r'^(https?://|mailto:)', href, re.I):
                    raise ValueError(f'Unsupported link target; resolve it in source before build: {href}')
                rich, raw = self.inlines(token.get('tokens', []), bold)
                output.append(f'<link href="{html.escape(href, quote=True)}" color="#006E76"><u>{rich}</u></link>')
                plain.append(raw); self.expected_links.append(href)
            elif kind == 'html' and re.fullmatch(r'<br\s*/?>', token['text'].strip(), re.I):
                output.append('<br/>'); plain.append('\n')
            elif kind == 'image':
                raise ValueError('Inline images must be placed on their own paragraph; no image is silently omitted.')
            else:
                raise ValueError(f'Unsupported inline Markdown token {kind!r}; source has not been silently rewritten.')
        return ''.join(output), ''.join(plain)

    def paragraph(self, tokens, style='body', indent=0, prefix=''):
        rich, plain = self.inlines(tokens, style in ('h1', 'h2', 'h3', 'tablehead'))
        self.expected_blocks.append(plain)
        st = self.styles[style]
        if style in ('cell', 'tablehead') and not re.search(r'[\u3400-\u9fff]', plain):
            st = ParagraphStyle(st.name + '_latin', parent=st, wordWrap='LTR')
        if indent:
            st = ParagraphStyle(st.name + '_indent', parent=st, leftIndent=indent * 12, firstLineIndent=0)
        return Paragraph(self.checked(prefix) + rich, st)

    def table(self, token, indent):
        header = token['header']
        rows = token['rows']
        n = len(header)
        if n > 8:
            raise ValueError(f'Table has {n} columns. Provide an explicit wide-table layout; refusing unreadably tiny automatic type.')
        width = CONTENT_W - indent * 12
        # Estimate required widths from content; bound long prose cells so tables remain balanced.
        weights = []
        for col in range(n):
            lengths = [len(header[col]['text'])] + [len(row[col]['text']) for row in rows]
            weights.append(max(4, min(24, max(lengths) ** 0.65 * 2)))
        total = sum(weights)
        widths = [width * value / total for value in weights]
        # Financial peer tables need enough room to keep percentage tokens intact.
        if n == 7 and header[0]['text'] == '公司' and header[3]['text'] == 'FCF Margin':
            peer_widths = [67, 49, 53, 61, 58, 99, 112]
            widths = [width * value / sum(peer_widths) for value in peer_widths]
        data = [[self.paragraph(cell.get('tokens', []), 'tablehead') for cell in header]]
        data += [[self.paragraph(cell.get('tokens', []), 'cell') for cell in row] for row in rows]
        table = Table(data, colWidths=widths, repeatRows=1, hAlign='LEFT', splitByRow=1)
        table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (-1, -1), 'CJKRegular'),
            ('FONTNAME', (0, 0), (-1, 0), 'CJKBold'),
            ('BACKGROUND', (0, 0), (-1, 0), TEAL),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, PALE]),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LEFTPADDING', (0, 0), (-1, -1), 6), ('RIGHTPADDING', (0, 0), (-1, -1), 6),
            ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
            ('LINEBELOW', (0, -1), (-1, -1), 0.45, TEAL),
        ]))
        return [table, Spacer(1, 10)]

    def blocks(self, tokens, indent=0, quoted=False):
        story = []
        for token in tokens:
            kind = token['type']
            if kind == 'space':
                continue
            if kind == 'heading':
                style = 'h' + str(min(token['depth'], 3))
                story.append(self.paragraph(token.get('tokens', []), style, indent))
            elif kind in ('paragraph', 'text'):
                inline = token.get('tokens') or [{'type': 'text', 'text': token.get('text', '')}]
                # Standalone local images are included at original aspect ratio; network access is never implicit.
                if len(inline) == 1 and inline[0]['type'] == 'image':
                    item = inline[0]
                    target = self.source.parent / item['href']
                    if not target.is_file():
                        raise ValueError(f'Image not available locally; no substitution or omission: {item["href"]}')
                    im = Image(str(target))
                    scale = min(1, CONTENT_W / im.imageWidth, (PAGE_H - 60 * mm) / im.imageHeight)
                    im.drawWidth = im.imageWidth * scale; im.drawHeight = im.imageHeight * scale
                    # Keep an immediately preceding caption with its image across page breaks.
                    if story and isinstance(story[-1], Paragraph):
                        story[-1].keepWithNext = True
                    story.extend([im, Spacer(1, 8)])
                    self.images.append({'source': item['href'], 'sha256': hashlib.sha256(target.read_bytes()).hexdigest()})
                else:
                    story.append(self.paragraph(inline, 'quote' if quoted else 'body', indent))
            elif kind == 'list':
                start = int(token.get('start') or 1)
                for index, item in enumerate(token['items']):
                    item_blocks = item['tokens']
                    prefix = f'{start + index}. ' if token.get('ordered') else '- '
                    if item.get('task'):
                        prefix += '[x] ' if item.get('checked') else '[ ] '
                    for j, child in enumerate(item_blocks):
                        if j == 0 and child['type'] in ('text', 'paragraph'):
                            story.append(self.paragraph(child.get('tokens') or [{'type': 'text', 'text': child['text']}], 'body', indent + 1, prefix))
                        else:
                            story.extend(self.blocks([child], indent + 1, quoted))
            elif kind == 'blockquote':
                story.extend(self.blocks(token['tokens'], indent, True))
            elif kind == 'table':
                story.extend(self.table(token, indent))
            elif kind == 'code':
                text = token['text']
                self.expected_blocks.append(text)
                rich = self.checked(text, preserve_spaces=True)
                story.append(Paragraph(rich, self.styles['code']))
            elif kind == 'hr':
                story.extend([Spacer(1, 4), HRFlowable(width='100%', thickness=0.6, color=TEAL), Spacer(1, 10)])
            elif kind == 'html':
                raise ValueError('Raw block HTML is unsupported; no content is silently discarded.')
            else:
                raise ValueError(f'Unsupported block Markdown token {kind!r}; source has not been silently rewritten.')
        return story


def validate(pdf, builder, title, qa_dir, input_hash):
    reader = PdfReader(str(pdf))
    texts = [page.extract_text(extraction_mode='plain') or '' for page in reader.pages]
    full_text = '\n'.join(texts)
    # Footer is the only generated visible text; remove it before source matching.
    body_text = '\n'.join(re.sub(r'^第\s*\d+\s*頁\s*\n', '', text, count=1) for text in texts)
    actual = normalize(body_text)
    missing_blocks = [text for text in builder.expected_blocks if normalize(text) not in actual]
    expected_chars = Counter(normalize(''.join(builder.expected_blocks)))
    missing_counts = expected_chars - Counter(actual)
    uri_values, font_details = [], {}
    for page in reader.pages:
        for ref in page.get('/Annots', []):
            annotation = ref.get_object()
            action = annotation.get('/A', {})
            if action.get('/URI'):
                uri_values.append(str(action['/URI']))
        for ref in page['/Resources'].get('/Font', {}).values():
            font = ref.get_object()
            name = str(font.get('/BaseFont', 'unknown'))
            descriptor = font.get('/FontDescriptor')
            embedded = bool(descriptor and any(key in descriptor.get_object() for key in ('/FontFile', '/FontFile2', '/FontFile3')))
            font_details[name] = {'embedded': embedded, 'unicode_map': '/ToUnicode' in font, 'subtype': str(font.get('/Subtype'))}
    missing_links = sorted(set(builder.expected_links) - set(uri_values))
    qa = {
        'input': str(builder.source), 'input_sha256': input_hash,
        'output': str(pdf), 'output_sha256': hashlib.sha256(pdf.read_bytes()).hexdigest(),
        'pages': len(reader.pages), 'bytes': pdf.stat().st_size,
        'content_policy': 'Same Markdown source, no research or rewriting; formatting only.',
        'source_blocks': len(builder.expected_blocks),
        'source_text_preserved': not missing_blocks and not missing_counts,
        'missing_blocks': missing_blocks, 'missing_character_counts': dict(missing_counts),
        'missing_glyphs': sorted(builder.missing), 'fonts': font_details,
        'all_fonts_embedded_and_unicode': bool(font_details) and all(info['embedded'] and info['unicode_map'] for info in font_details.values()),
        'replacement_characters': full_text.count('\ufffd'),
        'unique_source_links': len(set(builder.expected_links)), 'unique_pdf_links': len(set(uri_values)),
        'missing_links': missing_links, 'local_images': builder.images,
        'chars_per_page': [len(text) for text in texts],
        'visual_review': 'PENDING - inspect all rendered page PNGs before delivery',
    }
    qa['automated_status'] = 'PASS' if (qa['source_text_preserved'] and qa['all_fonts_embedded_and_unicode'] and not qa['missing_glyphs'] and not qa['replacement_characters'] and not missing_links and all(text.strip() for text in texts)) else 'FAIL'
    qa_dir.mkdir(parents=True, exist_ok=True)
    (qa_dir / 'extracted.txt').write_text(full_text, encoding='utf-8')
    (qa_dir / 'qa.json').write_text(json.dumps(qa, ensure_ascii=False, indent=2), encoding='utf-8')
    if qa['automated_status'] != 'PASS':
        raise RuntimeError(f'PDF QA failed. Inspect {qa_dir / "qa.json"}; do not deliver this output.')
    return qa


def render(pdf, qa_dir):
    poppler = shutil.which('pdftoppm') or shutil.which('pdftoppm.exe')
    if poppler:
        process = subprocess.run([poppler, '-r', '125', '-png', str(pdf), str(qa_dir / 'page')], capture_output=True)
        if process.returncode:
            raise RuntimeError(process.stderr.decode('utf-8', errors='replace'))
        return 'Poppler'
    import pypdfium2 as pdfium
    document = pdfium.PdfDocument(str(pdf))
    for index in range(len(document)):
        page = document[index]
        bitmap = page.render(scale=125 / 72)
        bitmap.to_pil().save(qa_dir / f'page-{index + 1:03d}.png')
        bitmap.close(); page.close()
    document.close()
    return 'PDFium (Poppler unavailable on PATH)'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('input', type=Path)
    parser.add_argument('output', type=Path)
    parser.add_argument('--title')
    parser.add_argument('--qa-dir', type=Path)
    parser.add_argument('--regular-font', type=Path, default=Path('C:/Windows/Fonts/msjh.ttc'))
    parser.add_argument('--bold-font', type=Path, default=Path('C:/Windows/Fonts/msjhbd.ttc'))
    parser.add_argument('--node', type=Path, default=RUNTIME / 'node/bin/node.exe')
    parser.add_argument('--marked', type=Path, default=RUNTIME / 'node/node_modules/marked/lib/marked.esm.js')
    args = parser.parse_args()
    source = args.input.resolve()
    raw = source.read_bytes()
    text = raw.decode('utf-8-sig', errors='strict')
    if not text.strip() or '\ufffd' in text or '\x00' in text:
        raise ValueError('Input is empty or already contains replacement/NUL characters; recover the original source first.')
    if re.search(r'\ue200|\ue201|\ue202|turn\d+(search|view|fetch)\d+', text):
        raise ValueError('Unresolved ChatGPT citation tokens found; obtain real source URLs before PDF conversion.')
    input_hash = hashlib.sha256(raw).hexdigest()
    tokens_process = subprocess.run([str(args.node), str(ROOT / 'markdown_tokens.cjs'), str(args.marked), str(source)], capture_output=True)
    if tokens_process.returncode:
        raise RuntimeError(tokens_process.stderr.decode('utf-8', errors='replace'))
    tokens = json.loads(tokens_process.stdout.decode('utf-8'))
    title = args.title or next((token['text'] for token in tokens if token['type'] == 'heading'), source.stem)
    builder = Builder(source, args.regular_font, args.bold_font)
    story = builder.blocks(tokens)
    builder.checked('第 0123456789 頁')
    if builder.missing:
        raise ValueError('Missing font glyphs; choose fonts containing the exact source characters: ' + ', '.join(sorted(builder.missing)))
    output = args.output.resolve()
    output.parent.mkdir(parents=True, exist_ok=True)
    if output == source:
        raise ValueError('Output must not overwrite the source.')
    def footer(canvas, document):
        canvas.saveState()
        canvas.setStrokeColor(TEAL); canvas.setLineWidth(0.5)
        canvas.line(MARGIN, 16 * mm, PAGE_W - MARGIN, 16 * mm)
        canvas.setFillColor(MUTED); canvas.setFont('CJKRegular', 8)
        canvas.drawRightString(PAGE_W - MARGIN, 11 * mm, f'第 {document.page} 頁')
        canvas.restoreState()
    document = SimpleDocTemplate(str(output), pagesize=(PAGE_W, PAGE_H), leftMargin=MARGIN, rightMargin=MARGIN,
                                 topMargin=16 * mm, bottomMargin=23 * mm, title=title,
                                 author='', subject='Source-preserving Chinese report', pageCompression=1,
                                 initialFontName='CJKRegular')
    document.build(story, onFirstPage=footer, onLaterPages=footer, canvasmaker=partial(Canvas, initialFontName='CJKRegular'))
    if hashlib.sha256(source.read_bytes()).hexdigest() != input_hash:
        raise RuntimeError('Source file changed during conversion.')
    qa_dir = (args.qa_dir or output.with_suffix('.qa')).resolve()
    qa = validate(output, builder, title, qa_dir, input_hash)
    qa['renderer'] = render(output, qa_dir)
    (qa_dir / 'qa.json').write_text(json.dumps(qa, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(qa, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    main()
