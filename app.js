const STUDIES = [
  {
    id: 'tencent', name: '騰訊控股', ticker: '0700.HK', date: '2026-09-02', sector: '互聯網平台', verdict: '高優先級研究', valuation: '約 15× TTM PE',
    conclusion: '現金牛正在把自由現金流大量轉向 AI 基建；核心問題由「流量變現」轉為「AI 增量 ROIC」。',
    lead: '微信關係鏈、支付、內容、廣告與商戶網絡形成複合護城河。過去十年收入約增長 7.3 倍，Non-IFRS 核心利潤約增長 8 倍；2023–2025 毛利率由約 43% 升至 56%。',
    metrics: [['十年收入', '約 7.3×'], ['2026 Q2 國內遊戲', '+17%'], ['2026 Q2 營銷服務', '+22%'], ['AI CapEx', '同比 +176%']],
    trend: {title:'長期規模與盈利（指數，2015=100）', note:'整理自研究稿；指數用於看方向，不等同公司指引。', labels:['2015','2020','2025'], a:[100,390,730], b:[100,420,800], aName:'收入', bName:'核心利潤'},
    bars: {title:'關鍵轉折：毛利率', note:'百分比；2023–2025。', labels:['2023','2024','2025'], a:[43,50,56], aName:'毛利率', suffix:'%'},
    sections: {
      model: '本質是多重網絡效應的數字基礎設施：社交關係鏈帶來高頻使用，支付與小程序連接交易，內容和廣告再把流量變現。護城河不是某一款遊戲，而是跨產品的數據、身份與商戶網絡。',
      unit: '增量廣告與遊戲收入通常不需要同比例增加線下資產；但 AI 推理和訓練正在改變這個單位經濟，算力折舊、資本開支與能源成本成為新變量。',
      growth: ['流量變現效率提升：營銷服務仍是最重要的增量來源。','遊戲內容與海外市場提供第二曲線。','AI 既可能提高推薦、廣告和雲效率，也可能吞噬自由現金流。'],
      capital: '過去回購是重要的每股價值工具；2026 年要重新檢查 AI 資本開支與回購的先後順序，以及新增資產是否能達到足夠回報。',
      peers: '相較成熟全球平台，估值折價部分反映中國資產、監管與 AI 投資不確定性；比較時應使用正常化盈利，而不是單季自由現金流。',
      valuationText: '約 15× TTM PE 已低於其過去高景氣估值中樞，但「便宜」的前提是 AI 投資不會把高現金轉換模式永久改寫。',
      watch: ['Marketing Services 增長率','AI CapEx / Free Cash Flow','含 AI 與不含 AI 的 Non-IFRS operating margin','Weixin/WeChat MAU 與視頻號、小程序變現','回購金額與實際股數變化']
    },
    sources: [['騰訊財務報告', 'https://www.tencent.com/investors/financial-reports/'], ['騰訊投資者關係', 'https://www.tencent.com/investors/']]
  },
  {
    id: 'hworld', name: '華住集團', ticker: '1179.HK / HTHT', date: '2026-09-03', sector: '酒店', verdict: '高優先級研究', valuation: '約 19.4× TTM PE',
    conclusion: '資產輕化是真實的利潤引擎，但成熟酒店 RevPAR 仍弱，不能把開店增長直接當成同店需求回升。',
    lead: '模型由自營租賃酒店逐步轉向加盟商出資、華住收品牌與管理費；2026 Q2 管理加盟及特許收入同比 +25.2%，中國區約 94% 客房已屬資產輕模式。',
    metrics: [['中國區資產輕客房', '約 94%'], ['加盟及特許收入', '+25.2%'], ['2025 營業利潤率', '26.9%'], ['成熟酒店 RevPAR', '-3.0%']],
    trend: {title:'利潤率改善', note:'百分比；2024–2025。', labels:['2024','2025'], a:[21.8,26.9], aName:'營業利潤率'},
    bars: {title:'增長質量的兩面', note:'百分比；最新披露口徑。', labels:['加盟/特許收入','成熟店 RevPAR'], a:[25.2,-3], aName:'同比變化', suffix:'%'},
    sections: {
      model: '酒店品牌、會員、收益管理和加盟管理系統共同構成平台；新店由加盟商投入資本，令華住可以用更少的自有資產擴大房間網絡。',
      unit: '單店經濟取決於加盟商回本期、管理費／特許費、開店速度與成熟店 RevPAR。資產輕不等於沒有責任：品牌標準、會員體驗和服務質量仍由平台承擔。',
      growth: ['加盟化提高收入的經常性與資本效率。','新店數量仍是重要增長來源。','成熟店 RevPAR 下滑說明需求與價格環境尚未完全修復。'],
      capital: '資產輕模式把更多酒店建設資本交給加盟商，集團可把現金更多用於品牌、會員、技術和回購／分紅；需留意快速開店造成的品牌稀釋。',
      peers: '同行比較應同時看 RevPAR、加盟比例、房間增長和酒店管理費率；只看收入增長會高估重資產酒店的可複製性。',
      valuationText: '約 19.4× TTM PE 合理偏高，市場已部分反映資產輕化；若 RevPAR 長期弱，估值需要由新店數量以外的指標重新驗證。',
      watch: ['成熟店 RevPAR','加盟商回本期與關店率','加盟／特許收入增速','新開店與品牌結構','會員活躍與直訂比例']
    },
    sources: [['H World 年報', 'https://ir.hworld.com/financials/annual-reports'], ['H World 季報', 'https://ir.hworld.com/financials/quarterly-reports'], ['H World 投資者關係', 'https://ir.hworld.com/']]
  },
  {
    id: 'cmb', name: '招商銀行', ticker: '600036.SH / 03968.HK', date: '2026-09-04', sector: '銀行與財富管理', verdict: '高優先級研究', valuation: 'H 股約 7.3× TTM PE',
    conclusion: '低成本零售存款、財富管理 AUM、低信用成本與品牌信任形成閉環；估值便宜，但要驗證 ROE 與淨息差能否守住。',
    lead: '最重要的護城河不是單一貸款利率，而是零售客戶關係與財富管理生態。2025 年歸母淨利約 1,502 億元、ROE 13.44%；2026 H1 年化 ROE 13.42%，不良率 0.94%。',
    metrics: [['2025 歸母淨利', '約 1,502 億'], ['2025 ROE', '13.44%'], ['2026 H1 不良率', '0.94%'], ['零售 AUM', '>17 萬億']],
    trend: {title:'盈利與 ROE 穩定度', note:'ROE 為百分比；淨利為人民幣十億元。', labels:['2025','2026 H1'], a:[150.2,76.4], b:[13.44,13.42], aName:'淨利（十億）', bName:'年化 ROE'},
    bars: {title:'財富管理增長', note:'同比變化；最新披露口徑。', labels:['2025 手續費','2026 H1 相關收入'], a:[21,26.5], aName:'增長', suffix:'%'},
    sections: {
      model: '零售存款是低成本資金來源，AUM 帶來管理與交易收入，較好的客戶質量又有助於控制信用成本；這是一個比單純擴大貸款更有韌性的飛輪。',
      unit: '銀行單位經濟要看每個客戶的存款、AUM、信用卡與貸款交叉銷售，再扣除資金成本、信用成本與服務成本。財富管理收入的增長質量比單純規模更重要。',
      growth: ['AUM 與財富管理收入是主要結構性增長。','低成本存款和風控支撐盈利能力。','淨息差若持續受壓，ROE 可能需要財富管理收入來補。'],
      capital: '銀行的分紅、資本充足率與風險加權資產增長需要一起看；過高分紅可能限制增長，過低分紅則削弱股東回報。',
      peers: '比較銀行時不能只看 PE，還要看 ROE、撥備覆蓋、不良率、淨息差和存款成本。招行的溢價應由零售與財富管理質量支持。',
      valuationText: 'H 股約 7.3× TTM PE、股息率約 4.3%，估值具吸引力；但低估值也可能是在為息差壓力和銀行週期風險定價。',
      watch: ['ROE 是否守在 13% 左右','淨息差是否企穩','零售 AUM 與財富管理收入','不良率與撥備覆蓋','零售存款成本']
    },
    sources: [['招商銀行投資者關係', 'https://www.cmbchina.com/about/investor/'], ['招商銀行 2025 年報披露', 'https://s3gw.cmbimg.com/lb5001-cmbweb-prd-1255000097/cmbir/20250416/8bd63920-ac65-472e-b0ef-ddaee4ec44ab.pdf']]
  },
  {
    id: 'trip', name: '攜程集團', ticker: '9961.HK / TCOM', date: '2026-09-04', sector: '旅遊平台', verdict: '高優先級研究', valuation: '正常化約 11–13× 盈利',
    conclusion: '高毛利、低實體資本的 OTA 平台；反壟斷整改後的 take rate、流量分配與供應商黏性是核心驗證點。',
    lead: '護城河來自供應密度、交易意圖數據、品牌信任與跨品類轉化，不只是賣機票。Q1 2026 收入同比 +17%，國際平台 gross bookings 約 +65%，但 Q2 指引僅 +3% 至 +8%。',
    metrics: [['Q1 2026 收入', '+17%'], ['國際平台 GBS', '約 +65%'], ['Q2 指引', '+3% 至 +8%'], ['正常化 PE', '約 11–13×']],
    trend: {title:'增長與指引', note:'同比百分比；不是同一期間的實際收入序列。', labels:['Q1 實際','Q2 指引低端','Q2 指引高端'], a:[17,3,8], aName:'同比增長', suffix:'%'},
    bars: {title:'正常化估值區間', note:'倍數；排除一次性投資收益扭曲。', labels:['低端','高端'], a:[11,13], aName:'正常化 PE', suffix:'×'},
    sections: {
      model: '平台把酒店、交通、度假與商旅供應集中到一個高意圖入口，靠搜索、排序、會員和交易數據提高轉化。供應越密，目的地與用戶需求匹配越好。',
      unit: 'OTA 單位經濟主要是每筆訂單的 take rate、履約／客服成本、獲客成本與交叉銷售。平台的關鍵不是毛利率 headline，而是增量訂單是否仍有高貢獻。',
      growth: ['國際化是新曲線，但增長基數與監管環境不同。','酒店、機票、度假與商旅互相提高留存。','反壟斷整改可能改變平台與供應商的利益分配。'],
      capital: '低資本需求讓公司可以用現金回購、投資技術或併購；但大額投資收益會扭曲表面 PE，估值應回到經常性盈利和 FCF。',
      peers: '與全球 OTA 比較時要調整口徑：gross booking、reported revenue、take rate、正常化利潤不能混在一起。',
      valuationText: '表面 5–6× PE 受投資收益影響，正常化約 11–13× 盈利、約 13× 2025 FCF，屬高優先級但不是無腦便宜。',
      watch: ['酒店端 take rate','國際 gross bookings 與盈利轉化','供應商留存與流量分配','正常化 FCF','整改後的監管與平台規則']
    },
    sources: [['Trip.com 投資者關係', 'https://investors.trip.com/'], ['Trip.com 2025 年報／20-F', 'https://investors.trip.com/node/15481/pdf']]
  },
  {
    id: 'tsmc', name: '台積電', ticker: '2330.TW / TSM', date: '2026-09-04', sector: '半導體製造', verdict: '高優先級研究', valuation: '約 28.2× TTM PE',
    conclusion: '極好的重資產生意，規模越大單位經濟越好；目前價格不便宜，核心是未來增量 ROIC 能否覆蓋超大資本開支。',
    lead: '2015–2025 營收由約 NT$8,435 億增至 NT$3.81 兆，營業利潤率由 37.9% 升至 50.8%；2026 Q2 毛利率 67.7%、營業利潤率 60.3%，7nm 及以下占晶圓收入 77%。',
    metrics: [['2015→2025 收入', '8435 億→3.81 兆'], ['2025 營業利潤率', '50.8%'], ['2026 Q2 毛利率', '67.7%'], ['2026 CapEx 指引', 'US$600–640 億']],
    trend: {title:'規模與營業利潤率', note:'收入為新台幣十億元；利潤率為百分比。', labels:['2015','2025','2026 Q2'], a:[843.5,3810,4200], b:[37.9,50.8,60.3], aName:'收入（十億）', bName:'營業利潤率'},
    bars: {title:'先進製程收入占比', note:'百分比；2026 Q2。', labels:['7nm 及以下'], a:[77], aName:'占晶圓收入', suffix:'%'},
    sections: {
      model: '純晶圓代工模式靠製程、良率、客戶信任、IP 生態與先進封裝形成高轉換成本；規模帶來研發、設備利用率和良率學習曲線。',
      unit: '每片晶圓的價值不只由價格決定，還取決於良率、每片可產出晶粒、製程節點、折舊與客戶產品組合。AI 需求提高了先進節點的價值，但也提高了前置資本。',
      growth: ['先進節點與 AI/HPC 是主要增長來源。','高利用率和先進製程混合改善毛利。','海外廠、封裝與新節點會拉高資本需求。'],
      capital: '管理層把 CapEx 上調至 US$600–640 億，這是最大的估值變量。要看新增產能是否被長期客戶承諾與高回報產品吸收，而不是只看收入增長。',
      peers: '全球代工份額與先進節點差距顯示護城河很深，但同行比較要同時看 CapEx／收入、折舊週期、地緣風險和客戶集中。',
      valuationText: 'NT$2,410 附近、TTM PE 約 28.2×、P/FCF 約 55×，市場已給予極高的增長和資本回報預期。',
      watch: ['CapEx／收入與折舊增速','先進節點良率與利用率','7nm 及以下收入占比','海外廠建設回報','新增投資的 ROIC']
    },
    sources: [['TSMC 投資者關係', 'https://investor.tsmc.com/english'], ['TSMC 財務日程與季度結果', 'https://investor.tsmc.com/english/financial-calendar']]
  },
  {
    id: 'midea', name: '美的集團', ticker: '000333.SZ / 0300.HK', date: '2026-09-07', sector: '家電與製造', verdict: '合理價觀察', valuation: '約 15× TTM PE',
    conclusion: '像 Toyota/Walmart 式的製造業複利機器；規模採購、核心零部件、MBS 精益體系與全球製造構成護城河。',
    lead: '2025 年收入 4,585 億元、歸母淨利 439.5 億元；海外收入 1,959 億元、ToB 收入 1,228 億元，兩者已成為重要第二曲線。',
    metrics: [['2025 收入', '4,585 億'], ['2025 歸母淨利', '439.5 億'], ['海外收入', '1,959 億'], ['ToB 收入', '1,228 億']],
    trend: {title:'收入與淨利增長（指數，2013=100）', note:'研究稿整理的長期方向；收入 CAGR 約 11.7%，淨利 CAGR 約 16.1%。', labels:['2013','2020','2025'], a:[100,235,370], b:[100,300,600], aName:'收入', bName:'淨利'},
    bars: {title:'股東回報與估值', note:'百分比；近期研究口徑。', labels:['ROE','FCF yield','股息率'], a:[20,6.1,4.9], aName:'百分比', suffix:'%'},
    sections: {
      model: '多品類共用渠道、供應鏈、製造基地與服務能力，令公司可以在白電之外進入工業技術、樓宇科技、機器人與自動化。',
      unit: '核心單位經濟是採購規模、製造效率、SKU 管理、渠道週轉與售後服務共同決定的；海外 OBM 的品牌與渠道投入會暫時壓低效率，但可能提高長期價值捕獲。',
      growth: ['海外收入與全球製造提高市場空間。','ToB 業務提供不同週期與更高技術含量。','利潤增速長期跑贏收入，顯示效率與組合改善。'],
      capital: '資本開支相對可控，重點是海外併購、工業技術與渠道投入能否保持高回報；不應只用股息率判斷資本配置。',
      peers: '與海爾、格力及全球家電製造商比較時，應看海外品牌收入、ToB 佔比、庫存週轉、ROIC 和渠道現金轉化。',
      valuationText: 'A 股約 15× TTM PE、FCF yield 約 6.1%、股息率約 4.9%，接近長期中樞：好生意，但尚非明顯錯價。',
      watch: ['海外 OBM 收入與毛利','ToB 訂單與現金流','ROIC／ROE','庫存與應收週轉','回購、分紅與併購回報']
    },
    sources: [['美的投資者關係', 'https://www.midea.com.cn/en/Investors?wcmmode=disabled'], ['美的信息披露', 'https://www.midea.com.cn/en/Investors/information_disclosure']]
  },
  {
    id: 'jd', name: '京東集團', ticker: '9618.HK / NASDAQ: JD', date: '2026-09-08', sector: '電商與供應鏈', verdict: '有條件地便宜', valuation: '約 8× P/FCF',
    conclusion: '核心零售已是好生意，真正的風險是新業務繼續吞噬核心現金流，而不是零售本身失去競爭力。',
    lead: '2015–2025 年收入 CAGR 約 21.9%；2025 年 JD Retail 營業利潤 514 億元、利潤率由 4.0% 升至 4.6%，但 New Businesses 虧損擴大至 466 億元。',
    metrics: [['2015–2025 收入 CAGR', '約 21.9%'], ['2025 Retail 營業利潤', '514 億'], ['Retail margin', '4.0%→4.6%'], ['淨現金／市值', '約 61%']],
    trend: {title:'核心零售的盈利改善', note:'營業利潤率；百分比。', labels:['2024','2025','2026 Q2'], a:[4.0,4.6,4.6], aName:'Retail margin', suffix:'%'},
    bars: {title:'新業務虧損收窄', note:'人民幣十億元；負值表示虧損。', labels:['2025','2026 Q2'], a:[-46.6,-9.9], aName:'New Businesses', suffix:'十億'},
    sections: {
      model: '京東的核心護城河是自營零售、倉配網絡、履約體驗、供應鏈技術和品牌信任；這種能力可以延伸到物流、工業、醫療與企業服務。',
      unit: '零售的單位經濟要看客單價、履約成本、倉配密度、退貨率、廣告與服務收入。新業務如果沒有清楚的回本路徑，就會把核心零售的現金轉化優勢稀釋。',
      growth: ['核心零售毛利與營業利潤率改善。','物流與供應鏈服務提供外部化機會。','外賣、即時零售等新業務帶來增長，但短期虧損重。'],
      capital: '約 US$228 億淨現金提供安全邊際，也提高資本配置要求：管理層要證明補貼和新業務投資能換來可持續回報，而不是只換交易量。',
      peers: '與阿里、拼多多比較時，重點不是 GMV，而是核心零售利潤、履約資本強度、現金流和新業務損益邊界。',
      valuationText: 'ADR 約 US$27.68、市值約 US$372 億、公司口徑 TTM FCF 約 RMB314 億，約 8× P/FCF；便宜程度取決於新業務虧損是否停止擴散。',
      watch: ['Retail 營業利潤率','New Businesses 季度虧損','自由現金流與補貼強度','淨現金變化','物流／供應鏈外部客戶收入']
    },
    sources: [['JD.com 年報', 'https://ir.jd.com/annual-reports'], ['JD.com 投資者首頁', 'https://ir.jd.com/zh-hans']]
  },
  {
    id: 'sf', name: '順豐控股', ticker: '002352.SZ / 06936.HK', date: '2026-09-09', sector: '快遞與物流', verdict: '高優先級研究', valuation: 'A 股約 15.3× PE',
    conclusion: '護城河深，但資本需求高；2026 H1 顯示票均收入和利潤修復，仍要確認不是短期週期反彈。',
    lead: '2025 年營收 3,082 億元、歸母淨利 111.2 億元、自由現金流約 179 億元；2016–2025 收入 CAGR 約 20.5%，但淨利 CAGR 約 11.5%。',
    metrics: [['2025 營收', '3,082 億'], ['2025 歸母淨利', '111.2 億'], ['2025 FCF', '約 179 億'], ['2026 H1 國際及供應鏈', '+15.6%']],
    trend: {title:'規模增長與盈利修復', note:'收入／淨利指數；2016=100。', labels:['2016','2021','2025'], a:[100,260,520], b:[100,95,175], aName:'收入', bName:'淨利'},
    bars: {title:'2026 H1 價值經營訊號', note:'同比百分比；量基本持平。', labels:['票均收入','扣非淨利','國際及供應鏈收入'], a:[3.3,9.3,15.6], aName:'變化', suffix:'%'},
    sections: {
      model: '快遞網絡、航空／陸運資源、時效服務、客戶密度與品牌信任構成護城河；網絡效應很強，但每加一層服務都伴隨車隊、場地、人力和 IT 投入。',
      unit: '單票收入、件量、分揀與運輸成本、末端密度及資產利用率決定單位經濟。順豐最值得看的不是單純件量，而是能否在量基本持平時提高票均收入與現金回報。',
      growth: ['電商件量帶來規模，但價格競爭會壓低利潤。','國際與供應鏈業務提供更高價值的增量。','2021 年收入大增但盈利崩跌，是資本紀律的重要反例。'],
      capital: '物流企業必須持續投資網絡與設備，不能直接套用輕資產公司的 FCF 倍數；回報改善需要同時看資產周轉和現金轉化。',
      peers: '同行比較應分開看電商快件、時效件、供應鏈與國際業務，不同件型的客戶價值和資本需求差異很大。',
      valuationText: 'A 股約 15.3× PE、PB 約 1.46×；H 股 EV/FCF 約 13.7×，略高於自身十年中位數約 12.25×，尚非極端錯價。',
      watch: ['票均收入與件量','扣非淨利增速','國際及供應鏈收入','資本開支／FCF','ROE 是否維持修復']
    },
    sources: [['順豐 2024 年報（港交所披露）', 'https://www1.hkexnews.hk/listedco/listconews/sehk/2025/0407/2025040701400.pdf'], ['順豐投資者關係入口', 'https://www.sf-express.com/cn/sc/dynamic_function/ir']]
  },
  {
    id: 'yumc', name: '百勝中國', ticker: '9987.HK / NYSE: YUMC', date: '2026-09-10', sector: '餐飲與連鎖', verdict: '合理偏吸引', valuation: '約 14.9× TTM PE',
    conclusion: '增長引擎是交易量、新店與效率，不是單純提價；收購必勝客中國後的負債與整合是最新變量。',
    lead: '2026 Q2 系統銷售 +6%、同店銷售 +1%、同店交易量 +5%；19,297 家門店中加盟約 18%，說明真正的增長仍主要由自營網絡與效率驅動。',
    metrics: [['2026 Q2 系統銷售', '+6%'], ['同店交易量', '+5%'], ['門店數', '19,297'], ['加盟比例', '18%']],
    trend: {title:'交易量與同店銷售', note:'2026 Q2 同比百分比。', labels:['同店銷售','同店交易量','系統銷售'], a:[1,5,6], aName:'同比', suffix:'%'},
    bars: {title:'資本效率修復', note:'ROIC；百分比。', labels:['2022','2025','TTM'], a:[7.0,13.9,14.9], aName:'ROIC', suffix:'%'},
    sections: {
      model: '肯德基與必勝客的品牌、門店密度、供應鏈、會員和數字化運營形成規模護城河；自營與加盟的組合決定增長速度和資本回報。',
      unit: '餐廳單位經濟由同店交易量、客單價、租金、人力、外送抽成、原材料和店面回本期共同決定。交易量比提價更能反映品牌的真實健康度。',
      growth: ['交易量增長高於同店銷售，說明價格不是唯一驅動。','新店仍是長期增長引擎。','收購必勝客中國可減少品牌費，可能提高利潤率約 2.8 個百分點。'],
      capital: 'US$12 億收購需要重新計入負債與整合風險；若加盟化提高而不蠶食同店銷售，ROIC 仍有改善空間。',
      peers: '同行比較應看成熟店同店交易量、店面回本期、加盟比例、外送 mix 與店網密度，而非只看收入增速。',
      valuationText: '港股約 HK$331.20、TTM PE 約 14.9×、FCF yield 約 6.5%，合理偏吸引；但收購後淨負債是估值的必要調整。',
      watch: ['同店交易量與同店銷售','新店淨增與店面回本期','加盟比例與加盟商回報','ROIC 與 FCF','收購後負債與必勝客利潤率']
    },
    sources: [['Yum China 年報', 'https://ir.yumchina.com/annual-reports'], ['Yum China 2025 Form 10-K', 'https://www.sec.gov/Archives/edgar/data/1673358/000119312526082824/yumc-20251231.htm']]
  },
  {
    id: 'moutai', name: '貴州茅台', ticker: '600519.SH', date: '2026-08-14', sector: '高端白酒', verdict: '高優先級估值觀察', valuation: '約 20.3× TTM PE',
    conclusion: '品牌、稀缺性與時間形成極強護城河；增長由放量轉向定價、直銷與資本返還，20× PE 是否便宜取決於未來增速。',
    lead: '2015–2025 年營收約增長 5.17 倍、歸母淨利約增長 5.31 倍；2025 年營收首次下滑，2026 H1 營收 +1.47%、淨利 -1.95%，進入增長模式切換的壓力測試。',
    metrics: [['2015→2025 營收', '32.66→168.84B'], ['2025 歸母淨利', '82.32B'], ['酒類毛利率', '91.23%'], ['2025 股息支付率', '約 79%']],
    trend: {title:'十年收入與淨利（人民幣十億元）', note:'年報口徑；2026 H1 為半年數據，不與全年直接比較。', labels:['2015','2020','2025','2026 H1'], a:[32.66,94.92,168.84,90.70], b:[15.50,46.70,82.32,44.52], aName:'收入', bName:'淨利'},
    bars: {title:'高毛利與低資本需求', note:'百分比；2025 年或研究口徑。', labels:['酒類毛利率','ROE','CapEx／收入'], a:[91.23,32.53,1.9], aName:'百分比', suffix:'%'},
    sections: {
      model: '公司把低成本農產品、時間、稀缺產能和品牌轉化為具有奢侈品屬性的社交資產；真正護城河是品牌共識、稀缺供給、渠道和價格歷史的組合。',
      unit: '高毛利、先收款、低資本開支是極佳單位經濟；但要區分公司酒庫中具陳釀價值的基酒與渠道中賣不動的成品酒。',
      growth: ['過去靠放量與提價共同增長。','直銷／i茅台提高公司對渠道價值的捕獲。','2026 H1 成本增速高於收入，需判斷是結構變化還是短期壓力。'],
      capital: '2025 年分紅、回購合計約接近全年盈利的 86%，資本開支約為收入 1.9%；這是非常芒格式的資本回報，但金融子公司會扭曲現金流解讀。',
      peers: '同行比較顯示茅台的毛利率、ROE 與抗週期能力明顯更強，但五糧液等公司 2025 年存在核算調整，不能直接拿表面同比硬比。',
      valuationText: 'RMB1,341.99 附近、TTM PE 約 20.3×、股息率約 3.9%。若未來仍能 8–10% 增長，估值有吸引力；若增長只有 2–4%，則更接近合理價。',
      watch: ['飛天批價 vs i茅台零售價／合同價','茅台酒毛利率','直銷占比與 i茅台收入','基酒、公司存貨與渠道庫存','剔除財務公司影響後的酒業現金流']
    },
    sources: [['貴州茅台財務報告', 'https://www.moutai.com.cn/mtgf/tzzgx/cwbg/index.html'], ['貴州茅台投資者關係', 'https://www.moutai.com.cn/mtgf/tzzgx/index.html']]
  }
];

const $ = (sel, root = document) => root.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmtDate = (s) => s.replaceAll('-', '.');
const findStudy = (id) => STUDIES.find(x => x.id === id);

function chartLine(cfg) {
  const width = 600, height = 210, pad = {l:42,r:18,t:20,b:33};
  const series = [cfg.a, cfg.b].filter(Boolean);
  const max = Math.max(...series.flat()) * 1.12 || 1;
  const min = Math.min(0, ...series.flat());
  const range = max - min || 1;
  const x = i => pad.l + (i * (width-pad.l-pad.r) / Math.max(1,cfg.labels.length-1));
  const y = v => pad.t + (max-v) * (height-pad.t-pad.b) / range;
  const path = arr => arr.map((v,i) => `${i?'L':'M'} ${x(i)} ${y(v)}`).join(' ');
  const ticks = [0,.5,1].map(t => min + range*t);
  let svg = `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(cfg.title)}">`;
  ticks.forEach(v => { svg += `<line class="gridline" x1="${pad.l}" x2="${width-pad.r}" y1="${y(v)}" y2="${y(v)}"/><text class="chart-label" x="4" y="${y(v)+4}">${esc(Math.round(v*10)/10)}${cfg.suffix||''}</text>`; });
  svg += `<line class="axis" x1="${pad.l}" x2="${width-pad.r}" y1="${height-pad.b}" y2="${height-pad.b}"/>`;
  cfg.labels.forEach((lab,i) => { svg += `<text class="chart-label" text-anchor="middle" x="${x(i)}" y="${height-10}">${esc(lab)}</text>`; });
  [cfg.a,cfg.b].forEach((arr,si) => { if(!arr) return; const cls=si?'line-alt':'line-main', dot=si?'dot-alt':'dot-main'; svg += `<path class="${cls}" d="${path(arr)}"/>`; arr.forEach((v,i)=> svg += `<circle class="${dot}" cx="${x(i)}" cy="${y(v)}" r="4"><title>${esc((si?cfg.bName:cfg.aName)||'系列')} ${esc(cfg.labels[i])}: ${esc(v)}${cfg.suffix||''}</title></circle>`); });
  svg += '</svg>';
  const legend = [cfg.aName,cfg.bName].filter(Boolean).map((n,i)=>`<span class="legend"><i style="background:${i?'#c18a32':'#356f86'}"></i>${esc(n)}</span>`).join('');
  return `<div class="chart-card"><h3>${esc(cfg.title)}</h3><div class="chart-note">${esc(cfg.note||'')}</div><div class="chart-wrap">${svg}</div><div class="chart-legend">${legend}</div></div>`;
}

function chartBars(cfg) {
  const width=600,height=210,pad={l:45,r:18,t:20,b:42}; const vals=cfg.a; const max=Math.max(...vals,0)*1.18||1; const min=Math.min(...vals,0)*1.18; const range=max-min||1; const zero=pad.t+(max-0)*(height-pad.t-pad.b)/range; const slot=(width-pad.l-pad.r)/vals.length; const barW=Math.min(72,slot*.58); let svg=`<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(cfg.title)}">`; [0,.5,1].forEach(t=>{const v=min+range*t; const yy=pad.t+(max-v)*(height-pad.t-pad.b)/range; svg+=`<line class="gridline" x1="${pad.l}" x2="${width-pad.r}" y1="${yy}" y2="${yy}"/><text class="chart-label" x="4" y="${yy+4}">${esc(Math.round(v*10)/10)}${cfg.suffix||''}</text>`}); svg+=`<line class="axis" x1="${pad.l}" x2="${width-pad.r}" y1="${zero}" y2="${zero}"/>`; vals.forEach((v,i)=>{const xx=pad.l+i*slot+(slot-barW)/2;const yy=pad.t+(max-Math.max(v,0))*(height-pad.t-pad.b)/range;const y2=pad.t+(max-Math.min(v,0))*(height-pad.t-pad.b)/range; const h=Math.max(2,Math.abs(y2-yy)); const color=v<0?'#b95b51':i%2?'#c18a32':'#356f86'; svg+=`<rect x="${xx}" y="${Math.min(yy,y2)}" width="${barW}" height="${h}" rx="5" fill="${color}"><title>${esc(cfg.labels[i])}: ${esc(v)}${cfg.suffix||''}</title></rect><text class="chart-value" text-anchor="middle" x="${xx+barW/2}" y="${Math.min(yy,y2)-7}">${esc(v)}${cfg.suffix||''}</text><text class="chart-label" text-anchor="middle" x="${xx+barW/2}" y="${height-12}">${esc(cfg.labels[i])}</text>`}); svg+='</svg>'; return `<div class="chart-card"><h3>${esc(cfg.title)}</h3><div class="chart-note">${esc(cfg.note||'')}</div><div class="chart-wrap">${svg}</div><div class="chart-legend"><span class="legend"><i style="background:#356f86"></i>${esc(cfg.aName||'數值')}</span></div></div>`;
}

function renderHome() {
  const industries = [...new Set(STUDIES.map(s => s.sector))];
  $('#app').innerHTML = `<div class="shell"><section class="hero"><div><div class="eyebrow">Daily Munger Value Line</div><h1>把好公司，放回長期數字裡看。</h1><p>研究索引以中文文章為主，集中呈現商業模式、護城河、單位經濟、資本配置、同行比較、估值與下一步追蹤指標。</p></div><aside class="hero-note"><strong>閱讀原則</strong><p>先看生意，再看價格；把已實現的利潤與尚待驗證的未來故事分開。每篇文章都附公司或交易所來源鏈接。</p></aside></section><section class="toolbar" aria-label="研究篩選"><input id="search" class="input" type="search" placeholder="搜尋公司、代碼、行業或結論…" /><select id="sector"><option value="">全部行業</option>${industries.map(x=>`<option>${esc(x)}</option>`).join('')}</select></section><div class="result-line"><span id="result-count">${STUDIES.length} 篇研究</span><span>最近整理：${fmtDate(STUDIES[0].date)}</span></div><section id="cards" class="cards">${STUDIES.map(cardHTML).join('')}</section></div>`;
  const update = () => { const q=$('#search').value.trim().toLowerCase(), sec=$('#sector').value; const list=STUDIES.filter(s=>(!sec||s.sector===sec)&&(!q||[s.name,s.ticker,s.sector,s.conclusion,s.verdict].join(' ').toLowerCase().includes(q))); $('#cards').innerHTML=list.length?list.map(cardHTML).join(''):`<div class="empty">找不到相符研究。可以換一個公司名稱、代碼或行業。</div>`; $('#result-count').textContent=`${list.length} 篇研究`; }; $('#search').addEventListener('input',update); $('#sector').addEventListener('change',update);
}
function cardHTML(s){return `<article class="company-card"><div class="card-top"><div><h2>${esc(s.name)}</h2><div class="ticker">${esc(s.ticker)}</div></div><span class="tag">${esc(s.sector)}</span></div><p class="card-conclusion">${esc(s.conclusion)}</p><div class="card-meta"><span>${fmtDate(s.date)} · ${esc(s.valuation)}</span><a class="card-link" href="#/article/${s.id}">閱讀文章 →</a></div></article>`;}

function renderArticle(s){
  const m=s.metrics.map(x=>`<div class="metric"><span class="metric-label">${esc(x[0])}</span><strong>${esc(x[1])}</strong></div>`).join('');
  const sec=s.sections;
  $('#app').innerHTML=`<div class="shell"><a class="back" href="#/">← 返回研究索引</a><section class="article-header"><div class="article-title"><div class="article-badge">${esc(s.sector)} · ${fmtDate(s.date)}</div><h1>${esc(s.name)}</h1><p>${esc(s.lead)}</p></div><aside class="decision"><span class="decision-label">芒格式結論</span><strong>${esc(s.verdict)}</strong><p>${esc(s.conclusion)}</p></aside></section><section class="metrics">${m}</section><section class="section"><h2>先看數字</h2><div class="chart-grid">${chartLine(s.trend)}${chartBars(s.bars)}</div><div class="disclaimer">圖表是研究整理用的方向性視圖；不同公司與不同年度的口徑可能不同，精確數字請回到下方原始披露核對。</div></section><section class="section"><h2>商業模式與護城河</h2><p>${esc(sec.model)}</p><h3>單位經濟</h3><p>${esc(sec.unit)}</p></section><section class="section"><h2>利潤增長拆解</h2><ul>${sec.growth.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><h3>資本配置</h3><p>${esc(sec.capital)}</p></section><section class="section"><h2>同行比較與估值</h2><p>${esc(sec.peers)}</p><h3>估值判斷</h3><p>${esc(sec.valuationText)}</p></section><section class="section"><h2>接下來追蹤的 5 個指標</h2><ol>${sec.watch.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></section><section class="section"><h2>原始資料與來源鏈接</h2><p>以下鏈接是查核入口；本站主要閱讀方式是網頁文章，不依賴 PDF。</p><div class="source-list">${s.sources.map(x=>`<a class="source-link" href="${esc(x[1])}" target="_blank" rel="noopener"><strong>${esc(x[0])}</strong><span>開啟來源 ↗</span></a>`).join('')}</div></section></div>`;
}

function renderAbout(){ $('#app').innerHTML=`<div class="shell"><a class="back" href="#/">← 返回研究索引</a><section class="hero"><div><div class="eyebrow">方法與更新</div><h1>每天加一篇，索引不會失控。</h1><p>這套 Value Line 把每家公司拆成固定欄位，讓新研究可以直接加入，而不用重新翻找聊天紀錄。</p></div><aside class="hero-note"><strong>更新方式</strong><p>日後新增研究時，補一筆文章資料、圖表數列和來源鏈接；首頁會自動出現搜尋與行業篩選結果。</p></aside></section><div class="about-grid"><section class="section"><h2>每篇文章固定包含</h2><div class="step"><strong>1｜先給結論</strong><span>好生意、價格與主要風險分開寫。</span></div><div class="step"><strong>2｜看長期數據</strong><span>用趨勢圖和表格看收入、盈利、利潤率、ROE 或現金流。</span></div><div class="step"><strong>3｜拆商業模式</strong><span>把護城河、單位經濟、利潤增長與資本配置放在同一頁。</span></div><div class="step"><strong>4｜留下追蹤表</strong><span>用 3–5 個可驗證指標，區分事實、假設與未來故事。</span></div></section><section class="section"><h2>閱讀與更新邊界</h2><p>估值和市場價格會變；文章日期表示研究整理時點，不代表今日報價。每次新增內容應更新研究日期、圖表口徑和來源鏈接。</p><p>若原始披露本身是 PDF，本站仍只把它當作查核鏈接，不把不可用的 sandbox 文件當成主要入口。</p></section></div></div>`; }

function route(){ const hash=location.hash||'#/'; if(hash==='#/'||hash==='#'){renderHome();return;} if(hash==='#/about'){renderAbout();return;} const match=hash.match(/^#\/article\/([^/?]+)/); const s=match&&findStudy(match[1]); if(s) renderArticle(s); else renderHome(); window.scrollTo(0,0); }
window.addEventListener('hashchange',route); route();
