@echo off
chcp 65001 > nul
set GIT_PATH="C:\Users\JDS044\AppData\Local\GitHubDesktop\app-3.5.8\resources\app\git\cmd\git.exe"
set NODE_PATH="C:\Program Files\nodejs\node.exe"

echo 正在啟動...
%NODE_PATH% build.js
if %errorlevel% neq 0 (
    echo 轉換程式發生錯誤！
    pause
    exit /b %errorlevel%
)

echo 準備上傳...
%GIT_PATH% add -A
%GIT_PATH% commit -m "Auto Update Vercel Bot"
%GIT_PATH% push origin main

echo 更新結束！
pause
