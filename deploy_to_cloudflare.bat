@echo off
cd /d "%~dp0"
echo ========================================================
echo    DEPLOYING TO CLOUDFLARE PAGES (aabhaskatiyar-portfolio)
echo ========================================================
echo.
echo 1. Building production bundle...
call npm run build
echo.
echo 2. Deploying dist folder to Cloudflare Pages...
call npx wrangler pages deploy dist --project-name=aabhaskatiyar-portfolio
echo.
echo ========================================================
echo Deployment complete!
echo Live at: https://aabhaskatiyar-portfolio.pages.dev
echo ========================================================
pause
