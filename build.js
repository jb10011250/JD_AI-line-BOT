const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const mammoth = require('mammoth');

async function main() {
  try {
    const workbook = XLSX.readFile('LINE_Bot_內容對照表.xlsx');
    const sheetName = workbook.SheetNames.find(n => n.includes('內容對照表')) || workbook.SheetNames[1] || workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

    let keywordMap = {};
    let menusMap = {};
    let groupMap = { 'A': [], 'B': [], 'C': [], 'D': [], 'E': [], 'F': [] };
    let mainGridItems = [];
    const versionStamp = Date.now();

    function escapeText(str) {
      if (!str) return '';
      return String(str).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
    }

    function buildImageUrlSnippet(fileName) {
      let p = String(fileName || '').trim();
      if (!p) return "''";
      if (p.startsWith('http')) return `\`${escapeText(p)}\``;
      const parts = p.split('.');
      if (parts.length > 1) {
        const ext = parts.pop();
        const name = parts.join('.');
        return `\`\${BASE_URL}/public/${encodeURI(name)}.v${versionStamp}.${ext}\``;
      }
      return `\`\${BASE_URL}/public/${encodeURI(p)}\``;
    }

    function getBustedThumbnail(fileName) {
      let p = String(fileName || '').trim();
      if (!p || p.startsWith('http')) return p;
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

      if (!code || code.includes('Rich Menu') || code.startsWith('【')) return;
      if (keyword && keyword !== '（非關鍵字觸發）') keywordMap[keyword] = code;

      if (['A0', 'B0', 'C0', 'D0', 'E0', 'F0'].includes(code)) {
        if (keyword) mainGridItems.push({ code, label, keyword, rawThumbnail });
      }

      if (keyword && code !== 'A0' && code.startsWith('A')) groupMap['A'].push({ code, label, keyword, thumbnail });
      if (keyword && code !== 'B0' && code.startsWith('B')) groupMap['B'].push({ code, label, keyword, thumbnail });
      if (keyword && code !== 'C0' && code.startsWith('C')) groupMap['C'].push({ code, label, keyword, thumbnail });
      if (keyword && code !== 'D0' && code.startsWith('D')) groupMap['D'].push({ code, label, keyword, thumbnail });
      if (keyword && code !== 'E0' && code.startsWith('E')) groupMap['E'].push({ code, label, keyword, thumbnail });
      if (keyword && code !== 'F0' && code.startsWith('F')) groupMap['F'].push({ code, label, keyword, thumbnail });

      if (['NKW', 'NKW-1', 'NKW-2', 'NKW-3', 'A0', 'B0', 'C0', 'D0', 'E0', 'F0'].includes(code)) return;

      const w1 = row['回應文字1（W1）'];
      const p1 = row['回應圖片1（P1）'];
      const w2 = row['回應文字2（W2）'];
      const p2 = row['回應圖片2（P2）'];

      let msgs = [];
      if (w1) msgs.push(`{ type: 'text', text: \`${escapeText(w1)}\` }`);
      if (w2) msgs.push(`{ type: 'text', text: \`${escapeText(w2)}\` }`);
      if (p1) msgs.push(`{ type: 'image', originalContentUrl: ${buildImageUrlSnippet(p1)}, previewImageUrl: ${buildImageUrlSnippet(p1)} }`);
      if (p2) msgs.push(`{ type: 'image', originalContentUrl: ${buildImageUrlSnippet(p2)}, previewImageUrl: ${buildImageUrlSnippet(p2)} }`);

      if (msgs.length > 0) {
        menusMap[code] = `    '${code}': [\n      ${msgs.join(',\n      ')}\n    ]`;
      }
    });

    // 寫出關鍵字對應表
    fs.writeFileSync('keywords.js', `module.exports = { keywordMap: ${JSON.stringify(keywordMap, null, 2)} };`, 'utf-8');

    // 建立輪播選單 JS
    function buildCarouselCode(items, title) {
      if (items.length === 0) return '[]';
      const columns = items.map(item => `{
        thumbnailImageUrl: ${buildImageUrlSnippet(item.thumbnail)},
        title: '${escapeText(item.label)}',
        text: '請選擇下級業務',
        actions: [{ type: 'message', label: '查看詳情', text: '${escapeText(item.keyword)}' }]
      }`);
      return `[{ type: 'template', altText: '${title}', template: { type: 'carousel', columns: [${columns.join(',')}] } }]`;
    }

    const carouselsContent = `module.exports = {
      A: ${buildCarouselCode(groupMap['A'], '測量業務選單')},
      B: ${buildCarouselCode(groupMap['B'], '登記業務選單')},
      C: ${buildCarouselCode(groupMap['C'], '地價業務選單')},
      D: ${buildCarouselCode(groupMap['D'], '資訊業務選單')},
      E: ${buildCarouselCode(groupMap['E'], '地用業務選單')},
      F: ${buildCarouselCode(groupMap['F'], '檔案業務選單')}
    };`;
    fs.writeFileSync('carousels.js', carouselsContent, 'utf-8');

    // 建立最終的 menus.js
    function buildDynamicGroupCode(prefix, title) {
      return `[
        { type: 'text', text: '📘 ${title}導覽\\n請左右滑動查看子項目，或直接輸入問題由 AI 助理為您解答！' },
        ...carousels.${prefix}
      ]`;
    }

    const menusContent = `
const carousels = require('./carousels');
const BASE_URL = process.env.BASE_URL || '';

exports.getReply = (code) => {
  const replies = {
    'NKW': [
      { type: 'text', text: '您好！歡迎使用新湖地政 AI 助理。\\n您可以點擊下方選單了解業務，或輸入「AI助理」進入智慧問答模式。' },
      { type: 'template', altText: '主選單', template: {
          type: 'image_carousel',
          columns: [${mainGridItems.map(item => `{
            imageUrl: ${buildImageUrlSnippet(item.rawThumbnail)},
            action: { type: 'message', label: '${escapeText(item.label)}', text: '${escapeText(item.keyword)}' }
          }`).join(',')}]
      }}
    ],
    'A0': ${buildDynamicGroupCode('A', '測量業務')},
    'B0': ${buildDynamicGroupCode('B', '登記業務')},
    'C0': ${buildDynamicGroupCode('C', '地價業務')},
    'D0': ${buildDynamicGroupCode('D', '資訊業務')},
    'E0': ${buildDynamicGroupCode('E', '地用業務')},
    'F0': ${buildDynamicGroupCode('F', '檔案業務')},
    ${Object.values(menusMap).join(',\n')}
  };
  return replies[code] || [{ type: 'text', text: '抱歉，找不到對應內容。' }];
};
`;
    fs.writeFileSync('menus.js', menusContent, 'utf-8');

    // --- 預編譯知識庫 (MD 優先) ---
    console.log("📚 正在預先編譯知識庫...");
    const kbMdDir = path.join(__dirname, 'knowledge_md');
    const kbDocxDir = path.join(__dirname, 'knowledge');
    let combinedText = "";
    let sourceInfo = "";

    if (fs.existsSync(kbMdDir) && fs.readdirSync(kbMdDir).some(f => f.endsWith('.md'))) {
      const mdFiles = fs.readdirSync(kbMdDir).filter(f => f.endsWith('.md')).sort();
      mdFiles.forEach(file => {
        const content = fs.readFileSync(path.join(kbMdDir, file), 'utf-8');
        combinedText += `\n=== 知識庫主題：${file.replace('.md', '')} ===\n${content}\n`;
      });
      sourceInfo = `MD 知識庫 (${mdFiles.length} 個主題檔)`;
    } else if (fs.existsSync(kbDocxDir)) {
      const docxFiles = fs.readdirSync(kbDocxDir).filter(f => f.endsWith('.docx'));
      const extractPromises = docxFiles.map(async (file) => {
        try {
          const result = await mammoth.extractRawText({ path: path.join(kbDocxDir, file) });
          return `\n--- 文件：${file} ---\n${result.value}\n`;
        } catch (e) { return ""; }
      });
      const results = await Promise.all(extractPromises);
      combinedText = results.join('');
      sourceInfo = `DOCX 備援 (${docxFiles.length} 份文件)`;
    }

    if (combinedText) {
      fs.writeFileSync('compiled_kb.txt', combinedText, 'utf-8');
      console.log(`✅ 知識庫編譯完成！來源：${sourceInfo}`);
    }

  } catch (err) {
    console.error("❌ 轉換失敗：", err);
    process.exit(1);
  }
}

main();
