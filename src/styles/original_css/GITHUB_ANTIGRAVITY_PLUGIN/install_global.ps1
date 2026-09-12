# 1-Click Global Antigravity GitHub Plugin Installer
Write-Host ================================================== -ForegroundColor Cyan
Write-Host  Installing GitHub Plugin for Google Antigravity  -ForegroundColor Yellow
Write-Host ================================================== -ForegroundColor Cyan

$globalConfig = [System.IO.Path]::Combine($env:USERPROFILE, .gemini, config)
$globalPlugins = [System.IO.Path]::Combine($globalConfig, plugins, github)

if (!(Test-Path $globalPlugins)) {
    New-Item -ItemType Directory -Path $globalPlugins -Force | Out-Null
}

Copy-Item -Path \* -Destination $globalPlugins -Recurse -Force

Write-Host  [SUCCESS] GitHub Plugin installed to: $globalPlugins -ForegroundColor Green
Write-Host  Make sure to add your GITHUB_PERSONAL_ACCESS_TOKEN inside mcp_config.json -ForegroundColor White
Write-Host ================================================== -ForegroundColor Cyan
