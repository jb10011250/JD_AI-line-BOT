const XLSX = require('xlsx');
const fs = require('fs');

const emojiMap = {
  '\\(two hearts\\)': '💕',
  '\\(magnifying glass\\)': '🔍',
  '\\(typing\\)': '⌨️',
  '\\(one\\)': '1️⃣',
  '\\(two\\)': '2️⃣',
  '\\(three\\)': '3️⃣',
  '\\(wow\\)': '😮',
  '\\(thumbtack\\)': '📌',
  '\\(musical note\\)': '🎵',
  '\\(eyes\\)': '👀',
  '\\(notepad\\)': '🗒️',
  '\\(floppy disk\\)': '💾',
  '\\(hourglass full\\)': '⏳',
  '\\(thumbs up\\)': '👍',
  '\\(sparkle\\)': '✨',
  '\\(sparkles\\)': '✨',
  '\\(pencil\\)': '📝',
  '\\(Cony hug\\)': '🐰',
  '\\(Brown hug\\)': '🐻',
  '\\(smiling\\)': '😊',
  '\\(sunny\\)': '☀️'
};

const fileName = 'LINE_Bot_內容對照表.xlsx';

try {
  console.log(`🚀 開始處理 ${fileName}...`);
  const workbook = XLSX.readFile(fileName);
  
  workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    const range = XLSX.utils.decode_range(sheet['!ref']);

    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        const cell = sheet[cell_ref];

        if (cell && cell.t === 's' && cell.v) {
          let newValue = cell.v;
          for (const [key, emoji] of Object.entries(emojiMap)) {
            const regex = new RegExp(key, 'gi');
            newValue = newValue.replace(regex, emoji);
          }
          cell.v = newValue;
        }
      }
    }
    console.log(`✅ 已完成分頁: ${sheetName}`);
  });

  XLSX.writeFile(workbook, fileName);
  console.log('🎉 所有假 Emoji 已成功進化為正牌 LINE 圖標！');

} catch (err) {
  console.error('❌ 轉換失敗：', err.message);
}
