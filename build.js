const fs = require('fs');
const XLSX = require('xlsx');

try {
  const workbook = XLSX.readFile('LINE_Bot_內容對照表.xlsx');
  const sheetName = workbook.SheetNames.find(n => n.includes('內容對照表')) || workbook.SheetNames[1] || workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

  let keywordMap = {};
  let menusMap = {};
  
  let groupMap = { 'A': [], 'B': [], 'C': [], 'D': [], 'E': [], 'F': [] };
  let mainGridItems = []; // 給首頁六宮格用的
  
  // 建立這一次更新的時間戳記，用於強制 LINE 刷新圖片快取
  const versionStamp = Date.now();

  function escapeText(str) {
    if (!str) return '';
    return String(str).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  }

  function buildImageUrlSnippet(fileName) {
    let p = fileName.trim();
    if (p.startsWith('http://') || p.startsWith('https://')) {
      return `\`${escapeText(p)}\``;
    }
    
    // 取得副檔名與主檔名
    const parts = p.split('.');
    if (parts.length > 1) {
      const ext = parts.pop();
      const name = parts.join('.');
      // 產出如 logo.v171356.png 的格式，並在這邊為中文檔名進行標準網址編碼（encodeURI）
      // 因為 LINE 傳統圖片訊息非常嚴格，不允許網址中出現未編碼的中文字或空白！
      const encodedName = encodeURI(name);
      return `\`\${BASE_URL}/public/${escapeText(encodedName)}.v${versionStamp}.${ext}\``;
    }
    return `\`\${BASE_URL}/public/${escapeText(encodeURI(p))}\``;
  }

  // 處理縮圖的小助手
  function getBustedThumbnail(fileName) {
    let p = String(fileName || '').trim();
    if (!p) return '';
    if (p.startsWith('http://') || p.startsWith('https://')) return p;
    
    const parts = p.split('.');
    if (parts.length > 1) {
      const ext = parts.pop();
      const name = parts.join('.');
      return `${name}.v${versionStamp}.${ext}`;
    }
    return p;
  }

  rows.forEach(row => {
    const code = String(row['代碼'] || '').trim();
    const keyword = String(row['關鍵字（Key）'] || '').trim();
    const label = String(row['功能說明（顯示文字）'] || '').trim();
    const rawThumbnail = String(row['選單縮圖'] || '').trim();
    const thumbnail = getBustedThumbnail(rawThumbnail);
    
    const w1 = row['回應文字1（W1）'];
    const p1 = row['回應圖片1（P1）'];
    const w2 = row['回應文字2（W2）'];
    const p2 = row['回應圖片2（P2）'];

    if (!code || code.includes('Rich Menu') || code.startsWith('【')) return;

    if (keyword && keyword !== '（非關鍵字觸發）') {
      keywordMap[keyword] = code;
    }

    // 收集首頁六宮格的材料
    if (['A0', 'B0', 'C0', 'D0', 'E0', 'F0'].includes(code)) {
      if (keyword) {
        mainGridItems.push({ code, label, keyword, thumbnail });
      }
    }

    // 收集子輪播圖的材料
    if (keyword) {
      if (code !== 'A0' && code.startsWith('A')) groupMap['A'].push({ code, label, keyword, thumbnail });
      if (code !== 'B0' && code.startsWith('B')) groupMap['B'].push({ code, label, keyword, thumbnail });
      if (code !== 'C0' && code.startsWith('C')) groupMap['C'].push({ code, label, keyword, thumbnail });
      if (code !== 'D0' && code.startsWith('D')) groupMap['D'].push({ code, label, keyword, thumbnail });
      if (code !== 'E0' && code.startsWith('E')) groupMap['E'].push({ code, label, keyword, thumbnail });
      if (code !== 'F0' && code.startsWith('F')) groupMap['F'].push({ code, label, keyword, thumbnail });
    }

    if (['NKW', 'NKW-1', 'NKW-2', 'NKW-3', 'A0', 'B0', 'C0', 'D0', 'E0', 'F0'].includes(code)) return;

    let messages = [];
    if (w1) messages.push(`{ type: 'text', text: \`${escapeText(w1)}\` }`);
    if (w2) messages.push(`{ type: 'text', text: \`${escapeText(w2)}\` }`);
    if (p1) messages.push(`{ type: 'image', originalContentUrl: ${buildImageUrlSnippet(p1, true)}, previewImageUrl: ${buildImageUrlSnippet(p1, true)} }`);
    if (p2) messages.push(`{ type: 'image', originalContentUrl: ${buildImageUrlSnippet(p2, true)}, previewImageUrl: ${buildImageUrlSnippet(p2, true)} }`);

    if (messages.length > 0) {
      menusMap[code] = `    '${escapeText(code)}': [\n      ${messages.join(',\n      ')}\n    ]`;
    }
  });

  function buildDynamicGroupCode(prefix, groupName) {
    const items = groupMap[prefix];
    if (items.length === 0) return `[ { type: 'text', text: '本區為【${groupName}】 (選項尚未建置)' } ]`;
    
    let chunks = [];
    for (let i = 0; i < items.length; i += 10) {
      chunks.push(items.slice(i, i + 10));
    }
    
    let result = `[\n      { type: 'text', text: '請選擇【${groupName}】項目：' },\n`;
    chunks.forEach((chunk, idx) => {
      let chunkJson = JSON.stringify(chunk);
      result += `      carousels.dynamicCarousel(${chunkJson}, BASE_URL)${idx === chunks.length - 1 ? '' : ','}\n`;
    });
    result += `    ]`;
    return result;
  }

  const keywordsContent = `// 機器人自動轉換產生的關鍵字對照表
module.exports.keywordMap = {
${Object.entries(keywordMap).map(([k, v]) => `  '${escapeText(k)}': '${escapeText(v)}'`).join(',\n')}
};
`;
  fs.writeFileSync('keywords.js', keywordsContent, 'utf-8');

  const mainGridJson = JSON.stringify(mainGridItems);

  const menusContent = `// 機器人自動轉換產生的回應對照表
const carousels = require('./carousels');
require('dotenv').config();
const BASE_URL = process.env.BASE_URL || 'https://linebot-xhu.onrender.com';

module.exports.getReply = function(code) {
  const replies = {
    'NKW': [
      { type: 'text', text: '您好！\\n有任何地政相關的問題歡迎輸入以下數字取得更多相關資訊，或撥打本所電話03-5903588，將有人員進一步協助您！\\n【 1 】－上班時間\\n【 2 】－聯絡電話\\n【 3 】－地所住址\\n【 4 】－官方網站\\n【 5 】－粉絲專頁\\n【 6 】－其他問題\\n快邀請親朋好友一起加入官方LINE，將會不定時收到最新活動消息唷！' },
      { type: 'text', text: '新湖地政官方帳號提供線上諮詢服務\\n點選下方圖示可進行簡易的地政諮詢~\\n若您想詢問其他問題，歡迎撥打本所電話03-5903588，將由專人為您解答，謝謝您！' },
      carousels.dynamicGrid(${mainGridJson}, BASE_URL)
    ],
    // 以下為動態生成的 6 大業務入口
    'A0': ${buildDynamicGroupCode('A', '登記業務諮詢')},
    'B0': ${buildDynamicGroupCode('B', '測量業務諮詢')},
    'C0': ${buildDynamicGroupCode('C', '地價業務諮詢')},
    'D0': ${buildDynamicGroupCode('D', '資訊業務諮詢')},
    'E0': ${buildDynamicGroupCode('E', '地用業務諮詢')},
    'F0': ${buildDynamicGroupCode('F', '檔案及綜合業務')},

    // --- Excel 動態擷取的子業務資料 ---
${Object.values(menusMap).join(',\n')}
  };

  return replies[code] || [{ type: 'text', text: '很抱歉，尚未建立此關鍵字的自動回應內容。' }];
};
`;
  fs.writeFileSync('menus.js', menusContent, 'utf-8');

  console.log("✅ 三點零終極轉換成功！已經完全跟 Excel 脫鉤硬寫法，現在首頁也會跟著您的 Excel 動態變化！");

} catch (err) {
  console.error("❌ 轉換失敗：", err);
}
