@echo off
setlocal
set NODE_PATH="C:\Program Files\nodejs\node.exe"

echo --------------------------------------------------
echo 📸 Starting Image Optimization...
echo --------------------------------------------------

%NODE_PATH% optimize_images.js

echo.
echo [Finish] Images in /public have been processed!
echo --------------------------------------------------
pause
