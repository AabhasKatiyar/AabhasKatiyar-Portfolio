@echo off
cd /d "%~dp0"
echo ========================================================
echo    DEPLOYING TO CLOUDFLARE PAGES (aabhaskatiyar-portfolio)
echo ========================================================
echo.
echo 1. Ensuring production build is up to date...
call npm run build
echo.
echo 2. Deploying dist folder to Cloudflare Pages project: aabhaskatiyar-portfolio...
call npx wrangler pages deploy dist --project-name=aabhaskatiyar-portfolio
echo.
echo ========================================================
echo Done! Check your live website at https://www.aabhaskatiyar.in
echo ========================================================
pause
