@echo off
chcp 65001 > nul
title 新湖地政 - 影像自動瘦身工具

echo ==================================================
echo         新湖地政 LINE Bot 影像瘦身工具
echo ==================================================
echo.
echo 正在掃描 public 資料夾並將巨大 PNG 轉為輕量 JPG...
echo.

"C:\Program Files\nodejs\node.exe" optimize_images.js

echo.
echo ==================================================
echo 處理完成！
echo 請記得：
echo 1. 檢查 Excel 中的圖片副檔名是否為 .jpg
echo 2. 執行「一鍵更新上傳.bat」將變更推送到 LINE
echo ==================================================
pause
