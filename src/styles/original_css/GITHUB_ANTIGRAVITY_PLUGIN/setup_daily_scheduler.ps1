# Windows Scheduled Task for 100% Zero-Touch Daily GitHub Sync & Streak Keeper
$taskName = "AntigravityGitHubDailyStreak"
$nodePath = (Get-Command node).Source
$scriptPath = "C:\Users\acer\OneDrive\Desktop\GITHUB_ANTIGRAVITY_PLUGIN\scripts\daily_streak_keeper.js"

Write-Host "Creating automated daily background task in Windows Task Scheduler..." -ForegroundColor Cyan

# Create Scheduled Task Action & Trigger (Runs every night at 10:00 PM and on user login)
$action = New-ScheduledTaskAction -Execute $nodePath -Argument $scriptPath -WorkingDirectory "C:\Users\acer\OneDrive\Desktop\OWN CLG CLONE"
$trigger1 = New-ScheduledTaskTrigger -Daily -At 10:00PM
$trigger2 = New-ScheduledTaskTrigger -AtLogOn

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger @($trigger1, $trigger2) -Description "Automated Antigravity GitHub Streak, Clean, Docs & Sync Engine" -Force

Write-Host "✅ Scheduled Task '$taskName' registered successfully! It will run automatically every day at 10:00 PM and whenever you log in." -ForegroundColor Green
