@echo off
title Push Agromate to GitHub
cd /d "%~dp0"

echo =========================================================
echo   🌱 Push Agromate to GitHub
echo =========================================================
echo.

echo [1/3] Staging all files and committing changes...
git add -A
git commit -m "feat: complete Agromate agricultural labour and machinery platform"
git branch -M main

echo.
echo [2/3] Connecting to your GitHub repository...
echo.
set /p REPO_URL="Paste your GitHub repository URL (e.g., https://github.com/YOUR_USERNAME/Agromate.git): "

if "%REPO_URL%"=="" (
    echo [ERROR] No URL entered. Please re-run and paste your repository URL.
    pause
    exit /b
)

git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo.
echo [3/3] Pushing code to GitHub...
git push -u origin main

echo.
echo =========================================================
echo   ✅ Successfully pushed to GitHub!
echo =========================================================
pause
