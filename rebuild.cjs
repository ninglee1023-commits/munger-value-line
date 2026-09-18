// Mechanical publication build. Editorial input: revision-data.cjs.
// Baseline is pinned so rerunning cannot duplicate chapters.
const fs=require('fs'),cp=require('child_process'),vm=require('vm');
const cfg=require('./revision-data.cjs');
require('./editorial-additions.cjs')(cfg);
const base=process.env.RESEARCH_BASE || '81c2421';
function oldFile(f){return cp.execFileSync('git',['show',base+':'+f],{encoding:'utf8',maxBuffer:20e6});}
let app=oldFile('app.js');
const end=app.indexOf('\n];')+3;
const catalog=vm.runInNewContext(app.slice(0,end)+';CATALOG');
const table=(headers,rows,note='')=>({headers,rows,note});
const section=(title,paragraphs=[],tables=[])=>({title,paragraphs,tables});
const strip=s=>s.replace(/^\s*(?:\d+|[一二三四五六七八九十]+)[、｜.\s]+/,'');
const reports=[];
const genericLimit='未完成统一口径的历史逐年提取，不等于公司没有披露。空缺不填零，不插值，不以两三个年份冒充完整十年序列。';
const market={
 tencent:['2026-09-17','426.00港元','https://closelook.net/indices/stock/0700.hk/price-history/','当前汇率及同日股数未统一，本版不称当日PE为15—16倍。'],
 cmb:['2026-09-17','40.60元人民币','https://stockanalysis.com/quote/sha/600036/history/','按2026 H1 BVPS45.40计算PB约0.894；按2025普通股EPS5.70计算静态PE约7.12，非TTM。'],
 cki:['2026-09-17','64.65港元','https://stockinvest.us/stock-price/1038.HK','按2025EPS3.28约19.71倍；2025DPS2.61对应4.04%静态股息率。2026处置收益不进入永续盈利。'],
 moutai:['2026-09-17','1266.98元人民币','https://hk.investing.com/equities/moutai-historical-data','按2025EPS65.66算静态PE约19.30倍，非TTM或一致预期。基准情景1300元仅高约2.6%，未显示宽裕安全边际。'],
 tsmc:['2026-09-07（历史快照）','2460新台币','https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=html&stockNo=2330','前版已核对的历史价；不是9月18日报价。按旧快照TTM EPS86.28约28.51倍、TTM FCF收益率约1.79%；不作今日上涨空间。'],
 hworld:['2026-09-03（历史快照）','46.34美元/ADS','https://stockanalysis.com/stocks/htht/market-cap/','前版已核对，非当前报价。每ADS=10普通股，人民币股权情景转美元需同日汇率及稀释股数。'],
 trip:['2026-09-04（历史快照）','41.03美元/ADS','https://stockanalysis.com/stocks/tcom/','旧价不能配9月15日新报告声称实时低估。新Q2改变TTM净利，旧PE作废；每ADS=1普通股。'],
 midea:['2026-08-28（历史快照）','86.23元人民币','https://www.eoddata.com/stockquote/SHE/000333.htm','旧文价格仅保留审计轨迹，未核成9月18日同日价；旧文14.9倍不得再称当前。'],
 sto:['2026-09-15（历史快照）','市值222.43亿元','https://stockanalysis.com/quote/she/002468/','只作旧稿单位纠错的对照，非当日市值；121.5/228/360亿元情景相对该基准约−45.4%/+2.5%/+61.8%。'],
 pdd:['未取得本次一致时间快照','不使用旧报价','https://stockanalysis.com/stocks/pdd/history/','旧稿78.76美元实际对应9月16日而非9月17日；撤销以任意7.1汇率换算的市值和上涨空间。'],
 jd:['本次未完成同日核验','不作当前估值结论','https://ir.jd.com/stock-information/stock-quote','没有用旧稿27.68美元和不同期现金混算安全边际。'],
 sf:['本次未完成同日核验','不作当前估值结论','https://ir.sf-express.com/','A/H股应各自按价格、币种及相同普通股经济权益计算。'],
 yumc:['本次未完成同日核验','不作当前估值结论','https://ir.yumchina.com/stock-information','美元EPS情景配NYSE美元普通股；HKEX报价需同日币种换算。']
};
const newCharts={
 midea:[
 {kind:'bar',title:'2025现金的去向',note:'人民币亿元；约数。购建与收购分别扣除，不是维护资本估计。[R1]',labels:['CFO','购建长期资产','收购子公司','简单FCF'],values:[533.5,111.42,61.55,422.08]},
 {kind:'bar',title:'2026 H1同一口径损益',note:'人民币亿元。归母净利不等于合并净利。[R2]',labels:['毛利','会计营业利润','归母','扣购建现金'],values:[656.76,316.84,264.46,349.18]},
 {kind:'bar',title:'楼宇扩张并未同步增利',note:'人民币亿元；管理分部利润，不是净利润。[R1]',labels:['2024利润','2025利润','2024非流动增加','2025非流动增加'],values:[50.50,45.04,5.26,69.70]},
 {kind:'bar',title:'稀释股数的净变化',note:'亿股；上半年加权平均，不是期末发行数。[R2]',labels:['2025 H1','2026 H1'],values:[76.20638,75.40304]}
 ],
 moutai:[
 {kind:'line',title:'长期锚点：收入和归母',note:'人民币十亿元；仅展示列明年份，不代表逐年完整序列。[R1][R3]',labels:['2015','2020','2023','2024','2025'],series:[{name:'收入',values:[32.66,94.92,147.69,170.9,168.84]},{name:'归母',values:[15.50,46.70,74.73,86.23,82.32]}]},
 {kind:'bar',title:'2025盈利与现金不同',note:'人民币亿元；CFO含财务公司变动。[R1]',labels:['归母','CFO','CapEx','简单FCF'],values:[823.2,615.2,31.28,583.92]},
 {kind:'bar',title:'2026 H1合并和母公司',note:'人民币亿元；范围不同，不可互相替代或简单相减视作酒业务。[R2]',labels:['合并CFO','母公司CFO','合并购建'],values:[706.91,152.25,8.32]},
 {kind:'bar',title:'每股估值敏感度',note:'作者假设，人民币；不是预测或目标价。',labels:['55×15','65×20','75×25'],values:[825,1300,1875]}
 ],
 sf:[
 {kind:'line',title:'收入与归母：增长不同步',note:'人民币亿元；选定年锚点，并非完整逐年历史。',labels:['2017','2020','2023','2025'],series:[{name:'收入',values:[711,1540,2584,3082]},{name:'归母',values:[47.7,73.3,82.3,111.2]}]},
 {kind:'bar',title:'每100收入的利润空间',note:'2026 H1；元，非每票费用。[R2]',labels:['毛利','归母','CFO'],values:[13.45,3.54,7.18]},
 {kind:'bar',title:'2026 H1现金与盈利均下滑',note:'同比%；不能仅看CFO/净利比值。[R2]',suffix:'%',labels:['归母','CFO'],values:[-4.11,-13.65]},
 {kind:'bar',title:'股权价值敏感度',note:'人民币亿元；作者假设，不是价格预测。',labels:['90×12','115×16','140×20'],values:[1080,1840,2800]}
 ],
 yumc:[
 {kind:'bar',title:'2026 H1现金分配',note:'美元百万；8月收购另计，未含在H1中。[R1]',labels:['CFO','CapEx','简单FCF','回购+股息'],values:[976,271,705,733]},
 {kind:'bar',title:'增长：经营、汇率、缩股',note:'2026 H1同比%；固定汇率OP与EPS有不同影响因素。[R1]',suffix:'%',labels:['报告OP','固定汇率OP','归母','稀释EPS'],values:[13.09,6.83,9.07,16.30]},
 {kind:'bar',title:'每100直营销售成本',note:'2026 Q2；不是集团毛利结构。[R1]',labels:['食材包装','人工福利','场地其他','餐厅利润'],values:[31.5,27.6,24.8,16.1]},
 {kind:'bar',title:'稀释股数净减少',note:'百万股；H1加权平均，反映SBC后稀释。[R1]',labels:['2025 H1','2026 H1'],values:[376,351]}
 ]
};
const peerNotes={
 tencent:['网易：游戏内容，现金回报取决于产品寿命；海外发行而非微信社交网络。Meta：广告拍卖及全球流量，AI基础设施重；中国业务风险与腾讯不同。阿里：交易与云平台，资本开支、新零售补贴及生态投入较重。三个维度分别比较，不合成一个同业PE平均。'],
 hworld:['亚朵同时卖酒店和零售产品，存货与产品毛利不能混成加盟费；希尔顿以全球品牌及加盟管理收费，加盟商负责更多资本；雅高全球及豪华品牌组合不同。比较需要租赁一致的EV、系统资本及加盟商回本。'],
 cmb:['兴业更偏企业/同业，宁波有区域企业服务和更快资产扩张。ROE、PB和信用成本应同一资本及会计方法；银行净债务、工业CapEx和FCF不适用，不能填一个看似可比的倍数。'],
 trip:['Booking的酒店住宿与商户收款模式、Airbnb的独特房源和房东关系各有优势。国际营销支出与支付/退款责任影响现金；SBC后FCF和EV应扣清可用现金、债务、客户资金。'],
 tsmc:['联电和格芯是直接代工同行，但偏成熟及特殊制程，资本强度和客户认证周期不同；台积电出海多为自建先进产能。比较低估值必须同时看低增长、补助、折旧和未来维护资本。'],
 cki:['电能亦持联营能源资产，须穿透债务；中电与港灯受本地监管影响更直接。客户几乎无法更换管网，但这不等于收费无上限。跨国收购、汇率与监管资本口径限制利润率横比。'],
 jd:['京东自营承担商品与仓网资本；阿里及拼多多更多收交易和流量服务费，不能用收入和毛利率直接判断价值。三者皆有消费者多平台使用，新业务海外/即时零售投入需独立审视。'],
 sto:['中通/圆通以加盟规模和转运成本竞争，顺丰以直营时效和企业服务差异化。加盟资本一部分在网点表外；直营资本更多在集团账内。国际化方式也不同，跨境件和自建航空网络不能同看。'],
 pdd:['阿里有云与商业平台等多引擎，京东有自营库存和履约网络；拼多多商家交易收费不等于同样风险更低。资本强度必须把费用化补贴、研发、SBC和供应链付款期限一起看。']
};
for(const study of catalog){
 const id=study.id,c=cfg[id]; if(!c)throw new Error('Missing '+id);
 const original=JSON.parse(oldFile(id+'.json'));
 let src=(original.sources||[]).map((x,i)=>Array.isArray(x)?{id:'S'+(i+1),title:x[0],url:x[1],detail:'前版来源，财务期见正文；不是全部在本次逐页重查。'}:{...x});
 src.push(...(c.sources||[]).map(([id,title,url,detail])=>({id,title,url,detail})));
 const m=market[id]; src.push({id:'Q1',title:'价格核验入口（次级/动态）',url:m[2],detail:m[0]+'；'+m[3]});
 const industry=['sf','sto'].includes(id)?['国家邮政局2026年1—8月行业量价','https://www.spb.gov.cn/gjyzj/c100015/c100016/202609/1323c08f81654375bb605dcdf143af48.shtml','2026-09-18发布；行业收入与件量，不代表公司单票价格。']:['国家统计局2026年1—8月消费数据','https://www.stats.gov.cn/sj/zxfb/202609/t20260915_1965311.html','2026-09-15发布；仅中国需求背景，不替代行业竞争证据。'];
 const chosenIndustry=c.industry||industry;
 src.push({id:'I1',title:chosenIndustry[0],url:chosenIndustry[1],detail:chosenIndustry[2]});
 const pick=(key)=> (c.maps?.[key]||[]).map(i=>original.sections[i]).filter(Boolean);
 const ps=(key)=>pick(key).flatMap(s=>s.paragraphs||[]);
 const ts=(key)=>pick(key).map(s=>s.table).filter(Boolean);
 const hist=c.history||original.history;
 if(id==='pdd')hist.note=hist.note.replace('来源：[S2][S3]','来源：[S2][S3][R2]').replace('早期数据未披露不等于为零','早期数据未在本稿逐项提取，不等于未披露或为零');
 if(id==='sto')hist.note=hist.note.replace('来源：[S3][S4][S5][S6]。','近期年度见[S3][S4]；2016—2023为前版整理的历史数据，逐年原始来源链待补核，不用同行[S5][S6]作申通历史来源。');
 const coverage=table(['指标组','本版覆盖与口径','仍需补齐'],[
 ['收入、增长、毛利/净利','长期表与单位经济，年度与H1/Q2分开','未列年份的可比毛利及分部序列；并购和准则重列'],
 ['营业利润/EBIT/EBITDA','采用原报告名称；中国准则营业利润不自动等于EBIT','除原文明确披露外不估造统一十年EBITDA'],
 ['稀释EPS、FCF/股、股数','有已核验值才列；回购与SBC分开','完整复权稀释EPS/净股数逐年序列；不能用基本EPS替换'],
 ['CFO、CapEx、FCF、Owner Earnings','现金桥明确公司FCF与简单FCF；银行例外','维护/增长CapEx和正常营运资本缺口；Owner Earnings暂无可靠单点'],
 ['ROE、ROIC、增量ROIC','列已披露ROE；论证新增投资及分母边界','逐年平均投入资本/税后经营收益尚未完全统一，不伪造ROIC'],
 ['债务、净现金、股息、回购','披露时点、租赁、受限现金和实际/计划区分','完整十年债务期限及SBC后注销表待补核'],
 ['长期股价、估值及总回报','有日期的价格快照及可复算情景','未取得统一复权、含分红再投及汇率的长期序列；不声称跑赢指数']
 ],genericLimit);
 const quality=table(['判断类型','本版处理'],[
 ['公司已披露事实','数字标明年度、单位及来源；前版已核验来源保留原核验日期，不冒称本次重读全部'],
 ['研究判断','护城河、质量与风险为分析，不是审计结论'],
 ['管理层指引','投资预算、回本期和回购授权均不是已经实现的现金'],
 ['估值假设','情景参数为研究敏感度，不是公司预测或分析师一致预期'],
 ['证据缺口','显式标注待补核/未单列披露，不用故事补足']]);
 const peerTables=ts('peer');
 if(id==='sto')for(const t of peerTables){
  t.rows=t.rows.filter(row=>!row[0].startsWith('韵达'));
  const sf=t.rows.find(row=>row[0].startsWith('顺丰')); if(sf)sf[3]='111.71亿元；公司FCF需统一租赁与处置口径';
  t.note='公司与报告期不同：中通为US GAAP，Q2现金流不可直接与其他公司H1对比；加盟末端资本未全部列入总部。来源：[S5][S6][R3]。不得据此进行利润率或资本回报排名。';
 }
 if(c.peerRows)peerTables.push(table(['公司','收入/盈利结构','资本与现金流/转换成本','国际化及主要风险'],c.peerRows,'定量同行数据仅保留有来源的已披露值；未完成统一CFO、CapEx、ROIC、PE/EV提取的公司，不作数字排名。'));
 const notePeer=peerNotes[id]||[];
 const risk=c.risks||'需求下降时，应先检查收入/单价与固定成本及资本承诺的错配；价格战考验的不是故事而是单位现金利润。技术或政策变化可能降低历史收费能力，必须允许原结论被推翻。';
 const sec=[
 section('一、主公司、同行与核心结论',[`主公司：${c.name}。同行：${c.peers.join('、')}。重整日：2026-09-18；财务截至各节所示，未混入该日之后披露。`,c.decision], [quality]),
 section('二、Value Line长期财务记录',[],hist?[hist]:[]),
 section('三、周期、高低点与数据完整性',[c.cycle],[coverage]),
 section('四、收入、利润和现金的真实引擎',[c.economic,...ps('model')]),
 section('五、每100元收入与行业单位经济',ps('unit'),[c.unit,...ts('unit')].filter(Boolean)),
 section('六、护城河：证据、边界和替代风险',ps('moat'),[table(['能力','财务/经营证据','不能推出的结论'],c.moatRows)]),
 section('七、利润增长桥：经营、税项与股数',c.profitOverride||ps('profit'),c.profitOverride?[]:ts('profit')),
 section('八、ROIC与增量ROIC：新增一元资本是否增值',[c.capital,'方法：一般企业ROIC=可持续NOPAT/期初期末平均投入资本；增量ROIC用跨期ΔNOPAT/Δ投入资本，并与项目现金回收交叉核对。分母为零或负、并购改变边界或投入尚未成熟时，不报告虚假精确百分比。增量利润率、ROE和增量ROIC不是同一指标。银行改用普通股资本与风险资产；基建须穿透项目。']),
 section('九、净利润→经营现金→FCF→Owner Earnings',[c.owner,...ps('cash'),'Owner Earnings的工作定义是可持续税后盈利加非现金费用，扣维护竞争地位所需资本、正常营运资本增长及其他必要现金义务。不能同时从CFO再扣已包含的同笔营运资本或经营租金；也不能把所有增长投入都默认可停。']),
 section('十、资本配置与每股价值',[c.allocation]),
 section('十一、同行比较：为什么选择不同模式',[`直接竞争及不同模式参照：${c.peers.join('、')}。`,...ps('peer'),...notePeer],peerTables),
 section('十二、正常化盈利与估值口径',[c.normal,`价格记录：${m[0]}，${m[1]}。${m[3]} [Q1]`,'企业价值桥：市值＋有息债务＋与盈利口径匹配的租赁及少数权益−可用超额现金−未计盈利的非经营资产。客户款、受限现金及维持营运现金不能全部扣除。若用含利息的净利润PE，不再无条件加一次净现金。历史、同行及当前估值必须同日、同币种、同会计口径，本版未完成的同业估值不以猜值补齐。']),
 section('十三、三情景与价格隐含要求',['以下均为作者假设，不是盈利预测、目标价或一致预期；未分配发生概率。好生意与好价格分别判断，未有一致价格/汇率/股数则不宣称当前低估。','反向检查：要求回报率并不是增长率。PE为M时，起始盈利收益率=1/M；每股盈利增长、实际分配及终值倍数变化共同决定回报，不能把盈利收益率与全部派息/回购重复相加。'],[table(['情景','可复算假设','条件/结果'],c.scenarios)]),
 section('十四、失效路径与不同市场环境',[risk,...ps('risk'),'上行期扩大产能或门店的模式可能更快；价格战时单位成本、现金与渠道健康更重要；需求下降期低固定承诺通常更灵活。对本公司的判断应以上述资本结构与单位经济为准，而非认为市场份额最高者任何环境都胜出。']),
 section('十五、最值得跟踪的五组领先指标',[],[table(['指标','为什么领先/有解释力','重新评估条件'],c.kpis)]),
 section('十六、最终判断与研究置信度',[c.decision,'经营质量结论与估值结论分开：前者由已披露利润和现金支持，后者还依赖正常化、再投资回报和买入价格。项目级增量ROIC及维护资本未完全披露，不能给予“已证实”的标签。','本研究用于长期基本面学习，不构成投资建议；资料和计算均有边界，不能替代独立决策。']),
 section('十七、本次修订、来源日期与待补证据',[c.changes,'本次以原始最新公告复核重点变动，保留前版已核验历史来源与原核验日期。长期表缺口、市场价格缺口和项目回报缺口已在正文显示；“重整完成”不等于所有历史字段已获得完整可比数据。','行业背景：[I1]。宏观零售或行业量价只是需求参照，不能单独证明公司增长原因、市场份额或护城河。'])
 ];
 sec[16].paragraphs[2]='行业及监管参照：[I1]。'+chosenIndustry[2]+' 行业背景不能单独证明公司增长原因、份额或护城河。';
 // Correct citation IDs in new Tencent analysis; originals retain their own IDs.
 if(id==='tencent'){
  for(const s of sec)if(['一、','三、','八、','九、','十、'].some(p=>s.title.startsWith(p))) {
   s.paragraphs=s.paragraphs.map(p=>p===c.capital?p.replace('[S1][S6]','[S1][S5]'):p===c.owner?p.replaceAll('[S6]','[S5]'):p===c.allocation?p.replace('[S1][S7]','[S1][S6]'):p);
  }
  sec[4].tables[0].note=sec[4].tables[0].note.replace('[S1][S6]','[S1][S4]');
 }
 // Some inherited sections describe the same risk; no stale valuations retained.
 const r={slug:id,company:c.name,ticker:study.ticker,subtitle:c.decision,asof:'2026-09-18',revision:'munger-value-line-20260918-v2',basis:'事实、研究判断、公司指引和估值假设分开。人民币/港元/美元/新台币分别标注；历史与半年度不机械比较。历史缺口不等于公司未披露。',summary:[c.decision,c.changes],sections:sec,sources:src};
 fs.writeFileSync(id+'.json',JSON.stringify(r,null,2)+'\n'); reports.push({id,company:c.name,peers:c.peers,originalResearchDate:study.date,date:'2026-09-18',revision:r.revision,chapters:sec.length});
 study.name=c.name;study.date='2026-09-18';study.verdict='经营与价格分开判断';study.valuation= ['cmb','cki','moutai'].includes(id)?({cmb:'9/17：静态PE7.12× / PB0.894×',cki:'9/17：静态PE19.71×',moutai:'9/17：静态PE19.30×'}[id]):'情景估值｜价格基准见正文';study.conclusion=c.decision;study.lead=c.cycle;delete study.sources;
 if(newCharts[id])study.visuals=newCharts[id];
 if(id==='pdd')study.visuals[3]={kind:'bar',title:'H1净利变动：营业以下拖累',note:'人民币亿元，同比差额；不是分部归因。[S1]',labels:['营业利润','利息投资','汇兑改善','其他损失','税/权益法','净利变动'],values:[54.51,22.27,3.38,-128.10,-9.73,-57.67]};
 if(id==='trip')study.visuals[3]={kind:'bar',title:'2026 Q2：罚没与正常化',note:'人民币亿元；披露圆整值。剔罚没不等于所有调整完成。[R1]',labels:['报告归母','剔罚没归母','公司nonGAAP'],values:[-25,27,48]};
 if(id==='tsmc')study.visuals[3]={kind:'bar',title:'2026年1—8月收入增长',note:'公司未经审计实际同比%；不能当全年利润增长。[R1]',labels:['1—8月收入','8月收入'],suffix:'%',values:[39.3,53.3]};
 study.metrics=[['研究框架','长期事实＋资本回报'],['可比同行',c.peers.length+'家'],['正文结构','17章＋来源账本'],['版本','2026-09-18 重整']];
 if(id==='jd'){study.visuals[0].title='十年跨度的收入锚点'; study.visuals[0].note='人民币十亿元；四个已列年度，不是逐年完整十年序列。';}
 if(id==='sto')study.visuals[0].note+='2016—2023为前版数据，逐年原始链接仍待补齐，详见长期表。';
}
let newApp='const CATALOG = '+JSON.stringify(catalog,null,2)+';'+app.slice(end);
newApp=newApp.replace('/\\[(S\\d+)\\]/g','/\\[([SRIQ]\\d+)\\]/g');
newApp=newApp.replace('if (section.table) html += renderTable(section.table,sources);','if (section.table) html += renderTable(section.table,sources);\n    (section.tables || []).forEach(function(t) { html += renderTable(t,sources); });');
newApp=newApp.replace('body.items.slice(0,18)','body.items');
newApp=newApp.replaceAll('10–13','17').replaceAll('長期表＋4 圖＋全文','长期表＋4图＋17章');
newApp=newApp.replaceAll('已披露數值','数据／情景见图注').replaceAll('數據截止：','研究修订：');
newApp=newApp.replace('市場價格只代表文章日期','市场价格仅代表正文注明的快照日期');
// Section anchors must not replace the article hash and send readers home.
newApp=newApp.replace('window.addEventListener("hashchange",route);',`document.addEventListener("click",function(event) {
  const link=event.target.closest('.toc a');
  if(!link)return;
  const target=document.getElementById(link.getAttribute('href').slice(1));
  if(target){event.preventDefault();target.scrollIntoView({behavior:'auto',block:'start'});}
});
window.addEventListener("hashchange",route);`);
newApp=newApp.replace('fmtDate(CATALOG[CATALOG.length-2].date)','fmtDate(CATALOG.map(x=>x.date).sort().at(-1))');
newApp=newApp.replace('每日任務可以產生更新，但外部發布若需要 GitHub 寫入批准，會停下來等使用者確認。','用户已要求每次提交：每次完成研究须提交并发布，再核验正文链接；遇到权限或部署失败须明确报告，不以本地文件冒充上线。');
newApp=newApp.replace('圖表只使用文中已核對數字；季度與年度、不同會計口徑不可機械比較。','图表显示已注明来源的财务数据或明确标注的作者情景；历史锚点不冒充完整逐年数据。');
fs.writeFileSync('app.js',newApp);
const index=oldFile('index.html').replace(/app\.js\?v=[^"']+/,'app.js?v=20260918-v2').replace('href="styles.css"','href="styles.css?v=20260918-v2"').replace('<html lang="zh-Hant">','<html lang="zh-Hans">');fs.writeFileSync('index.html',index);
fs.writeFileSync('research-history.json',JSON.stringify({updated:'2026-09-18',note:'本次为已有13公司批量重整，不当作新增日更选题；以后30天内去重仍据日更研究记录。',revisions:reports},null,2)+'\n');
console.log(JSON.stringify({reports:reports.length,chapters:reports.reduce((n,x)=>n+x.chapters,0),charts:catalog.reduce((n,x)=>n+x.visuals.length,0)}));
