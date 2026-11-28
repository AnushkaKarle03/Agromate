@echo off
title Agromate Development Server
cd /d "%~dp0"
set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"

echo =========================================================
echo   Starting Agromate Server...
echo   Opening http://localhost:3000 in your browser...
echo =========================================================
echo.

start "" cmd /c "timeout /t 4 >nul & start http://localhost:3000"
call npm run dev
pause
