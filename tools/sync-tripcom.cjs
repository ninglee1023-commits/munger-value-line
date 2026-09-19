#!/usr/bin/env node
// Sync the checked Trip.com source verbatim. Input paths are supplied at runtime and never published.
const fs=require('fs'),path=require('path'),vm=require('vm'),crypto=require('crypto'),assert=require('assert');
const argv=process.argv.slice(2),args={};
for(let i=0;i<argv.length;i++){const name=argv[i];if(name==='--help'){console.log('node tools/sync-tripcom.cjs --markdown <final.md> --pdf <checked.pdf> [--sources <public-sources.json>] [--synced-at <ISO-time>] [--dry-run]');process.exit(0);}if(name==='--dry-run'){args.dryRun=true;continue;}assert(['--markdown','--pdf','--sources','--synced-at'].includes(name),'Unknown option '+name);assert(argv[i+1],'Missing '+name);args[name.slice(2)]=argv[++i];}
assert(args.markdown&&args.pdf,'--markdown and --pdf are required; use --help');
const root=path.resolve(__dirname,'..'),read=name=>fs.readFileSync(path.join(root,name),'utf8'),hash=value=>crypto.createHash('sha256').update(value).digest('hex');
const markdown=fs.readFileSync(path.resolve(args.markdown),'utf8'),contentSha256=hash(Buffer.from(markdown,'utf8'));
assert(markdown.includes('攜程集團 Trip.com Group')&&markdown.includes('2026 年 9 月 19 日'),'Unexpected company/date');
assert(!markdown.includes('\ufffd'),'Replacement characters in source');
assert(!/來源網址尚待|来源网址尚待/.test(markdown),'Source links are not finalized');
const sourceChapterTitles=Array.from(markdown.matchAll(/^##\s+(\d+)\.\s+(.+)$/gm));
assert.deepEqual(sourceChapterTitles.map(m=>Number(m[1])),Array.from({length:11},(_,i)=>i+1),'All 11 original chapters must be present in order');
const rows=markdown.split(/\r?\n/).filter(line=>line.trim().startsWith('|')).map(line=>line.trim().replace(/^\||\|$/g,'').split('|').map(cell=>cell.trim()));
const years=rows.filter(row=>/^20(?:1\d|2[0-5])$/.test(row[0])&&row.length===6);
assert.deepEqual(years.map(row=>row[0]),Array.from({length:15},(_,i)=>String(2011+i)),'Missing/duplicate financial history years');
const numeric=value=>{const n=Number(String(value).replace('%',''));assert(Number.isFinite(n),'Invalid original chart value '+value);return n;};
const profitRow=label=>{const row=rows.find(r=>r[0].replace(/\s/g,'')===label.replace(/\s/g,''));assert(row,'Missing original profit row '+label);const m=row[1].match(/RMB\s*([\d.]+)\s*億/);assert(m,'Unexpected original profit unit '+label);return Number(m[1]);};
const profits=[profitRow('2025 GAAP 淨利'),profitRow('剔除投資收益後歸母淨利'),profitRow('2025 FCF')];
assert.deepEqual(profits,[334,134,135.8],'Original chart values changed; review before sync');
const summary=markdown.match(/###\s*一句話結論\s*\r?\n+([^\r\n]+)/)?.[1];assert(summary,'Original conclusion missing');
const visuals=[
 {kind:'line',title:'圖 1｜2011–2025 營收',note:'原報告十五年表；美元十億元。疫情造成結構性斷層，不能以2022谷底作正常CAGR起點。',labels:years.map(r=>r[0]),series:[{name:'營收 US$bn',values:years.map(r=>numeric(r[1]))}]},
 {kind:'line',title:'圖 2｜毛利率與營業利潤率',note:'原報告十五年表；百分比。2014–2018整合／投入期與2020–2022疫情期完整保留。',suffix:'%',labels:years.map(r=>r[0]),series:[{name:'毛利率',values:years.map(r=>numeric(r[2]))},{name:'營業利潤率',values:years.map(r=>numeric(r[3]))}]},
 {kind:'bar',title:'圖 3｜2025 報表淨利、正常化盈利與FCF',note:'人民幣億元；正常化為公司披露的剔除投資收益後歸母淨利。三項沿用原稿，不是新增盈利預測。',labels:['GAAP 淨利','剔除投資收益後','自由現金流'],values:profits}
];
let sources;
if(args.sources){sources=JSON.parse(fs.readFileSync(path.resolve(args.sources),'utf8'));assert(Array.isArray(sources),'Sources must be a public JSON array');}
else{const seen=new Set();sources=[];for(const m of markdown.matchAll(/(?<!!)\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g)){if(seen.has(m[2]))continue;seen.add(m[2]);sources.push({id:'S'+(sources.length+1),title:m[1],url:m[2],detail:'原報告來源名稱對應的公開查核入口。'});}}
assert(sources.length>=6,'Public source links are incomplete');for(const s of sources)assert(s.id&&s.title&&/^https?:\/\//.test(s.url),'Invalid public source');
const privatePattern=/(?:chatgpt\.com\/(?:c|g)\/|codex:\/\/|file:\/\/|sandbox:|[A-Z]:\\Users\\)/i;
assert(!privatePattern.test(markdown+JSON.stringify(sources)),'Private/local source link in public content');
const assetBase='reports/tripcom-20260919/';
const assets=[];
for(const m of markdown.matchAll(/^!\[([^\]]*)\]\(([^\s)]+)\)\s*$/gm)){assert(/^(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_.-]+\.png$/.test(m[2])&&!m[2].split('/').includes('..'),'Unsafe source image');const sourcePath=path.resolve(path.dirname(args.markdown),m[2]);assert(fs.existsSync(sourcePath),'Missing source image '+m[2]);assets.push([assetBase+m[2],fs.readFileSync(sourcePath)]);}
assert.equal(assets.length,3,'Expected the three checked source figures');
const pdfData=fs.readFileSync(path.resolve(args.pdf));assert.equal(pdfData.subarray(0,5).toString(),'%PDF-','PDF not valid');
const app=read('app.js'),catalogEnd=app.indexOf('\n];')+3;assert(catalogEnd>3,'Cannot locate catalog');
const catalog=vm.runInNewContext(app.slice(0,catalogEnd)+';CATALOG');
assert.equal(catalog.filter(c=>c.id==='trip').length,1,'Expected exactly one Trip.com entry');
const oldReport=JSON.parse(read('trip.json'));
const syncedAt=args['synced-at']||(oldReport.source?.contentSha256===contentSha256?oldReport.source.syncedAt:new Date().toISOString());
assert(/T.*(?:Z|[+-]\d{2}:\d{2})$/.test(syncedAt)&&Number.isFinite(Date.parse(syncedAt)),'Invalid sync timestamp');
const revision='munger-original-20260919-'+contentSha256.slice(0,12);
const report={slug:'trip',company:'攜程集團',ticker:'NASDAQ: TCOM · HKEX: 9961',format:'markdown',markdown,subtitle:'原 PDF 全文轉錄｜十五年 Value Line、商業模式、護城河、盈利品質與正常化估值',asof:'2026-09-19',revision,source:{title:'每日芒格式公司研究（原 PDF 全文轉錄）',researchDate:'2026-09-19',syncedAt,contentSha256,assetBase},basis:'研究日期：2026-09-19；市場價格為2026-09-18美股收市US$40.68。正文為原PDF全文轉錄與格式修復；歷史美元序列、人民幣財務數據及同行TTM口徑按原稿保留。',summary:[summary],sources,pdf:{url:'reports/Tripcom_Munger_Value_Line_2026-09-19.pdf',label:'下載同版 PDF（中文修復版）'}};
const card={id:'trip',file:'trip.json',sourceSynced:true,name:'攜程集團',ticker:report.ticker,date:'2026-09-19',sector:'旅遊平台',verdict:'價格合理偏吸引；正常化盈利為主尺',valuation:'正常化 P/E 約10–14倍｜US$40.68（9/18）',conclusion:summary,lead:report.subtitle,metrics:[['2025 營收','RMB 624 億'],['2025 營業利潤率','約25.3%'],['2025 FCF','RMB 135.8 億'],['美股收市價','US$40.68（9/18）']],visuals};
const nextCatalog=catalog.map(c=>c.id==='trip'?card:c);
const history=JSON.parse(read('research-history.json'));
if(!history.revisions.some(r=>r.id==='trip'&&r.contentSha256===contentSha256))history.revisions.push({id:'trip',company:'攜程集團',peers:['Booking Holdings','Expedia','同程旅行'],originalResearchDate:'2026-09-19',date:syncedAt.slice(0,10),revision,chapters:11,sourceTitle:report.source.title,contentSha256});
history.updated=syncedAt.slice(0,10);history.note='歷史研究及原報告同步記錄；原研究日與同步日期分別保留，格式修復不當作新研究。';
const version='20260919-original-'+contentSha256.slice(0,12);
const html=read('index.html').replace(/app\.js(?:\?v=[^"']*)?/,`app.js?v=${version}`);
const outputs=new Map([['trip.json',JSON.stringify(report,null,2)+'\n'],['app.js','const CATALOG = '+JSON.stringify(nextCatalog,null,2)+';'+app.slice(catalogEnd)],['research-history.json',JSON.stringify(history,null,2)+'\n'],['index.html',html]]);
const otherReports=catalog.filter(c=>c.id!=='trip').map(c=>[c.file,hash(fs.readFileSync(path.join(root,c.file)))]);
const changed=[];for(const [name,value]of outputs){if(read(name)!==value){changed.push(name);if(!args.dryRun)fs.writeFileSync(path.join(root,name),value,'utf8');}}
const pdfTarget=path.join(root,report.pdf.url);if(!fs.existsSync(pdfTarget)||hash(fs.readFileSync(pdfTarget))!==hash(pdfData)){changed.push(report.pdf.url);if(!args.dryRun){fs.mkdirSync(path.dirname(pdfTarget),{recursive:true});fs.writeFileSync(pdfTarget,pdfData);}}
for(const [name,value]of [[assetBase+'original.md',Buffer.from(markdown,'utf8')],...assets]){const target=path.join(root,name);if(!fs.existsSync(target)||hash(fs.readFileSync(target))!==hash(value)){changed.push(name);if(!args.dryRun){fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,value);}}}
for(const [name,digest]of otherReports)assert.equal(hash(fs.readFileSync(path.join(root,name))),digest,'Unrelated report changed '+name);
console.log(JSON.stringify({dryRun:!!args.dryRun,changed,contentSha256,syncedAt,sourceLinks:sources.length,chapters:11,charts:visuals.length,otherReportsPreserved:otherReports.length},null,2));
