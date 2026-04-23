const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// 模型設定 (依據 2026 最新測試雷達：3.1 性能最強且存活，設為第一主力)
const MODELS = [
  "gemini-3.1-flash-lite-preview", // 第一主力
  "gemini-2.5-flash-lite"          // 第二備援
];

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// 知識庫快取
let cachedKnowledge = null;

/**
 * 載入預編譯的知識庫文字檔
 */
async function loadKnowledgeBase() {
  if (cachedKnowledge) return cachedKnowledge;

  const compiledPath = path.join(process.cwd(), 'compiled_kb.txt');
  if (fs.existsSync(compiledPath)) {
    cachedKnowledge = fs.readFileSync(compiledPath, 'utf-8');
    console.log(`[AI服務] 已極速載入預編譯知識庫 (耗時 < 1ms)`);
    return cachedKnowledge;
  }

  console.warn(`⚠️ 找不到預編譯知識庫 (compiled_kb.txt)，AI 將進入無知識庫通用模式。`);
  return "";
}

/**
 * 送出 AI 請求
 */
async function getAIResponse(userMessage, userName = "民眾") {
  const kbText = await loadKnowledgeBase();
  
  const systemPrompt = `
你是「新湖地政事務所 - 地政專業 AI 客服助手」。
你的溝通對象是「${userName}」。

【核心任務】
請利用以下提供的「地政業務官方知識庫」來回答用戶的問題。

【絕對規則】
1. 你的回答內容「必須 100% 來自」提供的知識庫。
2. 如果知識庫中找不到相關資訊，你必須謙虛地回答：「很抱歉，在我的官方資料庫中找不到相關資訊，建議您致電本所專員協助您。」，不准自己編造。
3. 如果用戶的問題與「地政、不動產、房屋、法律規費」無關，請回覆：「我是地政專業客服，目前僅能回答地政相關問題喔！」
4. 專業領域僅限：地政、不動產、房屋、測量工程、土地規劃、房市新聞。
5. 語氣要求：語氣親切、專業、有耐心，多用「您」來稱呼對方。
6. 格式要求：盡量使用條列式，段落清晰，適合於 LINE 手機畫面閱讀。
7. 【輸出限制】：絕對禁止輸出任何思考過程、內心獨白或 <thought> 標籤。
8. 你的回覆第一句「必須」是類似「您好！」或「為您整理如下：」的開頭。
9. 【格式規範】：禁止使用 Markdown 符號（絕對不要出現 ##, **, *, _ 等符號）。強調重點時請使用「」或【】。

【地政業務官方知識庫開始】
${kbText}
【地政業務官方知識庫結束】
  `;

  for (const modelName of MODELS) {
    try {
      let modelConfig = { model: modelName };
      
      if (modelName.includes('gemini') && modelName.includes('preview')) {
        modelConfig.generationConfig = {
          thinkingConfig: { thinkingBudget: 0 }
        };
      }
      
      const model = genAI.getGenerativeModel(modelConfig);
      const prompt = `${systemPrompt}\n\n用戶提問：${userMessage}\n\n請直接回覆正式中文答案：`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let finalText = response.text();

      // --- 強效除草機：過濾掉所有 Markdown 符號 (星號、井字號、下底線、大於符號) ---
      finalText = finalText.replace(/[\*#_~`>]/g, '');

      return finalText;
    } catch (err) {
      console.error(`AI 模型 ${modelName} 呼叫失敗，嘗試備援...`, err.message);
      continue;
    }
  }

  return "很抱歉，AI 暫時忙線中，請稍後再試。";
}

module.exports = { getAIResponse };
