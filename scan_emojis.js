const XLSX = require('xlsx');

const fileName = 'LINE_Bot_內容對照表.xlsx';

try {
  const workbook = XLSX.readFile(fileName);
  const found = new Set();

  workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    const range = XLSX.utils.decode_range(sheet['!ref']);

    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
        if (cell && cell.t === 's' && cell.v) {
          // 搜尋所有括號內的英文單字 (例如: (two hearts))
          const matches = cell.v.match(/\([a-zA-Z\s]+\)/g);
          if (matches) {
            matches.forEach(m => found.add(m));
          }
        }
      }
    }
  });

  console.log('--- 偵測到的假 Emoji 清單 ---');
  found.forEach(item => console.log(item));
  console.log('---------------------------');

} catch (err) {
  console.error('掃描失敗：', err.message);
}
