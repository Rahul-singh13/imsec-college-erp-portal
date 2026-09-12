@echo off
title LinkedIn Project Agent & Auto-Publisher
echo ===================================================
echo   🚀 Launching LinkedIn Project Agent Dashboard...
echo ===================================================
start http://localhost:4173
node linkedin-agent\src\server.js
pause
