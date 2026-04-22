@echo off
setlocal
set GIT_PATH="C:\Users\JDS044\AppData\Local\GitHubDesktop\app-3.5.8\resources\app\git\cmd\git.exe"
set NODE_PATH="C:\Program Files\nodejs\node.exe"

echo Update Start...
%NODE_PATH% build.js
if %errorlevel% neq 0 (
    echo Error in build.js!
    pause
    exit /b %errorlevel%
)

echo Push to Vercel...
%GIT_PATH% add -A
%GIT_PATH% commit -m "Auto Update Vercel Bot"
%GIT_PATH% push origin main

echo Done!
pause
