const express = require('express');
const line = require('@line/bot-sdk');
const path = require('path');
const { keywordMap } = require('../keywords');
const { getReply } = require('../menus');
const aiService = require('../ai_service');
const memory = require('../ai_memory'); // ✅ 引入記憶模組

const app = express();

const config = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
};

const client = new line.Client(config);
const userStates = {};

// 智慧快取清除
app.use('/public', (req, res, next) => {
  if (req.url.match(/\.v\d+\./)) {
    req.url = req.url.replace(/\.v\d+\./, '.');
  }
  next();
});

// 公開靜態圖片
app.use('/public', express.static(path.join(process.cwd(), 'public')));

// 健康檢查
app.get('/', (req, res) => {
  res.send('<h2>新湖地政 AI 助理 (記憶增強版) 運作中！</h2>');
});

// 個人化稱呼
function personalizeMessages(messages, userName) {
  return messages.map(msg => {
    if (msg.type === 'text') {
      return { 
        ...msg, 
        text: msg.text.replace(/阿吸|\{Name\}/g, userName) 
      };
    }
    return msg;
  });
}

// 主 Webhook 處理邏輯
async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const text = event.message.text.trim();
  const userId = event.source.userId;
  const replyToken = event.replyToken;
  const code = keywordMap[text];

  let userName = '親愛的民眾';
  try {
    const profile = await client.getProfile(userId);
    userName = profile.displayName;
  } catch (e) {}

  // --- AI 模式切換邏輯 ---
  const exitKeywords = ['退出', '結束', '離開', '返回', '跳出'];
  if (userStates[userId] === 'AI_MODE' && exitKeywords.some(key => text.includes(key))) {
    userStates[userId] = null;
    await memory.clearHistory(userId); // ✅ 退出時徹底清空雲端記憶
    
    let messages = [{ type: 'text', text: `好的，已幫 ${userName} 離開 AI 模式並清空對話紀錄。回到主選單囉！` }];
    messages = messages.concat(getReply('NKW'));
    return client.replyMessage(replyToken, personalizeMessages(messages, userName));
  }

  if (text.includes('AI助理') || text.includes('AI 助理') || text.includes('智能助理')) {
    userStates[userId] = 'AI_MODE';
    await memory.clearHistory(userId); // ✅ 重新進入時也先清空一次，保持新鮮度
    const welcomeMsg = [
      { type: 'text', text: `您好 ${userName}！我是「新湖地政 AI 助理」。` },
      { type: 'text', text: `我已準備好為您解答地政問題。\n\n若要結束，請輸入「退出」。` }
    ];
    return client.replyMessage(replyToken, welcomeMsg);
  }

  // --- AI 模式處理 ---
  if (userStates[userId] === 'AI_MODE') {
    try {
      // ✅ 傳入 userId 以實現多輪對話
      const aiAnswer = await aiService.getAIResponse(text, userName, userId);
      const reply = personalizeMessages([{ type: 'text', text: aiAnswer }], userName);
      return client.replyMessage(replyToken, reply);
    } catch (err) {
      console.error("AI 回報錯誤:", err.message);
      return client.replyMessage(replyToken, [{ type: 'text', text: "哎呀，AI 正在休息，請稍後再試！" }]);
    }
  }

  // --- 標準選單模式 ---
  const messages = code ? getReply(code) : getReply('NKW');
  return client.replyMessage(replyToken, personalizeMessages(messages, userName));
}

// Webhook 接收端端
app.post('/api', line.middleware(config), async (req, res) => {
  try {
    await Promise.all(req.body.events.map(handleEvent));
    res.status(200).send('OK');
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

module.exports = app;
