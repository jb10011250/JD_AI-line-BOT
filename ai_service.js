const { GoogleGenerativeAI } = require("@google/generative-ai");
const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// 模型設定 (依據 2026 最新測試雷達：3.1 性能最強且存活，設為第一主力)
const MODELS = [
  "gemini-3.1-flash-lite-preview", // 第一主力：性能優異、高透明度
  "gemini-2.5-flash-lite"          // 第二備援：極速版本
];

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// 知識庫快取
let cachedKnowledge = null;

/**
 * 載入所有 DOCX 文件並合併為文字
 */
async function loadKnowledgeBase() {
  if (cachedKnowledge) return cachedKnowledge;

  // Vercel 終極加速：直接讀取在本地預先編譯打包好的純文字
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
  
  // 建立系統指令 (System Instruction / Prompt)
  const systemPrompt = `
你是「新湖地政事務所 - 地政 8888 專業 AI 客服助手」。
你的溝通對象是「${userName}」。

【核心任務】
請利用以下提供的「地政業務官方知識庫」來回答用戶的問題。

【絕對規則】
1. 你的回答內容「必須 100% 來自」提供的知識庫。
2. 如果知識庫中找不到相關資訊，你必須謙虛地回答：「很抱歉，在我的官方資料庫中找不到相關資訊，建議您致電本所專員協助您。」，不准自己編造。
3. 如果用戶的問題與「地政、不動產、房屋稅務、法律規費」無關，請回覆：「我是地政專業客服，目前僅能回答地政相關問題喔！」
4. 專業領域僅限：地政、不動產、房屋稅務、測量工程、土地規劃、房市新聞。
5. 語氣要求：語氣親切、專業、有耐心，多用「您」來稱呼對方。
6. 格式要求：盡量使用條列式，段落清晰，適合於 LINE 手機畫面閱讀。
7. 【極度重要限制】：輸出應直接進入內容主體。絕對禁止輸出任何思考過程、內心獨白或 <thought>、<rules> 標籤。請針對問題直接給出最終要傳給民眾的解答。
8. 你的回覆第一句「必須」是類似「您好！」或「為您整理如下：」的對話開頭。

【地政業務官方知識庫開始】
${kbText}
【地政業務官方知識庫結束】
  `;

  for (const modelName of MODELS) {
    try {
      let modelConfig = { model: modelName };
      
      // 只有 Gemini 實驗模型才支援 thinkingConfig，Gemma 系列會報 400 錯誤
      if (modelName.includes('gemini') && modelName.includes('preview')) {
        modelConfig.generationConfig = {
          thinkingConfig: { thinkingBudget: 0 }
        };
      }
      
      const model = genAI.getGenerativeModel(modelConfig);
      
      const prompt = `${systemPrompt}\n\n用戶提問：${userMessage}\n\n請直接回覆正式中文答案：`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (err) {
      console.error(`AI 模型 ${modelName} 呼叫失敗，嘗試備援...`, err.message);
      continue;
    }
  }

  return "很抱歉，AI 暫時忙線中，請稍後再試或是輸入其他關鍵字。";
}

module.exports = { getAIResponse };
