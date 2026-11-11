@echo off
title FIREWALL 12-in-1 Ecosystem Launcher
echo ========================================================
echo   FIREWALL - 12-in-1 Enterprise Cybersecurity Ecosystem
echo   Your Digital World, Protected.
echo ========================================================
echo.
echo Starting Core Security API (Port 4000)...
start "Firewall API (Port 4000)" cmd /k "cd /d C:\firewall\apps\api && node dist/main"

timeout /t 3 /nobreak >nul

echo Starting Customer Web Portal (Port 3000)...
start "Firewall Web Portal (Port 3000)" cmd /k "cd /d C:\firewall\apps\web && npm run start"

echo Starting SOC Admin Console (Port 3001)...
start "Firewall Admin SOC (Port 3001)" cmd /k "cd /d C:\firewall\apps\admin && npm run start"

echo.
echo ========================================================
echo All servers launched in dedicated windows:
echo - Customer Portal:  http://localhost:3000
echo - Admin SOC:        http://localhost:3001
echo - Backend API:      http://localhost:4000
echo - Swagger Docs:     http://localhost:4000/api/docs
echo ========================================================
