// Additional source-backed review, applied before the deterministic build.
module.exports = function(cfg) {
 const tourism=['文化和旅游部2026上半年国内出游数据','https://zwgk.mct.gov.cn/zfxxgkml/tjxx/202608/t20260807_966808.html','2026-08-07发布：出游人次同比+5.4%，总花费+2.0%；总花费/人次约下降3.2%，不是同一游客的价格变化。'];
 cfg.hworld.industry=cfg.trip.industry=tourism;
 cfg.cki.industry=['Ofgem RIIO-3最终决定','https://www.ofgem.gov.uk/decision/riio-3-final-determinations-electricity-transmission-gas-distribution-and-gas-transmission-sectors','2025-12-04发布，监管期2026-04至2031-03；说明管网收益受核准资本、回报和效率要求约束，不把监管资产视作任意提价。'];
 cfg.cmb.industry=['商业银行资本管理办法（政府原文）','https://www.moj.gov.cn/pub/sfbgw/flfggz/flfggzbmgz/202409/t20240909_505612.html','2024-01-01施行的资本框架；作为普通股资本约束和风险加权口径的依据，不以工业FCF评价银行。'];
 cfg.tsmc.industry=['BIS先进计算芯片及代工尽调规则公告','https://www.bis.gov/press-release/commerce-strengthens-restrictions-advanced-computing-semiconductors-enhance-foundry-due-diligence-prevent','2025-01-15监管事件原文，证明客户/终端用途合规会影响可服务需求；不是截至研究日所有修订的完整法律清单，具体出口仍需查最新许可。'];
 cfg.sf.economic += ' 2026 H1分部附注中，供应链及国际分部净利润仅约0.30亿元，而速运及大件约55.74亿元：国际业务的收入规模不等于同等利润贡献。分部净利润含少数权益、总部与抵销另列，不能直接加总为归母。[R2]';
 cfg.sf.profitOverride.push('2026 H1营业收入1555.06亿元、营业成本1345.94亿元，毛利209.12亿元；较上年同期毛利增加约15.02亿元。管理费用增加约6.15亿元、销售费用增加1.30亿元，投资收益减少约7.00亿元；融资、研发、税项和其他项目亦有变化。这是主要驱动而非完整损益调节，不能把毛利增加直接视为归母增加。[R2]');
 cfg.sto.sources=[['R3','顺丰2026半年报（公告原文镜像）','https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12570675&stockid=002352','2026-08-28；用于同行比较，集团毛利率13.45%。']];
 cfg.sf.sources.push(['R5','圆通速递2026半年报（公告原文镜像）','https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12505977&stockid=600233','2026 H1；加盟模式及财务资料。'],['R6','京东集团2025年报：物流分部与体系关系','https://www.hkexnews.hk/listedco/listconews/sehk/2026/0416/2026041601496.pdf','这是京东集团年报，并非京东物流独立合并报表，不据此制造独立同行FCF。']);
 cfg.yumc.sources.push(['R5','瑞幸2026 Q2财务业绩｜2026-08-03','https://luckincoffee.gcs-web.com/news-releases/news-release-details/luckin-coffee-announces-second-quarter-2026-financial-results','单季人民币口径；直营与联营收入性质不同。'],['R6','麦当劳2025年报','https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/pdf/MCD%202025%20Annual%20Report.pdf','2025全年美元现金流；不与百胜半年数字直接排名。']);
 cfg.yumc.peerRows[1]=['瑞幸','2026 Q2收入158.856亿元、营业率13.4%；直营同店−5.3% [R5]','Q2 CFO26.253亿元；CapEx未在本次统一提取。联营收入包含卖材料，不是纯授权费','数字化订单及采购规模；消费者切换低；收入高增不等于成熟店改善'];
 cfg.yumc.peerRows[2]=['麦当劳','加盟授权及地产租金为重要盈利引擎 [R6]','2025全年CFO105.51亿美元、CapEx33.65亿、简单FCF71.86亿；与百胜H1不可直接比','全球品牌与选址；加盟商负担部分资本，加盟商现金健康及租约为风险'];
 cfg.midea.sources.push(['R5','格力电器2025年报（公司英文原件）','https://global.gree.com/upload/files/2026/6/Annual_Report_2025_%EF%BC%88English_Version%EF%BC%89.pdf','公司网站2026-06-30提供；产品结构、现金与会计口径。'],['R6','海尔智家2025全年业绩｜正文日期2026-03-26','https://www.haier.com/global/press-events/news/20260402_288863.shtml','公司原始业绩说明，URL归档日期4月2日；非海尔集团未上市整体。']);
 cfg.midea.peerRows.push(['同行证据补充','格力2025年报见[R5]；海尔智家2025收入3023.5亿元、归母195.5亿元 [R6]','本次未完成同行CFO/CapEx、调整ROIC的同口径提取，不给现金回报率排名','海外品牌/本地制造与出口OEM的收入、毛利和资本风险不同，不能只比较海外占比']);
};
