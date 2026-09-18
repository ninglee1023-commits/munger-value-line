const fs=require('fs'),path=require('path'),vm=require('vm'),http=require('http'),assert=require('assert');
const app=fs.readFileSync('app.js','utf8');
const catalog=vm.runInNewContext(app.slice(0,app.indexOf('\n];')+3)+';CATALOG');
assert.equal(catalog.length,13);
for(const c of catalog){
 const r=JSON.parse(fs.readFileSync(c.file,'utf8'));
 assert.equal(r.revision,'munger-value-line-20260918-v2',c.id);
 assert.equal(r.sections.length,17,c.id);assert.equal(c.visuals.length,4,c.id);
 const ids=new Set(r.sources.map(s=>s.id));assert.equal(ids.size,r.sources.length,c.id+' duplicate source');
 for(const m of JSON.stringify(r.sections).matchAll(/\[([SRIQ]\d+)\]/g))assert(ids.has(m[1]),c.id+' missing '+m[1]);
 for(const s of r.sections){assert(s.paragraphs.length||s.tables.length,c.id+' empty '+s.title);for(const t of s.tables)for(const row of t.rows)assert.equal(row.length,t.headers.length,c.id+' ragged table');}
 assert(!JSON.stringify(r).includes('\ufffd'),c.id+' garbled Unicode');
 for(const s of r.sources)assert(/^https?:/.test(s.url),c.id+' bad URL');
 for(const v of c.visuals){for(const values of(v.series?v.series.map(s=>s.values):[v.values])){assert.equal(values.length,v.labels.length);assert(values.every(Number.isFinite));}}
}
assert(Math.abs(54.51+22.27+3.38-128.1-9.73+57.67)<0.001);
assert.equal(976-271,705);assert.equal(530+203,733);
assert(Math.abs((2600.42490-1943.66771)/2600.42490*100-25.2558)<0.01);
assert(Math.abs((155506421-134593933)/155506421*100-13.4480)<0.01);
assert.equal(JSON.parse(fs.readFileSync('research-history.json')).revisions.filter(x=>x.originalResearchDate).length,13);
let server;
async function run(){
 const external=process.argv[2];
 if(!external){server=http.createServer((req,res)=>{let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(p==='/')p='/index.html';const f=path.resolve('.'+p);if(!f.startsWith(process.cwd()+path.sep)){res.writeHead(403);return res.end();}try{const b=fs.readFileSync(f);res.setHeader('Content-Type',({'.js':'text/javascript','.json':'application/json','.html':'text/html','.css':'text/css'})[path.extname(f)]||'application/octet-stream');res.end(b);}catch{res.writeHead(404);res.end();}});await new Promise(r=>server.listen(8765,'127.0.0.1',r));}
 const base=external||'http://127.0.0.1:8765/';
 const moduleRoot=process.env.RESEARCH_NODE_MODULES||'C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
 const {chromium}=require(require.resolve('playwright',{paths:[moduleRoot]}));
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const errors=[],results=[];fs.mkdirSync('.qa',{recursive:true});
 try{
  for(const width of [1440,390]){
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base,{waitUntil:'networkidle'});
   assert.equal(await page.locator('.company-card').count(),13,'home cards');
   if(width===1440)await page.screenshot({path:'.qa/home-desktop.png'});
   for(const c of catalog){
    await page.goto(base+'#/article/'+c.id,{waitUntil:'networkidle'});
    await page.locator('#sources .source-link').first().waitFor();
    assert.equal(await page.locator('.article-header h1').innerText(),c.name);
    assert.equal(await page.locator('.chart-card').count(),4,c.id+' charts');
    if(width>=1440)assert.equal(await page.locator('.chart-wrap').evaluateAll(xs=>xs.filter(x=>x.scrollWidth>x.clientWidth+2).length),0,c.id+' desktop chart clipping');
    assert.equal(await page.locator('.article-content>.report-section').count(),19,c.id+' sections');
    const state=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,chapters:document.querySelectorAll('.toc nav a').length,text:document.querySelector('.article-content').innerText.length,emptyLinks:[...document.querySelectorAll('.article-content a')].filter(a=>!a.href||a.getAttribute('href')==='#').length,brokenAnchors:[...document.querySelectorAll('.toc a')].filter(a=>!document.getElementById(a.dataset.scroll||a.getAttribute('href').replace(/^#/,''))).map(a=>a.outerHTML)}));
    assert(state.scrollWidth<=width+2,c.id+' horizontal page overflow '+JSON.stringify(state));
    assert.equal(state.chapters,19);assert(state.text>3500,c.id+' missing prose');assert.equal(state.emptyLinks,0);assert.equal(state.brokenAnchors.length,0);
    const r=JSON.parse(fs.readFileSync(c.file,'utf8'));assert.equal(await page.locator('.source-link').count(),r.sources.length);
    const firstCitation=page.locator('.cite').first();assert(await firstCitation.count());assert(/^https?:/.test(await firstCitation.getAttribute('href')));
    for(const citation of await page.locator('.cite').evaluateAll(xs=>xs.map(a=>({id:a.innerText,url:a.getAttribute('href')}))))assert.equal(citation.url,r.sources.find(s=>s.id===citation.id).url,c.id+' citation target');
    results.push({id:c.id,width,charts:4,sections:19,textChars:state.text,overflow:false});
    if(['pdd','midea','yumc'].includes(c.id)){
     await page.screenshot({path:'.qa/'+c.id+'-'+width+'.png'});
     await page.locator('.toc a').first().click();
     assert.equal(new URL(page.url()).hash,'#/article/'+c.id,'toc lost article');
     assert.equal(await page.locator('.article-header h1').innerText(),c.name);
     await page.locator('#evidence').screenshot({path:'.qa/'+c.id+'-charts-'+width+'.png'});
     await page.locator('.toc a').nth(8).click();
     assert.equal(new URL(page.url()).hash,'#/article/'+c.id);
     await page.locator('#section-7').screenshot({path:'.qa/'+c.id+'-prose-'+width+'.png'});
    }
   }
   await page.close();
  }
  assert.equal(errors.length,0,errors.join(';'));
  fs.writeFileSync('.qa/results.json',JSON.stringify({checkedAt:new Date().toISOString(),base,results,errors},null,2));
  console.log(JSON.stringify({pass:true,pages:results.length,charts:52,chapters:221,errors}));
 }finally{await browser.close();}
}
run().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server&&server.close());
