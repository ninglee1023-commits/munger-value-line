# Bulk mechanical normalization of generated publication text, UTF-8 without BOM.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName Microsoft.VisualBasic
$publicationFiles = @('app.js','index.html','research-history.json') + @('tencent','hworld','cmb','trip','tsmc','midea','jd','sf','yumc','cki','moutai','sto','pdd' | ForEach-Object { "${_}.json" })
foreach ($publicationFile in $publicationFiles) {
    $publicationPath = Join-Path $PSScriptRoot $publicationFile
    $publicationText = [System.IO.File]::ReadAllText($publicationPath)
    # Limit legacy code-page conversion to Han characters; preserve math symbols,
    # currency signs, emoji, JS operators and all non-Chinese Unicode verbatim.
    $publicationText = [regex]::Replace($publicationText,'[\u3400-\u9FFF\uF900-\uFAFF]+', {
        param($hanMatch)
        [Microsoft.VisualBasic.Strings]::StrConv($hanMatch.Value,[Microsoft.VisualBasic.VbStrConv]::SimplifiedChinese,2052)
    })
    [System.IO.File]::WriteAllText($publicationPath,$publicationText,[System.Text.UTF8Encoding]::new($false))
}
