const CATALOG = [
  {
    id: "tencent", file: "tencent.json", name: "騰訊控股", ticker: "0700.HK / 80700.HK",
    date: "2026-09-07", sector: "互聯網與平台", verdict: "高品質觀察名單", valuation: "約 15–16× 盈利",
    conclusion: "微信、遊戲與廣告仍是高回報現金引擎；真正的新問題是 AI 資本開支能否轉成每股自由現金流。",
    lead: "十年收入約 7.3 倍、調整後盈利約 8 倍；2025 毛利率修復至 56.2%，但 2026 Q2 AI 算力預付款令單季自由現金流轉負。",
    metrics: [["2015→2025 收入","102.9→751.8B"],["2025 調整後盈利","259.6B"],["2025 毛利率","56.2%"],["2026 Q2 CapEx","+176%"]],
    visuals: [
      {kind:"line",title:"十年收入與調整後盈利",note:"人民幣十億元；完整年度。",labels:["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025"],series:[{name:"收入",values:[102.9,151.9,237.8,312.7,377.3,482.1,560.1,554.6,609.0,660.3,751.8]},{name:"調整後盈利",values:[32.4,45.4,65.1,77.5,94.4,122.7,123.8,115.6,157.7,222.7,259.6]}]},
      {kind:"line",title:"毛利率先降後升",note:"百分比；規模擴大後盈利結構重新改善。",suffix:"%",labels:["2015","2017","2019","2021","2022","2023","2024","2025"],series:[{name:"毛利率",values:[59.5,49.2,44.4,43.9,43.1,48.1,52.9,56.2]}]},
      {kind:"bar",title:"2026 Q2 增長與投入",note:"同比；CapEx 的增幅遠高於核心業務。",suffix:"%",labels:["收入","國內遊戲","營銷服務","調整後盈利","CapEx"],values:[11,17,22,9,176]},
      {kind:"bar",title:"算力預付款對單季 FCF 的影響",note:"人民幣十億元；公司同時披露兩種口徑。",labels:["含算力預付款","剔除算力預付款"],values:[-13.8,37.6]}
    ]
  },
  {
    id: "hworld", file: "hworld.json", name: "華住集團", ticker: "1179.HK / NASDAQ: HTHT",
    date: "2026-09-07", sector: "酒店與連鎖", verdict: "高品質觀察名單", valuation: "約 19× 盈利",
    conclusion: "資產輕加盟網絡正在提高資本效率，但成熟酒店 RevPAR 下滑，必須驗證新店沒有稀釋舊店回報。",
    lead: "2025 年收入 253.1 億元、歸母利潤 50.8 億元；2026 Q2 中國區約 94.4% 客房已屬管理加盟或特許模式。",
    metrics: [["2025 收入","253.1 億"],["2025 歸母利潤","50.8 億"],["資產輕客房占比","94.4%"],["成熟店 RevPAR","−3.0%"]],
    visuals: [
      {kind:"line",title:"十一年收入軌跡",note:"人民幣百萬元；疫情後規模跨上一級。",labels:["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025"],series:[{name:"收入",values:[5775,6573,8229,10063,11212,10196,12785,13862,21882,23891,25307]}]},
      {kind:"bar",title:"歸母盈利的週期壓力與修復",note:"人民幣百萬元；2020–2022 為虧損。",labels:["2015","2019","2020","2021","2022","2023","2024","2025"],values:[437,1769,-2192,-465,-1821,4085,3048,5080]},
      {kind:"bar",title:"2026 Q2 增長品質",note:"同比百分比；加盟收入增長與成熟店壓力並存。",suffix:"%",labels:["管理加盟收入","成熟店 RevPAR"],values:[25.2,-3.0]},
      {kind:"hbar",title:"中國區客房結構",note:"2026 Q2；管理加盟及特許模式占比。",suffix:"%",labels:["資產輕客房","租賃／自營客房"],values:[94.4,5.6]}
    ]
  },
  {
    id: "cmb", file: "cmb.json", name: "招商銀行", ticker: "600036.SH / 03968.HK",
    date: "2026-09-07", sector: "銀行與財富管理", verdict: "優先跟蹤", valuation: "約 7.2× PE / 0.92× PB",
    conclusion: "低成本零售存款、財富管理與風控形成閉環；低估值只有在完整信貸週期後仍能維持雙位數 ROE 才有意義。",
    lead: "2025 年歸母淨利 1,501.8 億元、普通股 ROE 13.44%；2026 H1 不良率 0.94%，但信用成本與撥備變化仍需同看。",
    metrics: [["2025 歸母淨利","1,501.8 億"],["2025 普通股 ROE","13.44%"],["2026 H1 不良率","0.94%"],["研究日 P/B","約 0.92×"]],
    visuals: [
      {kind:"line",title:"十年營運淨收入與歸母淨利",note:"人民幣百萬元。",labels:["2016","2017","2018","2019","2020","2021","2022","2023","2024","2025"],series:[{name:"營運淨收入",values:[210270,221037,248444,269788,290279,331407,344740,339078,337121,337273]},{name:"歸母淨利",values:[62081,70150,80560,92867,97342,119922,138012,146602,148391,150181]}]},
      {kind:"line",title:"普通股 ROE",note:"百分比；近年在息差壓力下回落。",suffix:"%",labels:["2016","2017","2018","2019","2020","2021","2022","2023","2024","2025"],series:[{name:"ROE",values:[16.27,16.54,16.57,16.84,15.73,16.96,17.06,16.22,14.49,13.44]}]},
      {kind:"line",title:"每股淨資產累積",note:"人民幣；反映留存盈利與資本累積。",labels:["2016","2017","2018","2019","2020","2021","2022","2023","2024","2025"],series:[{name:"普通股 BVPS",values:[15.95,17.69,20.07,22.89,25.36,29.01,32.71,36.71,41.46,43.43]}]},
      {kind:"bar",title:"2026 H1 核心狀態",note:"研究整理口徑。",suffix:"%",labels:["年化 ROE","不良率","淨利同比"],values:[13.42,0.94,2.02]}
    ]
  },
  {
    id: "trip", file: "trip.json", name: "攜程集團", ticker: "9961.HK / NASDAQ: TCOM",
    date: "2026-09-07", sector: "旅遊平台", verdict: "高品質但需監管折價", valuation: "約 11–13× 正常化盈利",
    conclusion: "高毛利、低實體資本的平台優勢仍在；監管整改後能保留多少 take rate 與供應商黏性，決定護城河的真實深度。",
    lead: "2025 年收入 624.1 億元、營業利潤 157.7 億元；表面歸母盈利被投資收益放大，估值應回到正常化經營盈利。",
    metrics: [["2025 收入","624.1 億"],["2025 營業利潤","157.7 億"],["2026 Q1 收入","+17%"],["國際預訂","+65%"]],
    visuals: [
      {kind:"line",title:"十一年收入軌跡",note:"人民幣百萬元；疫情週期清晰可見。",labels:["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025"],series:[{name:"淨收入",values:[10898,19200,26796,30965,35666,18316,20023,20039,44510,53294,62409]}]},
      {kind:"bar",title:"歸母盈利波動",note:"人民幣百萬元；2025 含較大投資收益。",labels:["2015","2016","2019","2020","2021","2022","2023","2024","2025"],values:[2508,-1400,7011,-3247,-550,1403,9918,17067,33294]},
      {kind:"bar",title:"2026 Q1 增長動能",note:"同比百分比；國際預訂增速顯著更快。",suffix:"%",labels:["收入","國際總預訂"],values:[17,65]},
      {kind:"bar",title:"監管現金代價",note:"人民幣十億元；罰沒與退還保證金分開。",labels:["罰沒合計","退還酒店保證金"],values:[5.179,0.122]}
    ]
  },
  {
    id: "tsmc", file: "tsmc.json", name: "台積電", ticker: "2330.TW / NYSE: TSM",
    date: "2026-09-07", sector: "半導體代工", verdict: "優質企業，估值要求高", valuation: "約 28.5× 盈利 / 55.8× FCF",
    conclusion: "技術領先已轉成高利潤，但龐大新增資本要以未來現金回收證明；好公司不等於任何價格都值得。",
    lead: "2015–2025 營收由 8,435 億增至 3.809 兆新台幣，營業率由 37.9% 升至 50.8%；2026 Q2 毛利率達 67.7%。",
    metrics: [["2015→2025 營收","0.84→3.81 兆"],["2025 歸母淨利","1.72 兆"],["2026 Q2 毛利率","67.7%"],["2026 CapEx","US$60–64B"]],
    visuals: [
      {kind:"line",title:"十一年營收與歸母淨利",note:"新台幣十億元。",labels:["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025"],series:[{name:"營收",values:[843.5,947.94,977.45,1031.47,1069.99,1339.25,1587.42,2263.89,2161.74,2894.31,3809.05]},{name:"歸母淨利",values:[306.57,334.25,343.11,351.13,345.26,517.89,596.54,1016.53,838.5,1173.27,1717.88]}]},
      {kind:"line",title:"營業利潤率",note:"百分比；規模與先進製程組合共同改善。",suffix:"%",labels:["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025"],series:[{name:"營業率",values:[37.9,39.9,39.4,37.2,34.8,42.3,40.9,49.5,42.6,45.7,50.8]}]},
      {kind:"bar",title:"2026 Q2 盈利率",note:"百分比。",suffix:"%",labels:["毛利率","營業利潤率"],values:[67.7,60.3]},
      {kind:"hbar",title:"先進製程收入占比",note:"2026 Q2；7nm及更先進製程。",suffix:"%",labels:["先進製程","其他製程"],values:[77,23]}
    ]
  },
  {
    id: "midea", file: "midea.json", name: "美的集團", ticker: "000333.SZ / 0300.HK",
    date: "2026-09-07", sector: "家電與製造", verdict: "最高優先級之一", valuation: "約 14.9× PE",
    conclusion: "把普通製造業靠效率、現金週轉與多品類做成好生意；真正護城河是成本與執行，不是奢侈品式提價權。",
    lead: "2015–2025 收入由 1,384 億增至 4,585 億元、歸母利潤由 127 億增至 439.5 億元；毛利率幾乎不變。",
    metrics: [["2015→2025 收入","1,384→4,585 億"],["2025 歸母淨利","439.5 億"],["2025 經營現金流","533.5 億"],["2025 股東回報","約 100% 淨利"]],
    visuals: [
      {kind:"bar",title:"十年規模與盈利",note:"人民幣十億元；兩期完整年度。",labels:["2015 收入","2025 收入","2015 淨利","2025 淨利"],values:[138.4,458.5,12.7,43.95]},
      {kind:"line",title:"毛利率沒有靠提價拉升",note:"百分比；2026 H1 為半年口徑。",suffix:"%",labels:["2015","2025","2026 H1"],series:[{name:"毛利率",values:[25.92,26.2,27.9]}]},
      {kind:"bar",title:"2026 H1 三大家電收入增長",note:"同比百分比；同一需求環境下的壓力測試。",suffix:"%",labels:["美的","格力","海爾智家"],values:[3.6,-8.2,-2.8]},
      {kind:"bar",title:"2025 現金返還股東",note:"人民幣十億元；分紅加回購約等於當年歸母淨利。",labels:["現金分紅","回購"],values:[32.4,11.6]}
    ],
    sources: [
      ["美的投資者關係","https://www.midea.com.cn/en/Investors?wcmmode=disabled"],
      ["美的信息披露","https://www.midea.com.cn/en/Investors/information_disclosure"]
    ]
  },
  {
    id: "jd", file: "jd.json", name: "京東集團", ticker: "9618.HK / NASDAQ: JD",
    date: "2026-09-08", sector: "電商與供應鏈", verdict: "有條件地便宜", valuation: "低估值取決於新業務止血",
    conclusion: "核心零售已成為好生意；真正風險是外賣、京喜與海外等新業務持續吞噬核心現金，而不是零售護城河突然消失。",
    lead: "2025 年 JD Retail 營業利潤 514 億元、利潤率由 4.0% 升至 4.6%，但合併自由現金流由 437 億降至 64.8 億元。",
    metrics: [["2025 收入","1.309 兆"],["Retail 營業利潤","514 億"],["Retail margin","4.6%"],["2025 FCF","64.8 億"]],
    visuals: [
      {kind:"line",title:"十年收入擴張",note:"人民幣十億元；2026 Q2 為單季，不與全年直接比較。",labels:["2015","2020","2024","2025"],series:[{name:"年度收入",values:[181.3,745.8,1158.8,1309.1]}]},
      {kind:"line",title:"核心零售營業利潤率",note:"百分比；核心效率仍然穩健。",suffix:"%",labels:["2024","2025","2025 Q2","2026 Q2"],series:[{name:"JD Retail margin",values:[4.0,4.6,4.5,4.6]}]},
      {kind:"bar",title:"新業務季度虧損收窄",note:"人民幣十億元；負值表示營業虧損。",labels:["2025 Q2","2026 Q2"],values:[-14.777,-9.854]},
      {kind:"bar",title:"2025 股東回報",note:"美元十億元；回購股份已註銷。",labels:["股票回購","年度股息"],values:[3.0,1.4]}
    ]
  },
  {
    id: "sf", file: "sf.json", name: "順豐控股", ticker: "002352.SZ / 06936.HK",
    date: "2026-09-09", sector: "快遞與物流", verdict: "高優先級研究", valuation: "約 16× PE / 10× 2025 FCF",
    conclusion: "競爭位置很好、行業經濟一般；真正轉折是網絡由建設期進入收穫期後，FCF 能否持續快過收入。",
    lead: "2017–2025 收入擴大 4.34 倍，盈利只擴大 2.33 倍；2025 自由現金流 179.3 億元，開始高於淨利。",
    metrics: [["2025 收入","3,082 億"],["2025 歸母淨利","111.2 億"],["2025 FCF","179.3 億"],["2026 H1 扣非淨利","+9.3%"]],
    visuals: [
      {kind:"line",title:"規模增長快於盈利",note:"人民幣十億元。",labels:["2017","2020","2023","2025"],series:[{name:"收入",values:[71.1,154.0,258.4,308.2]},{name:"歸母淨利",values:[4.77,7.33,8.23,11.12]}]},
      {kind:"bar",title:"毛利率下台階",note:"百分比；綜合物流擴張改變收入結構。",suffix:"%",labels:["2017","2026 H1"],values:[20.1,13.17]},
      {kind:"hbar",title:"2025 業務收入結構",note:"人民幣十億元。",labels:["時效快遞","供應鏈及國際","快運","經濟快遞","同城配送","冷鏈及醫藥"],values:[131.1,72.9,42.1,32.1,12.7,10.6]},
      {kind:"bar",title:"2026 H1 經營槓桿訊號",note:"同比百分比。",suffix:"%",labels:["收入","毛利","扣非淨利"],values:[5.9,7.5,9.3]}
    ],
    sources: [
      ["順豐投資者關係","https://www.sf-express.com/cn/sc/dynamic_function/ir"],
      ["順豐港交所披露入口","https://www1.hkexnews.hk/search/titlesearch.xhtml?lang=zh"]
    ]
  },
  {
    id: "yumc", file: "yumc.json", name: "百勝中國", ticker: "9987.HK / NYSE: YUMC",
    date: "2026-09-10", sector: "餐飲與連鎖", verdict: "合理偏吸引", valuation: "約 15–19× 正常化盈利",
    conclusion: "門店、供應鏈與標準化是真護城河；新店加盟比例上升，可能讓公司從優秀餐飲營運商變得更資本輕。",
    lead: "2026 Q2 系統銷售 +6%、同店交易 +5%；總門店 19,297 家，新開店中 41% 由加盟商開設。",
    metrics: [["門店數","19,297"],["同店交易量","+5%"],["新店加盟占比","41%"],["Restaurant margin","16.1%"]],
    visuals: [
      {kind:"bar",title:"規模與盈利的長期擴張",note:"收入與營業利潤為美元十億元；門店數另見下一圖。",labels:["2016 收入","2025 收入","2016 營業利潤","2025 營業利潤"],values:[6.75,11.8,0.64,1.29]},
      {kind:"line",title:"門店網絡擴張",note:"門店數；2016 為約數。",labels:["2016","2025","2026 H1"],series:[{name:"門店",values:[7500,18101,19297]}]},
      {kind:"line",title:"新開店的加盟比例",note:"百分比；邊際門店結構正快速變輕。",suffix:"%",labels:["2025","2026 Q1","2026 Q2"],series:[{name:"加盟占比",values:[31,39,41]}]},
      {kind:"bar",title:"2026 Q2 增長品質",note:"同比百分比。",suffix:"%",labels:["系統銷售","同店銷售","同店交易","外送銷售"],values:[6,1,5,26]}
    ],
    sources: [
      ["百勝中國年度報告","https://ir.yumchina.com/zh-hans/annual-reports"],
      ["2026 Q2 正式業績","https://www.sec.gov/Archives/edgar/data/1673358/000119312526324793/yumc-ex99_1.htm"],
      ["股息及回購記錄","https://ir.yumchina.com/zh-hans/dividend-history/"]
    ]
  },
  {
    id: "moutai", file: "moutai.json", name: "貴州茅台", ticker: "600519.SH",
    date: "2026-08-14", sector: "高端白酒", verdict: "高優先級估值觀察", valuation: "約 20.3× TTM PE",
    conclusion: "品牌、稀缺性與時間形成極強護城河；增長由放量轉向定價、直銷與資本返還，20 倍是否便宜取決於未來增速。",
    lead: "2015–2025 營收約增長 5.17 倍、歸母淨利約 5.31 倍；2026 H1 收入 +1.47%、淨利 −1.95%，進入增長模式切換。",
    metrics: [["2015→2025 收入","32.66→168.84B"],["2025 歸母淨利","82.32B"],["酒類毛利率","91.23%"],["2025 分紅率","約 79%"]],
    visuals: [
      {kind:"line",title:"收入與歸母淨利",note:"人民幣十億元；2026 H1 為半年數據。",labels:["2015","2020","2023","2024","2025","2026 H1"],series:[{name:"收入",values:[32.66,94.92,147.69,170.90,168.84,90.70]},{name:"歸母淨利",values:[15.50,46.70,74.73,86.23,82.32,44.52]}]},
      {kind:"line",title:"簡化自由現金流",note:"人民幣十億元；2025 現金流受多項營運因素影響。",labels:["2015","2020","2023","2024","2025"],series:[{name:"FCF",values:[15.38,49.58,63.97,87.78,58.39]}]},
      {kind:"bar",title:"2025 酒類毛利率",note:"百分比；產品結構差異很大。",suffix:"%",labels:["茅台酒","系列酒","酒類整體"],values:[93.53,76.11,91.23]},
      {kind:"bar",title:"2025 資本配置",note:"人民幣十億元。",labels:["分紅","回購","資本開支"],values:[65.03,6.0,3.13]}
    ],
    sources: [
      ["貴州茅台財務報告","https://www.moutai.com.cn/mtgf/tzzgx/cwbg/index.html"],
      ["貴州茅台投資者關係","https://www.moutai.com.cn/mtgf/tzzgx/index.html"]
    ]
  }
];

const $ = function(sel, root) { return (root || document).querySelector(sel); };
const esc = function(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, function(c) {
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
  });
};
const safeUrl = function(url) { return /^https?:\/\//i.test(String(url || "")) ? String(url) : "#"; };
const fmtDate = function(value) { return String(value || "").replaceAll("-", "."); };
const findStudy = function(id) { return CATALOG.find(function(item) { return item.id === id; }); };
const chartColors = ["#2f6f89","#c28b32","#7c927f","#9c5d52"];

function sourceMap(report, study) {
  const map = {};
  const list = [];
  (report.sources || []).forEach(function(source, index) {
    const item = Array.isArray(source)
      ? {id:"S" + (index + 1), title:source[0], url:source[1], detail:""}
      : source;
    map[item.id || ("S" + (index + 1))] = item;
    list.push(item);
  });
  (study.sources || []).forEach(function(source, index) {
    const item = {id:"W" + (index + 1), title:source[0], url:source[1], detail:""};
    if (!list.some(function(x) { return x.url === item.url; })) list.push(item);
  });
  return {map:map,list:list};
}

function inlineRich(value, sources) {
  let out = esc(value);
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, function(_, label, url) {
    return '<a href="' + esc(safeUrl(url)) + '" target="_blank" rel="noopener">' + label + "</a>";
  });
  out = out.replace(/\[(S\d+)\]/g, function(token, id) {
    const source = sources[id];
    if (!source) return token;
    return '<a class="cite" href="' + esc(safeUrl(source.url)) + '" target="_blank" rel="noopener" aria-label="來源 ' + esc(id) + '">' + esc(id) + "</a>";
  });
  return out;
}

function renderTable(table, sources) {
  if (!table || !table.headers || !table.rows) return "";
  return '<div class="table-wrap"><table><thead><tr>' +
    table.headers.map(function(h) { return "<th>" + inlineRich(h, sources) + "</th>"; }).join("") +
    "</tr></thead><tbody>" +
    table.rows.map(function(row) {
      return "<tr>" + row.map(function(cell) { return "<td>" + inlineRich(cell, sources) + "</td>"; }).join("") + "</tr>";
    }).join("") +
    "</tbody></table>" +
    (table.note ? '<p class="table-note">' + inlineRich(table.note, sources) + "</p>" : "") +
    "</div>";
}

function lineChart(cfg) {
  const width = Math.max(680, cfg.labels.length * 74);
  const height = 260;
  const pad = {l:58,r:24,t:28,b:45};
  const all = cfg.series.flatMap(function(s) { return s.values; });
  let min = Math.min.apply(null, all.concat([0]));
  let max = Math.max.apply(null, all.concat([1]));
  if (min >= 0) min = 0;
  const margin = (max - min || 1) * 0.08;
  max += margin;
  if (min < 0) min -= margin;
  const range = max - min || 1;
  const x = function(i) { return pad.l + i * (width - pad.l - pad.r) / Math.max(1, cfg.labels.length - 1); };
  const y = function(v) { return pad.t + (max - v) * (height - pad.t - pad.b) / range; };
  const fmt = function(v) {
    const a = Math.abs(v);
    const n = a >= 1000 ? Math.round(v).toLocaleString() : (a < 10 ? Math.round(v * 100) / 100 : Math.round(v * 10) / 10);
    return n + (cfg.suffix || "");
  };
  let svg = '<svg class="chart" viewBox="0 0 ' + width + " " + height + '" role="img" aria-label="' + esc(cfg.title) + '">';
  [0,0.5,1].forEach(function(t) {
    const v = min + range * t;
    const yy = y(v);
    svg += '<line class="gridline" x1="' + pad.l + '" x2="' + (width-pad.r) + '" y1="' + yy + '" y2="' + yy + '"/>';
    svg += '<text class="chart-label" x="6" y="' + (yy+4) + '">' + esc(fmt(v)) + "</text>";
  });
  svg += '<line class="axis" x1="' + pad.l + '" x2="' + (width-pad.r) + '" y1="' + y(0) + '" y2="' + y(0) + '"/>';
  cfg.labels.forEach(function(label, i) {
    svg += '<text class="chart-label" text-anchor="middle" x="' + x(i) + '" y="' + (height-13) + '">' + esc(label) + "</text>";
  });
  cfg.series.forEach(function(series, si) {
    const d = series.values.map(function(v,i) { return (i ? "L " : "M ") + x(i) + " " + y(v); }).join(" ");
    svg += '<path class="chart-line" style="stroke:' + chartColors[si % chartColors.length] + '" d="' + d + '"/>';
    series.values.forEach(function(v,i) {
      svg += '<circle class="chart-dot" style="fill:' + chartColors[si % chartColors.length] + '" cx="' + x(i) + '" cy="' + y(v) + '" r="4.5"><title>' + esc(series.name + " " + cfg.labels[i] + ": " + fmt(v)) + "</title></circle>";
    });
  });
  svg += "</svg>";
  const legend = cfg.series.map(function(s,i) {
    return '<span class="legend"><i style="background:' + chartColors[i % chartColors.length] + '"></i>' + esc(s.name) + "</span>";
  }).join("");
  return chartShell(cfg, svg, legend);
}

function barChart(cfg) {
  const width = Math.max(680, cfg.labels.length * 118);
  const height = 260;
  const pad = {l:58,r:24,t:34,b:56};
  const max0 = Math.max.apply(null, cfg.values.concat([0]));
  const min0 = Math.min.apply(null, cfg.values.concat([0]));
  const margin = (max0 - min0 || 1) * 0.16;
  const max = max0 + margin;
  const min = min0 < 0 ? min0 - margin : 0;
  const range = max - min || 1;
  const y = function(v) { return pad.t + (max - v) * (height - pad.t - pad.b) / range; };
  const zero = y(0);
  const slot = (width-pad.l-pad.r)/cfg.values.length;
  const bw = Math.min(70, slot * 0.56);
  const fmt = function(v) {
    const a = Math.abs(v);
    const n = a >= 1000 ? Math.round(v).toLocaleString() : (a < 10 ? Math.round(v*100)/100 : Math.round(v*10)/10);
    return n + (cfg.suffix || "");
  };
  let svg = '<svg class="chart" viewBox="0 0 ' + width + " " + height + '" role="img" aria-label="' + esc(cfg.title) + '">';
  [0,0.5,1].forEach(function(t) {
    const v = min + range * t;
    const yy = y(v);
    svg += '<line class="gridline" x1="' + pad.l + '" x2="' + (width-pad.r) + '" y1="' + yy + '" y2="' + yy + '"/>';
    svg += '<text class="chart-label" x="6" y="' + (yy+4) + '">' + esc(fmt(v)) + "</text>";
  });
  svg += '<line class="axis" x1="' + pad.l + '" x2="' + (width-pad.r) + '" y1="' + zero + '" y2="' + zero + '"/>';
  cfg.values.forEach(function(v,i) {
    const xx = pad.l + i*slot + (slot-bw)/2;
    const top = y(Math.max(v,0));
    const bottom = y(Math.min(v,0));
    const h = Math.max(2, Math.abs(bottom-top));
    const color = v < 0 ? "#9c5d52" : chartColors[i % 3];
    svg += '<rect x="' + xx + '" y="' + Math.min(top,bottom) + '" width="' + bw + '" height="' + h + '" rx="5" fill="' + color + '"><title>' + esc(cfg.labels[i] + ": " + fmt(v)) + "</title></rect>";
    svg += '<text class="chart-value" text-anchor="middle" x="' + (xx+bw/2) + '" y="' + (v >= 0 ? top-8 : bottom+16) + '">' + esc(fmt(v)) + "</text>";
    svg += '<text class="chart-label" text-anchor="middle" x="' + (xx+bw/2) + '" y="' + (height-18) + '">' + esc(cfg.labels[i]) + "</text>";
  });
  svg += "</svg>";
  return chartShell(cfg, svg, '<span class="legend"><i style="background:#2f6f89"></i>已披露數值</span>');
}

function horizontalBars(cfg) {
  const max = Math.max.apply(null, cfg.values.map(Math.abs).concat([1]));
  const rows = cfg.labels.map(function(label,i) {
    const width = Math.abs(cfg.values[i]) / max * 100;
    return '<div class="hbar-row"><div class="hbar-label">' + esc(label) + '</div><div class="hbar-track"><span style="width:' + width + '%"></span></div><strong>' + esc(cfg.values[i] + (cfg.suffix || "")) + "</strong></div>";
  }).join("");
  return '<figure class="chart-card"><figcaption><h3>' + esc(cfg.title) + '</h3><p>' + esc(cfg.note || "") + '</p></figcaption><div class="hbars">' + rows + "</div></figure>";
}

function chartShell(cfg, svg, legend) {
  return '<figure class="chart-card"><figcaption><h3>' + esc(cfg.title) + '</h3><p>' + esc(cfg.note || "") + '</p></figcaption><div class="chart-wrap">' + svg + '</div><div class="chart-legend">' + legend + "</div></figure>";
}

function renderVisual(cfg) {
  if (cfg.kind === "line") return lineChart(cfg);
  if (cfg.kind === "hbar") return horizontalBars(cfg);
  return barChart(cfg);
}

function markdownHeadings(markdown) {
  const result = [];
  let index = 0;
  String(markdown || "").split(/\r?\n/).forEach(function(line) {
    const match = line.match(/^(#{1,2})\s+(.+)$/);
    if (!match) return;
    const title = match[2].replace(/\*\*/g,"").trim();
    if (title && result.length < 18) result.push({id:"md-" + index,title:title});
    index += 1;
  });
  return result;
}

function renderMarkdown(markdown, sources) {
  const lines = String(markdown || "").split(/\r?\n/);
  let html = "";
  let i = 0;
  let headingIndex = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i += 1; continue; }
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      if (heading[1].length === 3) {
        html += '<p class="emphasis-line">' + inlineRich(heading[2], sources) + "</p>";
      } else {
        html += '<h2 id="md-' + headingIndex + '">' + inlineRich(heading[2], sources) + "</h2>";
        headingIndex += 1;
      }
      i += 1; continue;
    }
    if (/^---+$/.test(line)) { html += "<hr/>"; i += 1; continue; }
    if (line.startsWith(">")) {
      const quote = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quote.push(lines[i].trim().replace(/^>\s?/,"")); i += 1;
      }
      html += "<blockquote>" + quote.map(function(x) { return inlineRich(x,sources); }).join("<br>") + "</blockquote>";
      continue;
    }
    if (line.startsWith("|") && i + 1 < lines.length && /^\|?[\s:|-]+\|/.test(lines[i+1].trim())) {
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(lines[i].trim().replace(/^\||\|$/g,"").split("|").map(function(x){ return x.trim(); }));
        i += 1;
      }
      const headers = rows.shift() || [];
      rows.shift();
      html += renderTable({headers:headers,rows:rows}, sources);
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/,"")); i += 1;
      }
      html += "<ul>" + items.map(function(x){ return "<li>" + inlineRich(x,sources) + "</li>"; }).join("") + "</ul>";
      continue;
    }
    if (/^\d+[.)]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+[.)]\s+/,"")); i += 1;
      }
      html += "<ol>" + items.map(function(x){ return "<li>" + inlineRich(x,sources) + "</li>"; }).join("") + "</ol>";
      continue;
    }
    const paragraph = [line];
    i += 1;
    while (i < lines.length && lines[i].trim() && !/^(#{1,3})\s+/.test(lines[i].trim()) && !lines[i].trim().startsWith("|") && !lines[i].trim().startsWith(">") && !/^[-*]\s+/.test(lines[i].trim()) && !/^\d+[.)]\s+/.test(lines[i].trim()) && !/^---+$/.test(lines[i].trim())) {
      paragraph.push(lines[i].trim()); i += 1;
    }
    html += "<p>" + paragraph.map(function(x){ return inlineRich(x,sources); }).join("<br>") + "</p>";
  }
  return html;
}

function tocHTML(items) {
  if (!items.length) return "";
  return '<details class="toc" open><summary>文章導航</summary><nav>' +
    items.map(function(item) { return '<a href="#' + esc(item.id) + '">' + esc(item.title) + "</a>"; }).join("") +
    "</nav></details>";
}

function structuredBody(report, sources) {
  let items = [];
  let html = "";
  if (report.history) {
    items.push({id:"history",title:report.history.title || "長期數據"});
    html += '<section class="report-section" id="history"><h2>' + esc(report.history.title || "長期數據") + "</h2>" + renderTable(report.history,sources) + "</section>";
  }
  (report.sections || []).forEach(function(section,index) {
    const id = "section-" + index;
    items.push({id:id,title:section.title});
    html += '<section class="report-section" id="' + id + '"><h2>' + inlineRich(section.title,sources) + "</h2>";
    (section.paragraphs || []).forEach(function(p) { html += "<p>" + inlineRich(p,sources) + "</p>"; });
    if (section.table) html += renderTable(section.table,sources);
    html += "</section>";
  });
  return {items:items,html:html};
}

function sourceLedger(sourceData) {
  if (!sourceData.list.length) return "";
  return '<section class="report-section sources" id="sources"><div class="section-kicker">Source ledger</div><h2>原始資料與查核入口</h2><p>點開來源可回到公司、監管機構或交易所披露。本站以網頁文章為主，不保留失效的 sandbox PDF 入口。</p><div class="source-list">' +
    sourceData.list.map(function(source) {
      return '<a class="source-link" href="' + esc(safeUrl(source.url)) + '" target="_blank" rel="noopener"><span><b>' + esc(source.id || "") + "</b><strong>" + esc(source.title) + "</strong>" + (source.detail ? "<small>" + esc(source.detail) + "</small>" : "") + '</span><em>開啟來源 ↗</em></a>';
    }).join("") + "</div></section>";
}

function cardHTML(study) {
  return '<article class="company-card"><div class="card-top"><div><h2>' + esc(study.name) + '</h2><div class="ticker">' + esc(study.ticker) + '</div></div><span class="tag">' + esc(study.sector) + '</span></div><p class="card-conclusion">' + esc(study.conclusion) + '</p><div class="depth-row"><span>完整研究</span><b>長期表＋4 圖＋全文</b></div><div class="card-meta"><span>' + fmtDate(study.date) + " · " + esc(study.valuation) + '</span><a class="card-link" href="#/article/' + esc(study.id) + '">閱讀完整版 →</a></div></article>';
}

function renderHome() {
  const industries = Array.from(new Set(CATALOG.map(function(x){ return x.sector; })));
  $("#app").innerHTML = '<div class="shell"><section class="hero"><div><div class="eyebrow">Daily Munger Value Line</div><h1>把好公司，放回長期數字裡看。</h1><p>每篇均為完整網頁研究：長期財務、護城河、單位經濟、利潤拆解、資本配置、同行、估值、反證、追蹤指標與來源。</p><div class="hero-stats"><span><b>' + CATALOG.length + '</b>家公司</span><span><b>' + (CATALOG.length*4) + '</b>張研究圖</span><span><b>10–13</b>個正文模組</span></div></div><aside class="hero-note"><strong>閱讀原則</strong><p>先看生意，再看價格；把已實現的利潤與尚待驗證的故事分開。市場價格只代表文章日期，使用前請回到原始披露。</p></aside></section><section class="toolbar" aria-label="研究篩選"><input id="search" class="input" type="search" placeholder="搜尋公司、代碼、行業或結論…" /><select id="sector"><option value="">全部行業</option>' + industries.map(function(x){ return "<option>" + esc(x) + "</option>"; }).join("") + '</select></section><div class="result-line"><span id="result-count">' + CATALOG.length + ' 篇完整研究</span><span>最近整理：' + fmtDate(CATALOG[CATALOG.length-2].date) + '</span></div><section id="cards" class="cards">' + CATALOG.map(cardHTML).join("") + "</section></div>";
  const update = function() {
    const q = $("#search").value.trim().toLowerCase();
    const sector = $("#sector").value;
    const list = CATALOG.filter(function(s) {
      return (!sector || s.sector === sector) && (!q || [s.name,s.ticker,s.sector,s.conclusion,s.verdict,s.valuation].join(" ").toLowerCase().includes(q));
    });
    $("#cards").innerHTML = list.length ? list.map(cardHTML).join("") : '<div class="empty">找不到相符研究。可以換一個公司名稱、代碼或行業。</div>';
    $("#result-count").textContent = list.length + " 篇完整研究";
  };
  $("#search").addEventListener("input",update);
  $("#sector").addEventListener("change",update);
}

async function renderArticle(study) {
  $("#app").innerHTML = '<div class="shell"><a class="back" href="#/">← 返回研究索引</a><div class="loading">正在載入完整研究…</div></div>';
  try {
    const response = await fetch(study.file, {cache:"no-store"});
    if (!response.ok) throw new Error("HTTP " + response.status);
    const report = await response.json();
    const sourceData = sourceMap(report,study);
    const summary = (report.summary && report.summary.length) ? report.summary : [study.lead,study.conclusion];
    const body = report.format === "markdown"
      ? {items:markdownHeadings(report.markdown),html:'<section class="report-section prose" id="full-report"><div class="section-kicker">完整原研究</div>' + renderMarkdown(report.markdown,sourceData.map) + "</section>"}
      : structuredBody(report,sourceData.map);
    const tocItems = [{id:"evidence",title:"關鍵數據與圖表"}].concat(body.items.slice(0,18)).concat([{id:"sources",title:"來源鏈接"}]);
    const metrics = study.metrics.map(function(metric) {
      return '<div class="metric"><span>' + esc(metric[0]) + "</span><strong>" + esc(metric[1]) + "</strong></div>";
    }).join("");
    const summaryHTML = summary.map(function(p) { return "<p>" + inlineRich(p,sourceData.map) + "</p>"; }).join("");
    $("#app").innerHTML = '<div class="reading-progress" id="reading-progress"></div><div class="shell article-shell"><a class="back" href="#/">← 返回研究索引</a><header class="article-header"><div class="article-title"><div class="article-badge">' + esc(study.sector) + " · " + fmtDate(study.date) + '</div><h1>' + esc(study.name) + '</h1><p>' + esc(report.subtitle || study.lead) + '</p><div class="article-meta">' + esc(study.ticker) + " · 數據截止：" + fmtDate(report.asof || study.date) + '</div></div><aside class="decision"><span>芒格式結論</span><strong>' + esc(study.verdict) + '</strong><p>' + esc(study.conclusion) + '</p><div class="valuation-chip">' + esc(study.valuation) + '</div></aside></header><section class="metrics">' + metrics + '</section><section class="summary-panel"><div class="section-kicker">Executive read</div><h2>先給結論</h2>' + summaryHTML + '<p class="basis">' + esc(report.basis || "") + '</p></section><div class="article-grid">' + tocHTML(tocItems) + '<article class="article-content"><section class="report-section evidence" id="evidence"><div class="section-kicker">Evidence first</div><h2>關鍵數據與圖表</h2><div class="chart-grid">' + study.visuals.map(renderVisual).join("") + '</div><p class="chart-disclaimer">圖表只使用文中已核對數字；季度與年度、不同會計口徑不可機械比較。游標停在數據點可查看精確值。</p></section>' + body.html + sourceLedger(sourceData) + "</article></div></div>";
    bindProgress();
  } catch (error) {
    $("#app").innerHTML = '<div class="shell"><a class="back" href="#/">← 返回研究索引</a><div class="empty"><strong>完整研究暫時載入失敗。</strong><br>請重新整理頁面；若仍失敗，可先返回研究索引。</div></div>';
  }
}

function bindProgress() {
  const bar = $("#reading-progress");
  const update = function() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? Math.min(100, window.scrollY/max*100) : 0) + "%";
  };
  window.removeEventListener("scroll",window.__valueLineProgress || function(){});
  window.__valueLineProgress = update;
  window.addEventListener("scroll",update,{passive:true});
  update();
}

function renderAbout() {
  $("#app").innerHTML = '<div class="shell"><a class="back" href="#/">← 返回研究索引</a><section class="hero"><div><div class="eyebrow">方法與更新</div><h1>每天加一篇，直接成為完整網頁。</h1><p>網站已改為「一家公司一份資料檔＋自動生成文章頁」。新增研究不再製作 PDF，也不需要改動整個首頁。</p></div><aside class="hero-note"><strong>每日流程</strong><p>選公司 → 查公司與監管原始資料 → 完成完整研究 → 新增 公司代號.json → 在索引登記摘要與圖表 → 推送 GitHub Pages。</p></aside></section><div class="about-grid"><section class="report-section"><h2>完整研究固定包含</h2><div class="step"><strong>1｜長期財務腳印</strong><span>收入、盈利、利潤率、ROE／ROIC、現金流與每股數據。</span></div><div class="step"><strong>2｜商業模式與單位經濟</strong><span>把規模、價格、成本、週轉與資本需求拆開。</span></div><div class="step"><strong>3｜投資判斷</strong><span>同行、估值、反證、風險、追蹤指標與重新評估條件。</span></div><div class="step"><strong>4｜來源可追溯</strong><span>材料數字回到公司、交易所或監管原始披露。</span></div></section><section class="report-section"><h2>更新與發布邊界</h2><p>文章日期表示研究時點，不代表今日報價；市場數據與估值每次新增或更新時必須重核。</p><p>網站是純靜態 GitHub Pages，沒有後端與密碼。每日任務可以產生更新，但外部發布若需要 GitHub 寫入批准，會停下來等使用者確認。</p><p>原始披露本身可能是 PDF，但只是來源查核鏈接；網站正文永遠是主要閱讀入口。</p></section></div></div>';
}

async function route() {
  const hash = location.hash || "#/";
  if (hash === "#/" || hash === "#") { renderHome(); window.scrollTo(0,0); return; }
  if (hash === "#/about") { renderAbout(); window.scrollTo(0,0); return; }
  const match = hash.match(/^#\/article\/([^/?]+)/);
  const study = match && findStudy(match[1]);
  if (study) { await renderArticle(study); window.scrollTo(0,0); return; }
  renderHome(); window.scrollTo(0,0);
}

window.addEventListener("hashchange",route);
route();
