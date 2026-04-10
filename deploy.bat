@echo off
chcp 65001 >nul
echo ========================================
echo   BARBER & CO - Deploy to GitHub Pages
echo ========================================
echo.

cd /d d:\Partfolio\barber-co

echo Step 1: Set your GitHub username
echo.
set /p GITHUB_USER=Enter your GitHub username: 

if "%GITHUB_USER%"=="" (
    echo Error: username is empty
    pause
    exit /b 1
)

echo.
echo Step 2: Update package.json with your username
powershell -Command "(Get-Content package.json) -replace 'YOUR_USERNAME', '%GITHUB_USER%' | Set-Content package.json"
echo Done!

echo.
echo Step 3: Add remote origin
git remote add origin https://github.com/%GITHUB_USER%/barber-co.git 2>nul
if errorlevel 1 (
    echo Remote already exists, updating...
    git remote set-url origin https://github.com/%GITHUB_USER%/barber-co.git
)
echo Done!

echo.
echo Step 4: Rename branch to main
git branch -M main 2>nul
echo Done!

echo.
echo Step 5: Push to GitHub
echo IMPORTANT: You will be asked for GitHub credentials
echo If you have 2FA enabled, use Personal Access Token instead of password
echo.
git push -u origin main

if errorlevel 1 (
    echo.
    echo ERROR: Push failed!
    echo Make sure:
    echo   1. Repository '%GITHUB_USER%/barber-co' exists on GitHub
    echo   2. You entered correct credentials
    echo   3. If 2FA is enabled, use Personal Access Token
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   SUCCESS! 
echo ========================================
echo.
echo Your site will be available at:
echo https://%GITHUB_USER%.github.io/barber-co/
echo.
echo Go to: Settings ^> Pages ^> Source: GitHub Actions
echo.
pause
