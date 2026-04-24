// 六宮格與各種圖片輪播（Carousel）設定檔
// 用於產生 LINE Flex Message 格式的輪播選單

// 通用按鈕泡泡 (Bubble) 產生器
function bubbleButton(label, keyword, color) {
  return {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [{
        type: 'button',
        action: { 
          type: 'message', 
          label: label, 
          text: keyword 
        },
        style: 'primary',
        color: color
      }]
    }
  };
}

// 動態產生主選單六宮格 (Grid)
module.exports.dynamicGrid = (items, BASE_URL) => {
  const rows = [];
  for (let i = 0; i < items.length; i += 3) {
    const chunk = items.slice(i, i + 3);
    const rowContents = chunk.map(item => {
      let url = item.thumbnail || '';
      if (url && !url.startsWith('http')) {
          // 處理可能已經有 version stamp 的情況
          url = url.includes('?') ? `${BASE_URL}/public/${url}` : `${BASE_URL}/public/${url}`;
      }
      
      if (!url) {
         return {
           type: 'button',
           action: { type: 'message', label: String(item.label).substring(0, 20), text: item.keyword },
           style: 'primary',
           flex: 1
         };
      }
      return {
        type: 'image',
        url: url,
        size: 'full',
        aspectMode: 'cover',
        aspectRatio: '1:1.3', // 恢復原本適合六宮格的直條形比例
        action: { type: 'message', label: String(item.label).substring(0, 20), text: item.keyword },
        flex: 1
      };
    });

    rows.push({
      type: 'box',
      layout: 'horizontal',
      contents: rowContents
    });
  }

  return {
    type: 'flex',
    altText: '請點擊六宮格業務選項',
    contents: {
      type: 'bubble',
      size: 'giga', // 恢復六宮格的最大滿版顯示
      body: {
        type: 'box',
        layout: 'vertical',
        paddingAll: '0px',
        contents: rows
      }
    }
  };
};

// 動態產生子選單的通用 Carousel
module.exports.dynamicCarousel = (items, BASE_URL) => {
  return {
    type: 'flex',
    altText: '請選擇業務項目',
    contents: {
      type: 'carousel',
      contents: items.map(item => {
        if (item.thumbnail) {
          let url = item.thumbnail;
          if (!url.startsWith('http')) url = `${BASE_URL}/public/${url}`;
            
          return {
            type: 'bubble',
            size: 'mega', // 輪播建議使用 mega
            body: {
              type: 'box',
              layout: 'vertical',
              paddingAll: '0px',
              action: { type: 'message', label: String(item.label).substring(0,20), text: item.keyword },
              contents: [
                {
                  type: 'image',
                  url: url,
                  size: 'full',
                  aspectMode: 'cover',
                  aspectRatio: '3:2'
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#00000000',
                  paddingAll: 'sm',
                  contents: [
                    {
                      type: 'text',
                      text: item.label,
                      color: '#1A365D',
                      align: 'center',
                      size: 'xl', // 使用 xl 也很清晰且更安全
                      weight: 'bold',
                      wrap: true
                    }
                  ]
                }
              ]
            }
          };
        } else {
          return {
            type: 'bubble',
            size: 'mega',
            body: {
              type: 'box',
              layout: 'vertical',
              paddingAll: 'md',
              contents: [{
                type: 'button',
                action: { type: 'message', label: String(item.label).substring(0,20), text: item.keyword },
                style: 'primary',
                color: '#1565C0'
              }]
            }
          };
        }
      })
    }
  };
};

// 為了相容性暫時保留原本可能被呼叫的函數名稱
module.exports.mainMenu = (BASE_URL) => {
    // 如果還有地方呼叫它，直接引導到動態六宮格
    return { type: 'text', text: '系統更新中，請重新輸入關鍵字' };
};
