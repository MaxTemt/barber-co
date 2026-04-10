@echo off
chcp 65001 >nul
echo ========================================
echo   BARBER ^& CO - Auto Deploy to GitHub Pages
echo ========================================
echo.
echo This script will:
echo   1. Create repository on GitHub (requires token)
echo   2. Push code to GitHub
echo   3. Deploy to GitHub Pages
echo.
echo Get your token: https://github.com/settings/tokens/new
echo   - Check: repo, workflow
echo.
echo ========================================
echo.

cd /d d:\Partfolio\barber-co

set /p GITHUB_USER=Enter your GitHub username: 
if "%GITHUB_USER%"=="" (
    echo Error: username is empty
    pause
    exit /b 1
)

set /p GH_TOKEN=Enter your GitHub Personal Access Token: 
if "%GH_TOKEN%"=="" (
    echo Error: token is empty
    pause
    exit /b 1
)

echo.
echo Creating repository on GitHub...
curl -s -X POST "https://api.github.com/user/repos" ^
  -H "Authorization: token %GH_TOKEN%" ^
  -H "Accept: application/vnd.github.v3+json" ^
  -d "{\"name\":\"barber-co\",\"description\":\"BARBER ^& CO - Barber Shop Website\",\"private\":false}" > %TEMP%\gh_result.txt

findstr /C:"already exists" %TEMP%\gh_result.txt >nul
if not errorlevel 1 (
    echo Repository already exists, skipping creation.
) else (
    echo Repository created!
)
del %TEMP%\gh_result.txt >nul 2>&1

echo.
echo Updating package.json...
powershell -Command "(Get-Content package.json) -replace 'YOUR_USERNAME', '%GITHUB_USER%' | Set-Content package.json"

echo.
echo Setting up git remote...
git remote remove origin 2>nul
git remote add origin https://%GITHUB_USER%:%GH_TOKEN%@github.com/%GITHUB_USER%/barber-co.git

echo.
echo Renaming branch to main...
git branch -M main 2>nul

echo.
echo Pushing to GitHub...
git push -f -u origin main

if errorlevel 1 (
    echo.
    echo ERROR: Push failed! Check your token and try again.
    pause
    exit /b 1
)

echo.
echo Push successful!
echo.

REM Remove auth from remote
git remote set-url origin https://github.com/%GITHUB_USER%/barber-co.git

echo ========================================
echo   DEPLOYED SUCCESSFULLY!
echo ========================================
echo.
echo Your site will be available at:
echo https://%GITHUB_USER%.github.io/barber-co/
echo.
echo Please enable GitHub Pages:
echo   1. Go to https://github.com/%GITHUB_USER%/barber-co
echo   2. Settings ^> Pages
echo   3. Source: Deploy from a branch
echo   4. Branch: gh-pages / root
echo   5. Save
echo.
echo Or if using GitHub Actions:
echo   1. Settings ^> Pages
echo   2. Source: GitHub Actions
echo.
pause
