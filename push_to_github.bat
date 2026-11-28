@echo off
title Push Agromate to GitHub
cd /d "%~dp0"

echo =========================================================
echo   🌱 Pushing Agromate to GitHub:
echo   https://github.com/AnushkaKarle03/Agromate.git
echo =========================================================
echo.

echo [1/3] Staging all project files and committing...
git add -A
git commit -m "feat: complete Agromate agricultural labour and machinery platform"
git branch -M main

echo.
echo [2/3] Setting remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/AnushkaKarle03/Agromate.git

echo.
echo [3/3] Pushing to GitHub (main branch)...
git push -u origin main

echo.
echo =========================================================
echo   ✅ Successfully pushed to GitHub!
echo   View your repository at:
echo   https://github.com/AnushkaKarle03/Agromate
echo =========================================================
pause
