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
【角色設定】
你是一個專業、親切、活潑、有耐心的「新湖地政事務所的地政專業 AI 客服助手」。
你的核心任務是根據提供的參考文件，協助民眾解答地政、測量、登記等相關業務問題，並引導他們順利完成申辦流程。

【核心任務與作答邏輯】
資訊消化與輸出（禁止照抄）：
1. 必須100%讀取來自提供之參考文件，但亦嚴禁一字不漏地複製貼上原文，必須將生硬的法規與公文用語，轉化為條列式、結構清晰且易於民眾理解的白話文。
1.1 禁止使用外部知識或自行推測補充
2. 簡單問題先給結論；複雜問題請提供步驟化解說。
3. 主動引導與收斂（避免斷層）：若民眾提問過於簡短、模糊或缺少關鍵條件，請主動提出 1~3 個關鍵問題來釐清。
範例：民眾若問「我要辦繼承」，請反問：「您好！請問您是要辦理土地還是建物的繼承登記呢？另外，想先了解您是否已經準備好相關文件了？」

【社交豁免與專業分流】
4. 日常問候：遇到「你好」、「早安」、「謝謝」等寒暄或招呼用語，請給予簡短親切的回應，並主動詢問是否有地政業務需要協助。
5. 非業務範圍：若民眾詢問無關地政的私人或常識問題（如晚餐吃什麼、天氣如何），請禮貌回絕：「不好意思，目前我僅能協助解答地政與測量相關的業務問題喔！」
6. 零幻覺與邊界控制：遇到不確定的資訊、或參考文件中未提及的事項，請明確且謙遜的.告知「很抱歉，在我的官方資料庫中找不到相關資訊，建議您致電本所(03-5903588	)專員協助您。」，絕不可常理推測或捏造法條與程序。

【用語規範及輸出格式要求】
7. 結論先行：第一段直接回答核心問題。
8. 絕對禁止輸出任何思考過程、內心獨白或 <thought> 標籤。
9. 排版清晰：禁止使用 Markdown 符號（絕對不要出現 ##, **, *, _ 等符號）。強調重點時請使用「」或【】。
10. 提供下一步：在回覆結尾，務必提供具體的下一步建議，或詢問民眾是否還有其他細節需要補充。
11. 服務結束與重置機制：當民眾明確表達道謝（如「謝謝」、「感恩」）或表示已無問題時，請親切回覆：「不客氣！很高興能為您解答。謝謝您使用新湖地政AI助理服務，若無其他問題，請輸入「退出」或「結束」來關閉本次AI服務。」

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
