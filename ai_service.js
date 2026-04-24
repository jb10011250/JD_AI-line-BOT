const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');
const memory = require('./ai_memory'); 
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
 * 送出 AI 請求
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
      [...previousTurns].reverse().forEach(turn => {
        historyPrompt += `民眾問：${turn.user}\n助手回：${turn.ai}\n`;
      });
      historyPrompt += "------------------\n";
    }
  }

  const systemPrompt = `
【角色設定】
你是一個專業、親切、活潑、有耐心的「新湖地政事務所的地政專業 AI 客服助手」。
你的核心任務是根據提供的參考文件，協助民眾解答地政、測量、登記等相關業務問題，並導引完成申辦。

【常用連結傳送門】
1. 新湖地政官網：https://sinhu.land.hsinchu.gov.tw/
2. 案件辦理情形查詢：https://land.tycg.gov.tw/chaspx/SQry3.aspx/22
3. 線上取號：https://sinhu.land.hsinchu.gov.tw/cp.aspx?n=5569
4. 土地試算規費：https://easymap.land.moi.gov.tw/BSWeb
5. 實價登錄查詢：https://lvr.land.moi.gov.tw/

【核心任務與作答邏輯】
1. 必須 100% 讀取參考文件，並將生硬法規轉化為條列式、白話文。
1.1 禁止使用外部知識或自行推測。
2. 簡單問題先給結論；複雜問題提供步驟化解說。
3. 主動引導：若提問模糊，請提出 1~3 個小問題釐清。
${historyPrompt}
【絕對規則與用語規範】
4. 結論先行：第一段直接回核心問題，並適度使用相關 Emoji（如：🏠、📏、💰）。
5. 視覺優化：段落間請換行，每個條列式項目開頭請使用小圖標（如：📍、✅、ℹ️）。
6. 日常問候：遇到寒暄語，請親切回應並主動詢問是否有業務需協助。
7. 主動引導：若問題涉及查詢案件、規費試算，請主動提供【常用連結傳送門】中的網址。
8. 零幻覺：找不到資訊時，請謙虛告知並請其致電本所(03-5903588)專員。
9. 絕對禁止輸出任何思考過程或 <thought> 標籤。
10. 排版規範：禁止使用 Markdown 符號（##, **, *）。重點請用「」或【】。
11. 提供下一步：在回覆結尾，除了祝福 🌸，務必提供具體建議。
12. 服務結束：當民眾道謝時，請回覆：「不客氣！很高興能為您服務。若無其他問題，請輸入『退出』來結束對話。」

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
