const fs=require('fs'),path=require('path'),vm=require('vm'),http=require('http'),assert=require('assert'),crypto=require('crypto');
const app=fs.readFileSync('app.js','utf8');
const ui=vm.runInNewContext(app.slice(0,app.indexOf('\ndocument.addEventListener'))+';({CATALOG,markdownHeadings,sourceMap,safeImageUrl,safePdfUrl,reportMetadata,reportPdf,inlineRich,renderMarkdown})');
const catalog=ui.CATALOG;
assert(catalog.length>0,'empty catalog');
assert.equal(new Set(catalog.map(c=>c.id)).size,catalog.length,'duplicate catalog id');
const reports=new Map();
const sha256=text=>crypto.createHash('sha256').update(text,'utf8').digest('hex');
function tables(report){return (report.history?[report.history]:[]).concat((report.sections||[]).flatMap(s=>(s.table?[s.table]:[]).concat(s.tables||[])));}
function checkReport(c,r){
 assert.equal(r.slug,c.id,c.id+' slug');
 const sources=ui.sourceMap(r,c);const ids=new Set(sources.list.map(s=>s.id));
 assert.equal(ids.size,sources.list.length,c.id+' duplicate source');
 if(r.format==='markdown'){
  assert(typeof r.markdown==='string'&&r.markdown.trim(),c.id+' missing original Markdown');
  assert(r.source&&r.source.title,c.id+' missing source title');
  assert(/^\d{4}-\d{2}-\d{2}$/.test(r.source.researchDate),c.id+' missing research date');
  assert(/T.*(?:Z|[+-]\d{2}:\d{2})$/.test(r.source.syncedAt)&&Number.isFinite(Date.parse(r.source.syncedAt)),c.id+' missing sync timestamp');
  assert.equal(r.source.contentSha256,sha256(r.markdown),c.id+' original Markdown hash mismatch');
 }else{
  assert(Array.isArray(r.sections)&&r.sections.length,c.id+' missing sections');
  for(const s of r.sections)assert(s.title&&((s.paragraphs||[]).length||s.table||(s.tables||[]).length),c.id+' empty section');
 }
 for(const key of Object.keys(r.source||{}))assert(['title','researchDate','syncedAt','contentSha256','assetBase'].includes(key),c.id+' unexpected/private source metadata '+key);
 for(const m of JSON.stringify({body:r.markdown||r.sections,history:r.history,summary:r.summary}).matchAll(/\[([SRIQ]\d+)\]/g))assert(ids.has(m[1]),c.id+' missing '+m[1]);
 for(const t of tables(r)){assert(t.headers&&t.rows,c.id+' invalid table');for(const row of t.rows)assert.equal(row.length,t.headers.length,c.id+' ragged table');}
 for(const image of (r.markdown||'').matchAll(/^!\[([^\]]*)\]\(([^\s)]+)\)\s*$/gm)){const url=ui.safeImageUrl(image[2],r.source?.assetBase);assert(url,c.id+' invalid image path');if(!/^https:/.test(url))assert(fs.existsSync(path.resolve(url)),c.id+' missing image '+url);}
 assert(!JSON.stringify(r).includes('\ufffd'),c.id+' garbled Unicode');
 for(const s of sources.list)assert(/^https?:\/\//.test(s.url),c.id+' bad source URL');
 for(const v of(c.visuals||[]))for(const values of(v.series?v.series.map(s=>s.values):[v.values])){assert.equal(values.length,v.labels.length,c.id+' chart length');assert(values.every(Number.isFinite),c.id+' nonnumeric chart');}
 if(r.pdf){assert(ui.safePdfUrl(r.pdf.url),c.id+' unsafe PDF link');if(!/^https:/.test(r.pdf.url)){const file=path.resolve(r.pdf.url);assert(file.startsWith(process.cwd()+path.sep),c.id+' PDF outside site');assert(fs.existsSync(file),c.id+' missing PDF');assert.equal(fs.readFileSync(file).subarray(0,5).toString(),'%PDF-',c.id+' invalid PDF file');}}
}
for(const c of catalog){const r=JSON.parse(fs.readFileSync(c.file,'utf8'));checkReport(c,r);reports.set(c.id,r);}
const history=JSON.parse(fs.readFileSync('research-history.json','utf8'));
for(const c of catalog)assert(history.revisions.some(r=>r.id===c.id&&r.originalResearchDate),c.id+' missing research history');
// A source-synced report without a PDF must pass the same full-text and browser checks.
// This fixture stays in memory and is never added to the public catalog or files.
const original=Array.from({length:20},(_,i)=>`## ${i+1}、原报告章节\n\n保留原文第${i+1}段，中文、标点、**重点**与来源。[S1]\n`).join('\n')+'\n| 项目 | 数值 |\n| --- | --- |\n| 收入 | 123.45 |\n\n原文结束。\n';
const fixture={slug:'qa-original-report',company:'原文同步测试',ticker:'TEST',format:'markdown',markdown:original,summary:['来自同一份原研究的摘要。'],source:{title:'芒格式公司分析',researchDate:'2026-09-01',syncedAt:'2026-09-19T10:30:00+08:00',contentSha256:sha256(original)},sources:[{id:'S1',title:'测试原始来源',url:'https://example.com/source'}]};
const fixtureStudy={id:fixture.slug,sourceSynced:true,file:'qa-original-report.json',name:fixture.company,ticker:fixture.ticker,date:fixture.source.researchDate,sector:'测试',verdict:'测试',valuation:'测试',conclusion:'保留原文',lead:'完整原研究',metrics:[],visuals:[]};
checkReport(fixtureStudy,fixture);
assert(!Object.hasOwn(fixture,'pdf'),'no-PDF fixture unexpectedly contains a PDF');
assert.equal(ui.reportPdf(fixture),'','no-PDF report must not show a download link');
assert.equal(ui.markdownHeadings(original).length,20,'long Markdown TOC');
for(const bad of ['javascript:alert(1)','../private.pdf','//example.com/a.pdf','C:/private.pdf','file:///private.pdf'])assert.equal(ui.safePdfUrl(bad),'','unsafe PDF '+bad);
assert.equal(ui.safePdfUrl('reports/original-report.pdf'),'reports/original-report.pdf');
assert.equal(ui.inlineRich(String.raw`footnote \* and \*\*`,{}),'footnote * and **');
assert(ui.renderMarkdown('3. Third item\n\n4. Fourth item',{}).includes('<ol start="4">'),'original list numbering');
assert(ui.renderMarkdown('### Original subheading',{}).includes('<h3'),'subheading semantics');
assert(!ui.reportMetadata({source:{title:'<script>bad</script>'}},fixtureStudy).includes('<script>'),'source HTML injection');
let server;
async function inspectArticle(page,c,r,width){
 const sourceData=ui.sourceMap(r,c),visuals=c.visuals||[];
 const headings=r.format==='markdown'?ui.markdownHeadings(r.markdown).length:(r.sections||[]).length+(r.history?1:0);
 const sections=(r.format==='markdown'?1:headings)+(visuals.length?1:0)+(sourceData.list.length?1:0);
 const toc=headings+(visuals.length?1:0)+(sourceData.list.length?1:0);
 await page.locator('.article-header h1').waitFor();
 assert.equal(await page.locator('.article-header h1').innerText(),c.name);
 assert.equal(await page.locator('.chart-card').count(),visuals.length,c.id+' charts');
 if(width>=1440)assert.equal(await page.locator('.chart-wrap').evaluateAll(xs=>xs.filter(x=>x.scrollWidth>x.clientWidth+2).length),0,c.id+' desktop chart clipping');
 assert.equal(await page.locator('.article-content>.report-section').count(),sections,c.id+' sections');
 const state=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,chapters:document.querySelectorAll('.toc nav a').length,text:document.querySelector('.article-content').innerText.length,emptyLinks:[...document.querySelectorAll('.article-content a')].filter(a=>!a.href||a.getAttribute('href')==='#').length,brokenAnchors:[...document.querySelectorAll('.toc a')].filter(a=>!document.getElementById(a.getAttribute('href').replace(/^#/,''))).length}));
 assert(state.scrollWidth<=width+2,c.id+' horizontal overflow '+JSON.stringify(state));assert.equal(state.chapters,toc,c.id+' TOC count');assert(state.text>0,c.id+' empty prose');assert.equal(state.emptyLinks,0);assert.equal(state.brokenAnchors,0);
 assert.equal(await page.locator('.source-link').count(),sourceData.list.length,c.id+' source ledger');
 for(const citation of await page.locator('.cite').evaluateAll(xs=>xs.map(a=>({id:a.innerText,url:a.getAttribute('href')}))))assert.equal(citation.url,sourceData.map[citation.id].url,c.id+' citation target');
 if(r.format==='markdown'){
  const pictures=Array.from(r.markdown.matchAll(/^!\[([^\]]*)\]\(([^\s)]+)\)\s*$/gm));
  assert.equal(await page.locator('#full-report .report-image img').count(),pictures.length,c.id+' original images');
  await page.waitForFunction(()=>Array.from(document.querySelectorAll('#full-report .report-image img')).every(img=>img.complete&&img.naturalWidth>0));
  assert.equal(await page.locator('#full-report h2').count(),headings,c.id+' original headings');
  const expected=ui.markdownHeadings(r.markdown).map(h=>h.title);assert.deepEqual(await page.locator('#full-report h2').allTextContents(),Array.from(expected));
  assert((await page.locator('.report-source').innerText()).includes(r.source.title));
  assert((await page.locator('.article-title').innerText()).includes(r.source.researchDate.replaceAll('-','.')));
  assert((await page.locator('.report-sync').innerText()).includes(r.source.syncedAt.replace('T',' ').replace(/Z$/,' UTC')));
 }
 if(r.pdf)assert.equal(await page.locator('.report-pdf').getAttribute('href'),r.pdf.url,c.id+' PDF link');else assert.equal(await page.locator('.report-pdf').count(),0);
 if(toc){await page.locator('.toc a').last().click();assert.equal(new URL(page.url()).hash,'#/article/'+c.id,'TOC lost article');}
 return {id:c.id,width,charts:visuals.length,sections,headings,textChars:state.text,overflow:false};
}
async function run(){
 const external=process.argv[2];
 if(!external){server=http.createServer((req,res)=>{let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(p==='/')p='/index.html';const f=path.resolve('.'+p);if(!f.startsWith(process.cwd()+path.sep)){res.writeHead(403);return res.end();}try{const b=fs.readFileSync(f);res.setHeader('Content-Type',({'.js':'text/javascript','.json':'application/json','.html':'text/html','.css':'text/css','.pdf':'application/pdf'})[path.extname(f)]||'application/octet-stream');res.end(b);}catch{res.writeHead(404);res.end();}});await new Promise(r=>server.listen(8765,'127.0.0.1',r));}
 const base=external||'http://127.0.0.1:8765/';
 const moduleRoot=process.env.RESEARCH_NODE_MODULES||'C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
 const {chromium}=require(require.resolve('playwright',{paths:[moduleRoot]}));
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const errors=[],results=[];fs.mkdirSync('.qa',{recursive:true});
 try{
  for(const width of [1440,390]){
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base,{waitUntil:'networkidle'});assert.equal(await page.locator('.company-card').count(),catalog.length,'home cards');
   if(width===1440)await page.screenshot({path:'.qa/home-desktop.png'});
   for(const c of catalog){
    const r=reports.get(c.id);
    if(width===1440){const response=await page.request.get(new URL(c.file,base).href);assert(response.ok(),c.id+' report fetch');assert.deepEqual(await response.json(),r,c.id+' deployed JSON differs from checked local report');}
    await page.goto(base+'#/article/'+c.id,{waitUntil:'networkidle'});results.push(await inspectArticle(page,c,r,width));
    if(['pdd','midea','yumc'].includes(c.id)){
     await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'.qa/'+c.id+'-'+width+'.png'});
     if((c.visuals||[]).length)await page.locator('#evidence').screenshot({path:'.qa/'+c.id+'-charts-'+width+'.png'});
    }
   }
   if(!external){
    await page.route('**/qa-original-report.json',route=>route.fulfill({contentType:'application/json',body:JSON.stringify(fixture)}));
    await page.evaluate(c=>CATALOG.push(c),fixtureStudy);
    await page.goto(base+'#/article/'+fixtureStudy.id,{waitUntil:'networkidle'});
    results.push(await inspectArticle(page,fixtureStudy,fixture,width));
    assert((await page.locator('#full-report').innerText()).includes('原文结束。'),'Markdown was truncated');
    assert.equal(await page.locator('#full-report td').last().innerText(),'123.45','Markdown table');
    await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'.qa/original-markdown-'+width+'.png'});
   }
   await page.close();
  }
  assert.equal(errors.length,0,errors.join(';'));
  fs.writeFileSync('.qa/results.json',JSON.stringify({checkedAt:new Date().toISOString(),base,results,errors},null,2));
  console.log(JSON.stringify({pass:true,pages:results.length,companies:catalog.length,charts:catalog.reduce((sum,c)=>sum+(c.visuals||[]).length,0),markdownFixture:!external,noPdfSyncedFixture:!external,errors}));
 }finally{await browser.close();}
}
run().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server&&server.close());
