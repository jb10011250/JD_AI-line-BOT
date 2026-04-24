const { createClient } = require('@vercel/kv');

/**
 * 建立 KV 用戶端
 * 這些環境變數會在 Vercel 連結 Storage 之後自動注入
 */
const kv = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

// 設定大腦儲存的最大輪數 (避免對話太長導致費用或效能問題)
const MAX_HISTORY = 6; 

/**
 * 獲取用戶的對話歷史
 */
async function getChatHistory(userId) {
  try {
    // @vercel/kv 會自動反序列化，直接回傳物件陣列
    const history = await kv.lrange(`history:${userId}`, 0, -1);
    return history;
  } catch (err) {
    console.error('[Memory] 讀取記憶失敗:', err.message);
    return [];
  }
}

/**
 * 儲存一輪對話 (使用者問、AI回)
 */
async function addChatTurn(userId, userMessage, aiResponse) {
  try {
    const key = `history:${userId}`;
    // @vercel/kv 會自動序列化，直接傳入物件即可
    const turn = { user: userMessage, ai: aiResponse };
    
    // 插入到列表開頭
    await kv.lpush(key, turn);
    
    // 限制列表長度，只保留最近的 N 輪
    await kv.ltrim(key, 0, MAX_HISTORY - 1);
    
    // 設定過期時間 (例如 4 小時無對話就自動清空，節省空間)
    await kv.expire(key, 4 * 60 * 60); 
  } catch (err) {
    console.error('[Memory] 寫入記憶失敗:', err.message);
  }
}

/**
 * 徹底清空記憶 (當用戶退出 AI 模式時呼叫)
 */
async function clearHistory(userId) {
  try {
    await kv.del(`history:${userId}`);
    console.log(`[Memory] 已清空用戶 ${userId} 的對話記憶`);
  } catch (err) {
    console.error('[Memory] 清除記憶失敗:', err.message);
  }
}

module.exports = {
  getChatHistory,
  addChatTurn,
  clearHistory
};
