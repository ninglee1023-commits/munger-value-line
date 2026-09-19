# 完整研究原稿轉 PDF

`markdown_to_pdf.py` 僅把已核對的 UTF-8 Markdown 原稿排版成 PDF，不重新研究、補寫數據、摘要或改寫結論。`markdown_tokens.cjs` 必須與 Python 程式放在同一目錄。

## 執行

在網站目錄以 PowerShell 執行：

```powershell
& "$env:USERPROFILE\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" `
  '.\tools\pdf\markdown_to_pdf.py' `
  'C:\absolute\original-report.md' `
  'C:\absolute\report.pdf' `
  --qa-dir 'C:\absolute\report-qa'
```

圖片須以相對於原稿位置的本地路徑插入，例如 `![原圖題](charts/figure-1.png)`，並獨立成段。來源 URL 應先補成真正的 `https://` 連結，程式不會自行猜測或搜尋來源。

依賴：現有 Codex bundled Python 的 ReportLab、pypdf、PDFium，以及 bundled Node 與 marked。優先使用 PATH 上的 Poppler 渲染；沒有 Poppler 時改用 PDFium。程式不會自行安裝依賴或連線下載資源。

預設中文字體為 Windows `C:\Windows\Fonts\msjh.ttc` 和 `msjhbd.ttc`（Microsoft JhengHei 正常及粗體）；數學符號精確回退至 Arial 正常及粗體、Segoe UI Symbol。PDF 僅嵌入使用到的字形子集；本儲存庫不含字體二進制。

非預設環境可指定：`--regular-font`、`--bold-font`、`--node`、`--marked`；PDF 標題可用 `--title`。

## 發佈前檢查

程式會保留輸入 SHA-256、輸出 SHA-256，並建立 `qa.json`、`extracted.txt`、逐頁 PNG。

1. 必須取得 `automated_status: PASS`：原稿每一文字區塊均能从 PDF 抽取、字元數不少於原稿、0 缺字、0 替換字元、所有 PDF 字體嵌入並有 Unicode 映射、全部來源 URL 都存在可點擊 annotation。
2. 人工逐頁檢視 PNG；確認正常字、粗體、表格、圖表、頁腳均無亂碼、缺字、重疊或截斷。
3. 對照實際完整原稿確認全部章節、表格和圖片已保留，再發布正式 PDF。自動 PASS 不能替代目視檢查。

程式不接受已含 U+FFFD、NUL 或未解析 ChatGPT 引用 token 的原稿。**若原稿本身已是有效 Unicode 亂碼，重新嵌入字體無法還原；必須取回正確來源。**

目前支援標題、段落、巢狀清單、引用、粗體/斜體/刪除線、程式碼、GFM 表格、連結及獨立本地圖片。缺圖、不支援的 HTML、相對連結、超過 8 欄的表格會報錯，不會靜默省略；應擴充對應排版支援，不能為了轉換而刪減原稿。
