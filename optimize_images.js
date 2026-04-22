
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

console.log("🚀 [影像大瘦身系統] 啟動中...");

// 取得 public 資料夾內所有的 png 檔案
const files = fs.readdirSync(publicDir).filter(f => f.toLowerCase().endsWith('.png'));

if (files.length === 0) {
    console.log("ℹ️ 沒發現任何 .png 檔案需要處理。");
    process.exit(0);
}

console.log(`🔍 發現 ${files.length} 個檔案，即將開始進行 1024px 高畫質瘦身轉換...`);

files.forEach((fileName, index) => {
    const srcPath = path.join(publicDir, fileName);
    const stats = fs.statSync(srcPath);
    
    // 如果檔案已經很小 (小於 150KB)，就跳過以免重複處理
    if (stats.size < 150 * 1024) {
        // console.log(`⏭️ 跳過已瘦身的檔案: ${fileName}`);
        return;
    }

    const tempPng = path.join(publicDir, `temp_${index}.png`);
    const tempJpg = path.join(publicDir, `temp_${index}.jpg`);
    const finalJpg = path.join(publicDir, fileName.replace(/\.png$/i, '.jpg'));

    try {
        // 1. 複製成臨時檔繞過編碼
        fs.copyFileSync(srcPath, tempPng);
        
        // 2. 呼叫 PowerShell 進行高品質縮放 (1024px)
        const psCommand = `powershell -Command "Add-Type -AssemblyName System.Drawing; $img = [System.Drawing.Image]::FromFile('${tempPng}'); $newWidth = 1024; if($img.Width -le 1024){ $newWidth = $img.Width }; $newHeight = [int]($img.Height * ($newWidth / $img.Width)); $bmp = new-object System.Drawing.Bitmap($newWidth, $newHeight); $g = [System.Drawing.Graphics]::FromImage($bmp); $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic; $g.DrawImage($img, 0, 0, $newWidth, $newHeight); $bmp.Save('${tempJpg}', [System.Drawing.Imaging.ImageFormat]::Jpeg); $g.Dispose(); $bmp.Dispose(); $img.Dispose();"`;
        
        execSync(psCommand);

        if (fs.existsSync(tempJpg)) {
            fs.renameSync(tempJpg, finalJpg);
            const newStats = fs.statSync(finalJpg);
            console.log(`✅ [完成] ${fileName} -> ${path.basename(finalJpg)} ({0} KB)`.replace('{0}', (newStats.size / 1024).toFixed(2)));
        }

    } catch (err) {
        console.error(`❌ [錯誤] 處理 ${fileName} 時失敗:`, err.message);
    } finally {
        if (fs.existsSync(tempPng)) fs.unlinkSync(tempPng);
        if (fs.existsSync(tempJpg)) fs.unlinkSync(tempJpg);
    }
});

console.log("\n✨ 影像優化系統執行完畢！");
console.log("📢 提醒：若有新圖轉成 .jpg，請記得去 Excel 修改檔名喔！");
