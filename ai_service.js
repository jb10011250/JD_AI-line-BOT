const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');
const memory = require('./ai_memory'); // ✅ 引入記憶模組
require('dotenv').config();

// 是否開啟記憶功能 (一鍵開關)
const ENABLE_MEMORY = true;

const MODELS = [
  "gemini-3.1-flash-lite-preview",
  "gemini-2.5-flash-lite"
];

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
let cachedKnowledge = null;

async function loadKnowledgeBase() {
  if (cachedKnowledge) return cachedKnowledge;
  const compiledPath = path.join(process.cwd(), 'compiled_kb.txt');
  if (fs.existsSync(compiledPath)) {
    cachedKnowledge = fs.readFileSync(compiledPath, 'utf-8');
    return cachedKnowledge;
  }
  return "";
}

/**
 * 送出 AI 請求 (新增 userId 參數用來調閱記憶)
 */
async function getAIResponse(userMessage, userName = "民眾", userId) {
  const kbText = await loadKnowledgeBase();
  
  // ✅ 獲取歷史記憶
  let historyPrompt = "";
  let previousTurns = [];
  if (ENABLE_MEMORY && userId) {
    previousTurns = await memory.getChatHistory(userId);
    console.log(`[Diagnostic] 用戶 ${userId} 的記憶輪數: ${previousTurns.length}`);
    
    if (previousTurns.length > 0) {
      historyPrompt = "\n【前情提要：你們剛才聊過以下內容，請參考上下文但以知識庫為主】\n";
      // 因為歷史是 lpush，最前面的才是最新的，我們反轉過來讓 AI 按順序讀
      [...previousTurns].reverse().forEach(turn => {
        historyPrompt += `民眾問：${turn.user}\n助手回：${turn.ai}\n`;
      });
      historyPrompt += "------------------\n";
      console.log(`[Diagnostic] 已載入上下文：\n${historyPrompt}`);
    }
  }

  const systemPrompt = `
【角色設定】
你是一個專業、親切、活潑、有耐心的「新湖地政事務所的地政專業 AI 客服助手」。
你的核心任務是根據提供的參考文件，協助民眾解答地政、測量、登記等相關業務問題，並引導他們順利完成申辦流程。

【核心任務與作答邏輯】
1. 必須100%讀取來自提供之參考文件，但亦嚴禁一字不漏地複製貼上原文，必須將生硬的法規與公文用語，轉化為條列式、結構清晰且易於民眾理解的白話文。
1.1 禁止使用外部知識或自行推測補充。
2. 簡單問題先給結論；複雜問題請提供步驟化解說。
3. 主動引導與收斂：若民眾提問過於簡短、模糊或缺少關鍵條件，請主動提出 1~3 個關鍵問題來釐清。
${historyPrompt}
【絕對規則】
4. 日常問候：遇到「你好」、「早安」、「謝謝」等寒暄或招呼用語，請給予簡短親切的回應，並主動詢問是否有地政業務需要協助。
5. 非業務範圍：若民眾詢問無關地政的問題，請禮貌回絕。
6. 零幻覺：遇到不確定的資訊，請告知「很抱歉，在我的官方資料庫中找不到相關資訊，建議您致電本所(03-5903588)專員協助您。」
7. 結論先行：第一段直接回答核心問題。
8. 絕對禁止輸出任何思考過程或 <thought> 標籤。
9. 排版清晰：禁止使用 Markdown 符號（##, **, *）。
10. 提供下一步：在回覆結尾，提供具體的下一步建議。
11. 服務結束與重置：當民眾表達道謝或無問題時，請親切道別並提醒可輸入「退出」結束。

【地政業務官方知識庫開始】
${kbText}
【地政業務官方知識庫結束】
  `;

  for (const modelName of MODELS) {
    try {
      let modelConfig = { model: modelName };
      if (modelName.includes('gemini') && modelName.includes('preview')) {
        modelConfig.generationConfig = { thinkingConfig: { thinkingBudget: 0 } };
      }
      
      const model = genAI.getGenerativeModel(modelConfig);
      const prompt = `${systemPrompt}\n\n用戶提問：${userMessage}\n\n請直接回覆正式中文答案：`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let finalText = response.text().replace(/[\*#_~`>]/g, '');

      // ✅ 儲存這一輪到記憶中
      if (ENABLE_MEMORY && userId) {
        await memory.addChatTurn(userId, userMessage, finalText);
      }

      return finalText;
    } catch (err) {
      console.error(`AI 模型 ${modelName} 呼叫失敗:`, err.message);
      continue;
    }
  }
  return "很抱歉，AI 暫時忙線中，請稍後再試。";
}

module.exports = { getAIResponse };
