// 機器人自動轉換產生的回應對照表
const carousels = require('./carousels');
require('dotenv').config();
const BASE_URL = process.env.BASE_URL || 'https://linebot-xhu.onrender.com';

module.exports.getReply = function(code) {
  const replies = {
    'NKW': [
      { type: 'text', text: '您好！\n有任何地政相關的問題歡迎輸入以下數字取得更多相關資訊，或撥打本所電話03-5903588，將有人員進一步協助您！\n【 1 】－上班時間\n【 2 】－聯絡電話\n【 3 】－地所住址\n【 4 】－官方網站\n【 5 】－粉絲專頁\n【 6 】－其他問題\n快邀請親朋好友一起加入官方LINE，將會不定時收到最新活動消息唷！' },
      { type: 'text', text: '新湖地政官方帳號提供線上諮詢服務\n點選下方圖示可進行簡易的地政諮詢~\n若您想詢問其他問題，歡迎撥打本所電話03-5903588，將由專人為您解答，謝謝您！' },
      carousels.dynamicGrid([{"code":"A0","label":"登記業務（入口）","keyword":"登記業務諮詢","thumbnail":"登記業務諮詢.v1776864365041.jpg"},{"code":"B0","label":"測量業務（入口）","keyword":"測量業務諮詢","thumbnail":"測量業務諮詢.v1776864365041.jpg"},{"code":"C0","label":"地價業務（入口）","keyword":"地價業務諮詢","thumbnail":"地價業務諮詢.v1776864365041.jpg"},{"code":"D0","label":"資訊業務（入口）","keyword":"資訊業務諮詢","thumbnail":"資訊業務諮詢.v1776864365041.jpg"},{"code":"E0","label":"地用業務（入口）","keyword":"地用業務諮詢","thumbnail":"地用業務諮詢.v1776864365041.jpg"},{"code":"F0","label":"檔案及其他（入口）","keyword":"檔案應用其他綜合業務諮詢","thumbnail":"檔案應用其他綜合業務諮詢.v1776864365041.jpg"}], BASE_URL)
    ],
    // 以下為動態生成的 6 大業務入口
    'A0': [
      { type: 'text', text: '請選擇【登記業務諮詢】項目：' },
      carousels.dynamicCarousel([{"code":"A1","label":"如何申請地籍謄本","keyword":"謄本申請","thumbnail":"登記底圖.v1776864365041.jpg"},{"code":"A2","label":"登記費、書狀費如何計算","keyword":"登記規費","thumbnail":"登記底圖.v1776864365041.jpg"},{"code":"A3","label":"如何查詢登記案件公告","keyword":"公告","thumbnail":"登記底圖.v1776864365041.jpg"},{"code":"A4","label":"如何查詢登記案件辦理情形","keyword":"登記案件辦理情形","thumbnail":"登記底圖.v1776864365041.jpg"},{"code":"A5","label":"哪些登記案件可以跨所申請","keyword":"跨所登記","thumbnail":"登記底圖.v1776864365041.jpg"},{"code":"A6","label":"地政便民工作站有哪些服務","keyword":"便民工作站","thumbnail":"登記底圖.v1776864365041.jpg"},{"code":"A7","label":"如何申請住址變更","keyword":"住址變更","thumbnail":"登記底圖.v1776864365041.jpg"},{"code":"A8","label":"如何查詢名下不動產資料","keyword":"歸戶查詢","thumbnail":"登記底圖.v1776864365041.jpg"},{"code":"A9","label":"地政相關表單下載","keyword":"書表下載","thumbnail":"登記底圖.v1776864365041.jpg"},{"code":"A10","label":"常見登記案件申辦須知","keyword":"案件辦理須知","thumbnail":"登記底圖.v1776864365041.jpg"}], BASE_URL),
      carousels.dynamicCarousel([{"code":"A11","label":"如何辦理繼承","keyword":"繼承","thumbnail":"登記底圖.v1776864365041.jpg"},{"code":"A12","label":"如何辦理地籍異動即時通","keyword":"地籍異動即時通","thumbnail":"登記底圖.v1776864365041.jpg"},{"code":"A13","label":"如何辦理住址隱匿","keyword":"住址隱匿","thumbnail":"登記底圖.v1776864365041.jpg"},{"code":"A14","label":"如何線上辦理土地登記","keyword":"數位櫃台","thumbnail":"登記底圖.v1776864365041.jpg"},{"code":"A15","label":"如何查詢合法地政士","keyword":"地政士","thumbnail":"登記底圖.v1776864365041.jpg"},{"code":"A16","label":"外籍及大陸地區人士專區","keyword":"外國人","thumbnail":"登記底圖.v1776864365041.jpg"}], BASE_URL)
    ],
    'B0': [
      { type: 'text', text: '請選擇【測量業務諮詢】項目：' },
      carousels.dynamicCarousel([{"code":"B1","label":"鑑界規費怎麼算","keyword":"鑑界規費試算","thumbnail":"測量底圖.v1776864365041.jpg"},{"code":"B2","label":"辦理土地複丈需要購買界標嗎","keyword":"界標","thumbnail":"測量底圖.v1776864365041.jpg"},{"code":"B3","label":"法院會同地點在哪／如何繳費","keyword":"法院案件查詢","thumbnail":"測量底圖.v1776864365041.jpg"},{"code":"B4","label":"如何查詢測量案件辦理情形","keyword":"測量案件辦理情形","thumbnail":"測量底圖.v1776864365041.jpg"},{"code":"B5","label":"地政士如何繪製測量成果圖","keyword":"單機版建物測量繪圖軟體","thumbnail":"測量底圖.v1776864365041.jpg"},{"code":"B6","label":"如何簡化申請建物第一次測量","keyword":"簡化建物第一次測量","thumbnail":"測量底圖.v1776864365041.jpg"},{"code":"B7","label":"何時需要檢附建物地籍測繪資料","keyword":"建物地籍測繪資料","thumbnail":"測量底圖.v1776864365041.jpg"},{"code":"B8","label":"辦理土地複丈如何收費","keyword":"測量規費","thumbnail":"測量底圖.v1776864365041.jpg"}], BASE_URL)
    ],
    'C0': [
      { type: 'text', text: '請選擇【地價業務諮詢】項目：' },
      carousels.dynamicCarousel([{"code":"C1","label":"如何查詢公告土地現值","keyword":"公告土地現值","thumbnail":"地價底圖.v1776864365041.jpg"},{"code":"C2","label":"如何試算土地增值稅","keyword":"增值稅試算","thumbnail":"地價底圖.v1776864365041.jpg"},{"code":"C3","label":"更多實價登錄相關資訊","keyword":"實價登錄","thumbnail":"地價底圖.v1776864365041.jpg"},{"code":"C4","label":"如何申報買賣實價登錄","keyword":"買賣實價登錄","thumbnail":"地價底圖.v1776864365041.jpg"},{"code":"C5","label":"如何申報租賃及預售屋實價登錄","keyword":"預售屋實價登錄","thumbnail":"地價底圖.v1776864365041.jpg"},{"code":"C6","label":"如何查詢實價登錄資訊","keyword":"實價登錄查詢網站","thumbnail":"地價底圖.v1776864365041.jpg"},{"code":"C7","label":"實價登錄的申報期限","keyword":"申報期限","thumbnail":"地價底圖.v1776864365041.jpg"},{"code":"C8","label":"哪些情形需要申報實價登錄","keyword":"實價登錄申報種類","thumbnail":"地價底圖.v1776864365041.jpg"}], BASE_URL)
    ],
    'D0': [
      { type: 'text', text: '請選擇【資訊業務諮詢】項目：' },
      carousels.dynamicCarousel([{"code":"D1","label":"地籍謄本櫃員機有哪些服務","keyword":"地籍謄本櫃員機","thumbnail":"資訊底圖.v1776864365041.jpg"},{"code":"D2","label":"如何申請土地基本資料","keyword":"土地基本資料申請","thumbnail":"資訊底圖.v1776864365041.jpg"},{"code":"D3","label":"土地基本資料如何收費","keyword":"土地基本資料收費","thumbnail":"資訊底圖.v1776864365041.jpg"}], BASE_URL)
    ],
    'E0': [
      { type: 'text', text: '請選擇【地用業務諮詢】項目：' },
      carousels.dynamicCarousel([{"code":"E1","label":"辦理更正編定須準備什麼","keyword":"更正編定","thumbnail":"地用底圖.v1776864365041.jpg"},{"code":"E2","label":"辦理變更編定須準備什麼","keyword":"變更編定","thumbnail":"地用底圖.v1776864365041.jpg"},{"code":"E3","label":"如何查詢土地參考資訊檔","keyword":"土地參考資訊檔","thumbnail":"地用底圖.v1776864365041.jpg"},{"code":"E4","label":"如何查詢國土計畫法相關資料","keyword":"國土計劃","thumbnail":"地用底圖.v1776864365041.jpg"},{"code":"E5","label":"農地違規使用有什麼罰則","keyword":"違規使用","thumbnail":"地用底圖.v1776864365041.jpg"},{"code":"E6","label":"如何查詢土地容許使用項目","keyword":"容許使用","thumbnail":"地用底圖.v1776864365041.jpg"},{"code":"E7","label":"更多土地使用相關資訊","keyword":"地用","thumbnail":"地用底圖.v1776864365041.jpg"}], BASE_URL)
    ],
    'F0': [
      { type: 'text', text: '請選擇【檔案及綜合業務】項目：' },
      carousels.dynamicCarousel([{"code":"F1","label":"申請檔案應用需要準備什麼","keyword":"檔案應用","thumbnail":"檔案應用底圖.v1776864365041.jpg"},{"code":"F2","label":"申請擔任志工需要準備什麼","keyword":"志工招募","thumbnail":"檔案應用底圖.v1776864365041.jpg"},{"code":"F3","label":"申請寒暑假青年志工需要準備什麼","keyword":"青年志工","thumbnail":"檔案應用底圖.v1776864365041.jpg"}], BASE_URL)
    ],

    // --- Excel 動態擷取的子業務資料 ---
    'RM-1': [
      { type: 'text', text: `【連結】新湖地政所官方網站` }
    ],
    'RM-2': [
      { type: 'text', text: `【連結】案件查詢系統` }
    ],
    'RM-3': [
      { type: 'text', text: `【連結】線上取號系統` }
    ],
    'RM-4': [
      { type: 'text', text: `【連結】AI助理` }
    ],
    'RM-5': [
      { type: 'text', text: `【連結】預約服務系統` }
    ],
    'RM-6': [
      { type: 'text', text: `分享此官方LINE給好友` }
    ],
    'NUM-1': [
      { type: 'text', text: `阿吸，您好！
這是我們的上班服務時間：
週一至週五
上午 08:00~12:00、下午 13:00~17:00
※午間時段提供收發案件、簡易案件與各類謄本申請服務` }
    ],
    'NUM-2': [
      { type: 'text', text: `阿吸， 您好！
這是我們的聯絡方式，有任何地政相關的問題歡迎詢問喔！
📞聯絡電話：(03) 491-7647 #153【總機專線】
💌電子郵件： use01.b@mail.tyland.gov.tw
🔍更多資訊：https://www.zhongli-land.tycg.gov.tw/cp.aspx?n=5584` }
    ],
    'NUM-3': [
      { type: 'text', text: `阿吸，您好！
這是我們的所在地理位置！
📌地址：桃園市中壢區松勇二街59號
🗺交通資訊：https://www.zhongli-land.tycg.gov.tw/cp.aspx?n=5585
🌏Google地圖：https://goo.gl/maps/ZGBdkhxqQpkYVv7v5` }
    ],
    'NUM-4': [
      { type: 'text', text: `阿吸，您好！
這是我們的官方網站！
🌏網址：https://www.zhongli-land.tycg.gov.tw/
更多更完整的地政消息盡在官方網站！` }
    ],
    'NUM-5': [
      { type: 'text', text: `阿吸，您好！
這是我們的Facebook臉書粉絲專頁！
🌏網址：https://www.facebook.com/Zhongliland/
歡迎您加入按讚追蹤！以即時得知最新的活動資訊喔！` }
    ],
    'NUM-6': [
      { type: 'text', text: `阿吸，您好！
如您想詢問地政相關問題，歡迎至我們的Facebook臉書粉絲專頁留言，或撥打本所電話03-4917647，將由專人為您解答，謝謝您！(two hearts)
🌏臉書：https://www.facebook.com/Zhongliland/` }
    ],
    'A1': [
      { type: 'text', text: `阿吸，您好！
■　土地登記簿謄本分類、申請人資格及申請方式資訊如下：
https://land.tycg.gov.tw/News_Content.aspx?n=4104&s=1467853

■　申請地籍資料謄本費用查詢連結點如下：
https://land.tycg.gov.tw/News_Content.aspx?n=4104&s=1467909

■　網路申請電子謄本連結點如下：
https://land.tycg.gov.tw/News_Content.aspx?n=4103&s=553588

如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/%E8%AC%84%E6%9C%AC%E7%94%B3%E8%AB%8B.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/%E8%AC%84%E6%9C%AC%E7%94%B3%E8%AB%8B.v1776864365041.jpg` }
    ],
    'A2': [
      { type: 'text', text: `阿吸，您好！
■　地政規費之收費標準連結點如下：
https://land.tycg.gov.tw/cp.aspx?n=4117

■　線上試算連結點：
https://www.land.tycg.gov.tw/chaspx/Smenulist.aspx/7

如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` }
    ],
    'A3': [
      { type: 'text', text: `阿吸，您好！
■　公告案件查詢連結點如下：
https://www.land.tycg.gov.tw/chaspx/SQry6.aspx/10

如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` }
    ],
    'A4': [
      { type: 'text', text: `阿吸，您好！
■　案件辦理情形查詢連結點如下：
https://www.land.tycg.gov.tw/chaspx/SQry3.aspx/22

如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` }
    ],
    'A5': [
      { type: 'text', text: `阿吸，您好！
■　跨所受理登記服務項目資訊如下：
https://land.tycg.gov.tw/News_Content.aspx?n=4104&s=1467876

如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/%E8%B7%A8%E6%89%80%E7%99%BB%E8%A8%98.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/%E8%B7%A8%E6%89%80%E7%99%BB%E8%A8%98.v1776864365041.jpg` }
    ],
    'A6': [
      { type: 'text', text: `阿吸，您好！
■　本所地政便民工作站服務項目資訊如下：
https://www.zhongli-land.tycg.gov.tw/cp.aspx?n=5512

■六和地政便民工作站
https://maps.app.goo.gl/VfHx9U6nhJbjJ6Hy8
■觀音地政便民工作站
https://maps.app.goo.gl/tuD5dYCFPbrEjs9c9
■自強地政便民工作站
https://maps.app.goo.gl/7bSR8AmJqfMRpubF6


如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/%E4%BE%BF%E6%B0%91%E5%B7%A5%E4%BD%9C%E7%AB%99.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/%E4%BE%BF%E6%B0%91%E5%B7%A5%E4%BD%9C%E7%AB%99.v1776864365041.jpg` }
    ],
    'A7': [
      { type: 'text', text: `阿吸，您好！
■　住址變更方式資訊如下:
https://land.tycg.gov.tw/News_Content.aspx?n=3946&s=688343

如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` }
    ],
    'A8': [
      { type: 'text', text: `阿吸，您好！
如您想得知名下的不動產有多少，可以到各地政事務所申請地籍總歸戶，或到國稅局或稅捐機關申請全國財產總歸戶資料！

如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` }
    ],
    'A9': [
      { type: 'text', text: `阿吸感謝您使用本所「LINE+ibon卡厲害」多元化領取地政表單服務(two hearts)
輸入下列數字~獲得更多表單資訊：
【901】登記申請書
【902】登記清冊
【903】買賣登記
【904】贈與登記
【905】一般繼承登記
【906】分割繼承登記
【907】預告登記
【908】書狀補給登記
【909】抵押權設定
【910】地籍異動即時通
【911】住址隱匿
【912】檔案應用
【913】更正編定
【914】土地基本資料庫電子資料流通

(magnifying glass)如查詢不到您想要的資料，可撥打本所電話 03-4917647，將有人員進一步協助您~` }
    ],
    'A10': [
      { type: 'text', text: `阿吸，您好！
■　常見登記案件申辦須知連結點如下：
https://land.tycg.gov.tw/News.aspx?n=3946&sms=10047
如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` }
    ],
    'A11': [
      { type: 'text', text: `阿吸，您好！
■　繼承登記申辦須知及申請書範例連結點如下：
https://land.tycg.gov.tw/News_Content.aspx?n=3946&s=688348` },
      { type: 'text', text: `阿吸您好~ 本所LINE+ibon卡厲害~ 為您搜尋到的文件如下：  
【一般繼承登記-空白表單】
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUSBLM9IVLPG
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/7C52A6CD72D445FC8C3B5006721D00F06

【一般繼承登記-範例】
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/A24DBF7C50704DE393B54529609185D26

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR%E4%B8%80%E8%88%AC%E7%B9%BC%E6%89%BF%E7%A9%BA%E7%99%BD%E8%A1%A8%E5%96%AE%E7%94%B3%E8%AB%8B%E6%9B%B8,%E7%99%BB%E8%A8%98%E6%B8%85%E5%86%8A,%E7%B9%BC%E6%89%BF%E7%B3%BB%E7%B5%B1%E8%A1%A8,%E6%AC%8A%E7%8B%80%E5%88%87%E7%B5%90%E6%9B%B8.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/QR%E4%B8%80%E8%88%AC%E7%B9%BC%E6%89%BF%E7%A9%BA%E7%99%BD%E8%A1%A8%E5%96%AE%E7%94%B3%E8%AB%8B%E6%9B%B8,%E7%99%BB%E8%A8%98%E6%B8%85%E5%86%8A,%E7%B9%BC%E6%89%BF%E7%B3%BB%E7%B5%B1%E8%A1%A8,%E6%AC%8A%E7%8B%80%E5%88%87%E7%B5%90%E6%9B%B8.v1776864365041.jpg` }
    ],
    'A12': [
      { type: 'text', text: `阿吸您好~ 
「地籍異動即時通」登記名義人申請後，只要名下已登記的不動產被移轉、設定抵押或書狀補給時，於辦理「收件」、「異動完成」時，系統分別自動通知義務人或權利人，民眾就能即時掌握不動產權利異動的資訊。
詳情請點選以下連結：
https://land.tycg.gov.tw/cp.aspx?n=3975

 【地籍異動即時通申請書】
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUSK7IBHM59G
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/3F903D2B4724453CAA11CC0613E3983D6
■ 地籍異動即時通申請須知:
https://land.tycg.gov.tw/cp.aspx?n=3975
如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR%E5%9C%B0%E7%B1%8D%E7%95%B0%E5%8B%95%E5%8D%B3%E6%99%82%E9%80%9A%E7%94%B3%E8%AB%8B%E6%9B%B8.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/QR%E5%9C%B0%E7%B1%8D%E7%95%B0%E5%8B%95%E5%8D%B3%E6%99%82%E9%80%9A%E7%94%B3%E8%AB%8B%E6%9B%B8.v1776864365041.jpg` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/%E5%9C%B0%E7%B1%8D%E7%95%B0%E5%8B%95%E5%8D%B3%E6%99%82%E9%80%9A%E6%96%87%E5%AE%A3.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/%E5%9C%B0%E7%B1%8D%E7%95%B0%E5%8B%95%E5%8D%B3%E6%99%82%E9%80%9A%E6%96%87%E5%AE%A3.v1776864365041.jpg` }
    ],
    'A13': [
      { type: 'text', text: `阿吸您好~
登記名義人申請「住址隱匿」後，任何人申請第二類謄本時，將隱匿登記名義人的部分住址，僅顯示至段(路、街、道)，或前6個中文字，其後資料均隱匿(例如:桃園市桃園區三民路一段***)。
詳情請點選以下連結：
https://land.tycg.gov.tw/cp.aspx?n=4010

 【住址隱匿申請書】
■ 列印代碼如下：
（提醒您，在ibon機台輸入此列印代碼或掃描下方圖片QRcode，就可進行列印~）
       ASUS7SG4UIKXG
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/74FDF4AB29D64E07B8BBE42A3F4E75B26

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR%E4%BD%8F%E5%9D%80%E9%9A%B1%E5%8C%BF%E5%8D%B3%E6%99%82%E9%80%9A%E7%94%B3%E8%AB%8B%E6%9B%B8.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/QR%E4%BD%8F%E5%9D%80%E9%9A%B1%E5%8C%BF%E5%8D%B3%E6%99%82%E9%80%9A%E7%94%B3%E8%AB%8B%E6%9B%B8.v1776864365041.jpg` }
    ],
    'A14': [
      { type: 'text', text: `阿吸，您好！
數位櫃臺提供「網路申辦案件」、「線上支付規費」、「線上聲明登錄」、「地籍異動即時通」、「申請(解除)住址隱匿」、「MyData 查驗」、「地政案件辦理情形查詢」、「人工登記簿謄本(第二類)」與「臨櫃申請書產製」、「指定送達處所」、「地政繳費資料(非網路申請)」與「地籍圖重測異議複丈」等服務。

(open book)數位櫃臺連結點如下：
https://dcland.moi.gov.tw/

如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/%E6%95%B8%E4%BD%8D%E6%AB%83%E5%8F%B0%E7%99%BB%E8%A8%98%E7%94%B3%E8%AB%8B%E7%B7%9A%E4%B8%8A%E8%BE%A6jpg`, previewImageUrl: `${BASE_URL}/public/%E6%95%B8%E4%BD%8D%E6%AB%83%E5%8F%B0%E7%99%BB%E8%A8%98%E7%94%B3%E8%AB%8B%E7%B7%9A%E4%B8%8A%E8%BE%A6jpg` }
    ],
    'A15': [
      { type: 'text', text: `阿吸，您好！
■　合法地政士連結點如下：
https://resim.moi.gov.tw/Home/AgentIndex

貼心提醒:委託合法地政士，確保不動產交易安全，保障民眾自身之財產權益！

如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/%E5%9C%B0%E6%94%BF%E5%A3%AB.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/%E5%9C%B0%E6%94%BF%E5%A3%AB.v1776864365041.jpg` }
    ],
    'A16': [
      { type: 'text', text: `阿吸，您好！
■　外籍及大陸地區人士專區
連結點如下：
https://land.tycg.gov.tw/cp.aspx?n=3957
如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` }
    ],
    'REG-901': [
      { type: 'text', text: `阿吸您好~ 本所LINE+ibon卡厲害~ 為您搜尋到的文件如下： 
【登記申請書-空白表單】 
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUSQGFSJSHJ7

■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/E0E1AB97CBDF40E2BEA6ABFA434CA8236

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` }
    ],
    'REG-902': [
      { type: 'text', text: `阿吸您好~本所LINE+ibon卡厲害~ 為您搜尋到的文件如下：
 【登記清冊-空白表單】 
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUSSYJLIJGBK

■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/81AF52F1CF3846928F7C22394AF0F97E6

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` }
    ],
    'REG-903': [
      { type: 'text', text: `阿吸您好~ 本所LINE+ibon卡厲害~ 為您搜尋到的文件如下： 
【買賣登記-空白表單】
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUS9BSK4NJ5Q
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/BA22824CD31649FDB083A30422ADB2266

【買賣登記-範例】
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/F4EDDC949BDE4B5991F09350DEC5EAC86

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` }
    ],
    'REG-904': [
      { type: 'text', text: `阿吸您好~本所LINE+ibon卡厲害~ 為您搜尋到的文件如下： 
【贈與登記-空白表單】
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUSLKF4HBBNK
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/399A3ABC948F4936939C18E8A74B3B7C6

【贈與登記-範例】
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/153441EDDC4D4C06BA873D0F6521F0016

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` }
    ],
    'REG-905': [
      { type: 'text', text: `阿吸，您好！
■　繼承登記申辦須知及申請書範例連結點如下：
https://land.tycg.gov.tw/News_Content.aspx?n=3946&s=688348` },
      { type: 'text', text: `阿吸您好~ 本所LINE+ibon卡厲害~ 為您搜尋到的文件如下：  
【一般繼承登記-空白表單】
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUSBLM9IVLPG
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/7C52A6CD72D445FC8C3B5006721D00F06

【一般繼承登記-範例】
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/A24DBF7C50704DE393B54529609185D26

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` }
    ],
    'REG-906': [
      { type: 'text', text: `阿吸您好~ 本所LINE+ibon卡厲害~ 為您搜尋到的文件如下： 
【分割繼承登記-空白表單】
■  列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUS9MNWKKLWI
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/F98149AA36DF45B99965E4E9087913AF6

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` }
    ],
    'REG-907': [
      { type: 'text', text: `阿吸您好~ 本所LINE+ibon卡厲害~ 為您搜尋到的文件如下： 
【預告登記-空白表單】
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUSKYNLBVIBH
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/83B9F416895342878ABC598FE1F1B6326

【預告登記-範例】
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/B03E669A79564F698F5975CD1B8202416

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` }
    ],
    'REG-908': [
      { type: 'text', text: `阿吸您好~ 本所LINE+ibon卡厲害~ 為您搜尋到的文件如下： 
【書狀補給登記-空白表單】
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印或掃描下方圖片QRcode，代碼即可列印文件）
        ASUS6NHH7YJWG
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/2EC428B5B0F54E9A93B169DC6BC923556

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` }
    ],
    'REG-909': [
      { type: 'text', text: `阿吸您好~ 本所LINE+ibon卡厲害~ 為您搜尋到的文件如下：  
【抵押權設定-空白表單】
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUS5BNUNWFSL
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/241F160EA30C4EABAFAF7E497A46E9206

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` }
    ],
    'REG-910': [
      { type: 'text', text: `阿吸您好~ 
「地籍異動即時通」登記名義人申請後，只要名下已登記的不動產被移轉、設定抵押或書狀補給時，於辦理「收件」、「異動完成」時，系統分別自動通知義務人或權利人，民眾就能即時掌握不動產權利異動的資訊。
詳情請點選以下連結：
https://land.tycg.gov.tw/cp.aspx?n=3975

 【地籍異動即時通申請書】
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUSK7IBHM59G
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/3F903D2B4724453CAA11CC0613E3983D6
■ 地籍異動即時通申請須知:
https://land.tycg.gov.tw/cp.aspx?n=3975
如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR%E5%9C%B0%E7%B1%8D%E7%95%B0%E5%8B%95%E5%8D%B3%E6%99%82%E9%80%9A%E7%94%B3%E8%AB%8B%E6%9B%B8.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/QR%E5%9C%B0%E7%B1%8D%E7%95%B0%E5%8B%95%E5%8D%B3%E6%99%82%E9%80%9A%E7%94%B3%E8%AB%8B%E6%9B%B8.v1776864365041.jpg` }
    ],
    'REG-911': [
      { type: 'text', text: `阿吸您好~
登記名義人申請「住址隱匿」後，任何人申請第二類謄本時，將隱匿登記名義人的部分住址，僅顯示至段(路、街、道)，或前6個中文字，其後資料均隱匿(例如:桃園市桃園區三民路一段***)。
詳情請點選以下連結：
https://land.tycg.gov.tw/cp.aspx?n=4010

 【住址隱匿申請書】
■ 列印代碼如下：
（提醒您，在ibon機台輸入此列印代碼或掃描下方圖片QRcode，就可進行列印~）
       ASUS7SG4UIKXG
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/74FDF4AB29D64E07B8BBE42A3F4E75B26

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR%E4%BD%8F%E5%9D%80%E9%9A%B1%E5%8C%BF%E5%8D%B3%E6%99%82%E9%80%9A%E7%94%B3%E8%AB%8B%E6%9B%B8.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/QR%E4%BD%8F%E5%9D%80%E9%9A%B1%E5%8C%BF%E5%8D%B3%E6%99%82%E9%80%9A%E7%94%B3%E8%AB%8B%E6%9B%B8.v1776864365041.jpg` }
    ],
    'REG-912': [
      { type: 'text', text: `阿吸，您好！
有關檔案應用申請相關說明，可參閱本所官網檔案應用專區Q&A資訊，連結如下：
https://www.zhongli-land.tycg.gov.tw/archive_QA.htm` },
      { type: 'text', text: `本所LINE+ibon卡厲害~ 為您搜尋到的文件如下： 
【檔案應用申請書】
■　列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
      ASUSXSVFN5A4N
■　電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/9578C16467DC4329B9BF12B95B74768F6
■　列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
      ASUS6X67GPX7F
■　電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/981FD14C2794402F904EA435F6D007DC6

如查詢不到您想要的資料，可洽本所 03-4917647 分機413燕先生協助您~` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR%E6%AA%94%E6%A1%88%E6%87%89%E7%94%A8%E7%94%B3%E8%AB%8B%E6%9B%B8.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/QR%E6%AA%94%E6%A1%88%E6%87%89%E7%94%A8%E7%94%B3%E8%AB%8B%E6%9B%B8.v1776864365041.jpg` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR%E6%AA%94%E6%A1%88%E6%87%89%E7%94%A8%E4%BB%A3%E7%90%86%E4%BA%BA%E5%A7%94%E4%BB%BB%E6%9B%B8`, previewImageUrl: `${BASE_URL}/public/QR%E6%AA%94%E6%A1%88%E6%87%89%E7%94%A8%E4%BB%A3%E7%90%86%E4%BA%BA%E5%A7%94%E4%BB%BB%E6%9B%B8` }
    ],
    'REG-913': [
      { type: 'text', text: `阿吸，您好！
辦理更正編定，可向土地所在地政事務所申請，除門牌編釘證明(佐證資料)及航照圖(佐證資料)外，請檢具檢具以下其一文件：
曾於該建物設籍之戶籍謄本、繳納房屋稅籍證明、用電證明或繳納自來水費用證明、建物完工證明書或其他證明文件。` },
      { type: 'text', text: `本所LINE+ibon卡厲害服務~ 為您搜尋到的文件如下： 
【更正編定申請書】
■ 　列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUSJ5VXFSVGH
■ 　電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/94EEE13CF36646168905E84DC1E90F1B6

【更正編定申請書填寫範例】
■ 　電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/C0E5EAEA43574243AFAA2994D367E0656

如您尚有其他問題，可撥打本所電話03-4917647分機414或419，將有專人進一步協助您，謝謝您！` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR%E6%9B%B4%E6%AD%A3%E7%B7%A8%E5%AE%9A%E7%94%B3%E8%AB%8B%E6%9B%B8.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/QR%E6%9B%B4%E6%AD%A3%E7%B7%A8%E5%AE%9A%E7%94%B3%E8%AB%8B%E6%9B%B8.v1776864365041.jpg` }
    ],
    'REG-914': [
      { type: 'text', text: `阿吸您好~ 本所LINE+ibon卡厲害~ 為您搜尋到的文件如下： 
【土地基本資料電子資料流通申請書】 
■ 　列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
       ASUSUH4IYSKAV
■ 　電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/B246250DBB9F4FC7BDBBEDB79C3381196

如查詢不到您想要的資料，可洽本所 03-4917647 分機503呂先生協助您~` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR%E5%9C%9F%E5%9C%B0%E5%9F%BA%E6%9C%AC%E8%B3%87%E6%96%99%E5%BA%AB%E9%9B%BB%E5%AD%90%E8%B3%87%E6%96%99%E7%94%B3%E8%AB%8B%E8%A1%A8.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/QR%E5%9C%9F%E5%9C%B0%E5%9F%BA%E6%9C%AC%E8%B3%87%E6%96%99%E5%BA%AB%E9%9B%BB%E5%AD%90%E8%B3%87%E6%96%99%E7%94%B3%E8%AB%8B%E8%A1%A8.v1776864365041.jpg` }
    ],
    'B1': [
      { type: 'text', text: `阿吸，您好！

■有關鑑界規費試算，您可於「土地複丈規費(鑑界、分割)服務網」查詢鑑界應繳規費(magnifying glass)：https://easymap.land.moi.gov.tw/BSWeb
相關操作方式可至本所官網查詢(typing)：
https://www.zhongli-land.tycg.gov.tw/News_Content.aspx?n=14066&s=1090601
或循下列操作步驟辦理：
(one)輸入土地基本資訊（縣市、行政區、地段及地號）。
(two)選擇欲鑑定之界址點，並按下「重新計算」顯示規費最新計算過程及試算結果。
(three)視需要可下載列印PDF檔，並附於申請書內，以利計收規費，減少規費退補費程序。

(Cony hug)有關其他測量規費計費方法請輸入關鍵字「測量費」以獲取更多資訊!!` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/%E8%A4%87%E4%B8%88%E8%A9%A6%E7%AE%97%E7%B6%B2%E7%AB%99%E4%BB%8B%E7%B4%B9.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/%E8%A4%87%E4%B8%88%E8%A9%A6%E7%AE%97%E7%B6%B2%E7%AB%99%E4%BB%8B%E7%B4%B9.v1776864365041.jpg` }
    ],
    'B2': [
      { type: 'text', text: `阿吸，您好！
112年 5月 1日以後申辦土地複丈案件，將由地政事務所提供制式界標予申請人使用，申請人「不用」再自行準備制式界標；但應注意地政事務所僅提供界標予申請人使用，還是要由申請人自行埋設並妥為維護管理，因此現場記得幫我們準備鐵鎚或方便埋設界標的工具，以利複丈作業進行。` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/%E5%85%8D%E8%87%AA%E5%82%99%E5%88%B6%E5%BC%8F%E7%95%8C%E6%A8%99%E6%96%87%E5%AE%A3.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/%E5%85%8D%E8%87%AA%E5%82%99%E5%88%B6%E5%BC%8F%E7%95%8C%E6%A8%99%E6%96%87%E5%AE%A3.v1776864365041.jpg` }
    ],
    'B3': [
      { type: 'text', text: `阿吸，您好！

(wow)有關本所辦理法院囑託案件會合地點及應（預）繳規費，可直接點選以下網址後，選擇「地政事務所」及「囑託文號」查詢(magnifying glass)：
https://www.land.tycg.gov.tw/CourtCase/default.aspx` },
      { type: 'text', text: `繳費可選擇以下兩種方式：

(one)匯款繳費
(thumbtack)匯款帳戶明細
◇戶名:桃園市中壢地政事務所代收各項費用專戶
◇銀行代碼:812
◇帳號：2012-39-0000438-6
◇代收金融機構名稱：台新國際商業銀行中壢分行
(thumbtack)法院囑託測量案件請加註[執行日期]及[公文文號]。
(thumbtack)請於匯款完畢後，傳真流水單至本所（FAX:(03)4024137），並與（03）4917647分機244張小姐確認，謝謝您的配合。

(two)數位櫃台繳費
(thumbtack)自113年7月1日起，數位櫃台增加「非網路申請案建線上繳費功能」，提供地政規費線上繳納機制，可選擇以「晶片金融卡」、「活期性存款帳戶（限本人）」或「信用卡」等方式進行線上繳費，無需赴登記機關或金融機構臨櫃繳費，請多加利用。
(thumbtack)詳情了解:
(1)數位櫃台網址: https://dcland.moi.gov.tw/
(2)請申請人（或代理人）先向本所承辦員（03-4917647分機236葉先生）表明欲線上繳納地政規費，以利本所建檔及通知繳費事宜。` }
    ],
    'B4': [
      { type: 'text', text: `阿吸，您好！
■　案件辦理情形查詢連結點如下：
https://www.land.tycg.gov.tw/chaspx/SQry3.aspx/22

如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` }
    ],
    'B5': [
      { type: 'text', text: `阿吸，您好！

為推廣數值法簡化建物第一次測量作業，內政部釋出免費單機版軟體(sparkles)（SBpublic）(sparkles)提供各界完整繪製成果圖功能。依《地籍測量實施規則》第282條之2、282條之3條規定辦理建物第一次測量，請利用該軟體系統繪製建物成果圖或標示圖。

(Brown hug)SBPublic軟體下載請搜尋「簡化建物第一次測量」，或點選以下網址下載：
https://easymap.land.moi.gov.tw/K01/

(Cony hug)提醒於繪製完成後記得匯出中央政府鎖定共通格式電子檔（*zjb)，連同案件送交地政事務所辦理，可省下每建號600元之數值化作業喔!!` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/%E5%85%B1%E9%80%9A%E5%BC%8F%E9%9B%BB%E5%AD%90%E6%AA%94%E5%BB%BA%E7%89%A9%E5%90%91%E9%87%8F%E5%9C%96.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/%E5%85%B1%E9%80%9A%E5%BC%8F%E9%9B%BB%E5%AD%90%E6%AA%94%E5%BB%BA%E7%89%A9%E5%90%91%E9%87%8F%E5%9C%96.v1776864365041.jpg` }
    ],
    'B6': [
      { type: 'text', text: `阿吸，您好！

(musical note)您知道嗎(eyes)申請建物第一次測量及登記除檢附應繳資料交由地所人員據以繪製建物測量成果圖外，民眾還可利用免費提供之建物測量繪圖軟體自行繪製建物平面圖及建物位置圖(notepad)，連同共通格式電子檔(*.ZJB)(floppy disk)一併繳交予地所，以利後續申辦建物第一次測量登記時，得優先及加速辦理(hourglass full)，達成簡政便民目標(thumbs up)。

(sparkle)簡化建物第一次測量便民服務實施標的及法源依據：
◎實施標的：自102年10月1日以後領有使用執照之建物。

◎法源依據：
(one)地籍測量實施規則第282條之2
建物測量成果圖採地政士及專業人士轉繪簽章者，得免由地政機關轉繪，得於地政機關審查並發給檢附之「建物測量成果圖」後，據以辦理建物第一次登記。
(two)地籍測量實施規則第282條之3
建物標示圖採建築師或測量技師繪製簽證者，免先申請建物所有權第一次測量，得檢附建築師或測量技師得依使用執照竣工平面圖繪製及簽證之建物標示圖後，由登記機關辦理登記。

(sparkle)為推廣數值法簡化建物第一次測量作業，內政部釋出免費單機版軟體（SBpublic）提供各界完整繪製成果圖功能，詳情可輸入關鍵字「單機版建物測量繪圖軟體」了解唷！` }
    ],
    'B7': [
      { type: 'text', text: `阿吸，您好！

(Q):建物地籍測繪資料檢附時機?：
(A):「建物位置圖」以轉繪使用執照竣工平面圖方式辦理者需檢附檢附建物地籍測繪資料。

(Q):為什麼要檢附建物地籍測繪資料：
(A):有鑑於使用執照竣工圖上所載地籍配置資訊是否為實地測量結果不無疑義，為保障民眾權益、避免繪製建物位置與實地不符等，112年5月1日起建物位置轉繪作業應參依實地測繪，並由建築師、測量技師或其他得為測量相關簽證之專門職業及技術人員簽證之建物位置與土地界址、圖根點或鄰近基本控制點、辦理測繪業務所設控制點等其他測量標之距離或邊角資料辦理。

(typing)有關建物地籍測繪資料應涵蓋內容應包含「測繪基本資訊」、「測點圖例圖說」、「距離角度數據」、「簽證印鑑或執業圖記」等4項元素，詳情可洽本所官網了解(magnifying glass)：
https://www.zhongli-land.tycg.gov.tw/News_Content.aspx?n=14066&s=1090602` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/%E5%BB%BA%E7%89%A9%E5%9C%B0%E7%B1%8D%E6%B8%AC%E7%B9%AA%E8%B3%87%E6%96%99.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/%E5%BB%BA%E7%89%A9%E5%9C%B0%E7%B1%8D%E6%B8%AC%E7%B9%AA%E8%B3%87%E6%96%99.v1776864365041.jpg` }
    ],
    'B8': [
      { type: 'text', text: `阿吸，您好！
自112年5月1日起「土地複丈費及建築改良物測量費收費標準」新制正式上線，規費調整請參照以下資訊：
1. 土地複丈費之收費基準表
https://www.land.moi.gov.tw/lawfile/files/20230116151153-u1.pdf
2. 建物第一次測量費之收費基準表
https://www.land.moi.gov.tw/lawfile/files/20230116151455-u1.pdf
3. 建物複丈之收費基準表
https://www.land.moi.gov.tw/lawfile/files/20230116151536-u1.pdf

如您尚有其他問題，可撥打本所電話03-4917647分機245、202，將有專人進一步協助您，謝謝您！` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/%E6%B8%AC%E9%87%8F%E6%94%B6%E8%B2%BB%E6%A8%99%E6%BA%96.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/%E6%B8%AC%E9%87%8F%E6%94%B6%E8%B2%BB%E6%A8%99%E6%BA%96.v1776864365041.jpg` }
    ],
    'C1': [
      { type: 'text', text: `阿吸，您好！
若您欲查詢公告土地現值,可至桃園市政府地政局網站，輸入欲查詢之地段地號進行查詢：
https://www.land.tycg.gov.tw/chaspx/SQry1.aspx/517

如您尚有其他問題，可撥打本所電話03-4917647分機304、309，將有專人進一步協助您，謝謝您！` }
    ],
    'C2': [
      { type: 'text', text: `阿吸，您好！
若您欲試算土地移轉需繳納之增值稅金額，可至桃園市政府地政局網站進行試算查詢：
https://www.land.tycg.gov.tw/chaspx/SQry1.aspx/517

該網站僅提供試算功能，實際稅額仍應以稅務機關核定為準，若尚有相關稅賦問題請逕洽桃園市政府地方稅務局中壢分局，電話03-4515111。` }
    ],
    'C3': [
      { type: 'text', text: `阿吸，您好！
(pencil)請輸入以下數字取得更多實價登錄相關資訊~
【301】實價登錄申報種類
【302】買賣實價登錄申報
【303】租賃及預售屋實價登錄申報
【304】實價登錄申報期限
【305】實價登錄申報義務人
【306】實價登錄查詢網站` },
      { type: 'text', text: `阿吸，您好！
買賣成交資訊實價登錄可分為「線上登錄，紙本送件」及「紙本申報」兩種方式，申報完成後均應於申請買賣移轉登記時一併送件。
「線上登錄，紙本送件」可至內政部不動產成交資訊及預售屋資訊申報網https://vlir.land.moi.gov.tw/  辦理。

如您尚有其他問題，可撥打本所電話03-4917647分機306，將有專人進一步協助您，謝謝您！` }
    ],
    'C4': [
      { type: 'text', text: `阿吸，您好！
買賣成交資訊實價登錄可分為「線上登錄，紙本送件」及「紙本申報」兩種方式，申報完成後均應於申請買賣移轉登記時一併送件。
「線上登錄，紙本送件」可至內政部不動產成交資訊及預售屋資訊申報網https://vlir.land.moi.gov.tw/  辦理。

如您尚有其他問題，可撥打本所電話03-4917647分機306，將有專人進一步協助您，謝謝您！` }
    ],
    'C5': [
      { type: 'text', text: `阿吸，您好！
租賃及預售屋實價登錄案件可分為「憑證登錄，線上申報」、「線上登錄，紙本送件」及「紙本申報」三種方式，提醒您若採「線上登錄，紙本送件」及「紙本申報」兩種方式申報，需於申報期限內將紙本資料送至地政事務所收件，才能完成申報手續。` }
    ],
    'C6': [
      { type: 'text', text: `阿吸，您好！
若欲查詢實價登錄資訊，可至以下網站進行查詢：
1. 內政部不動產交易實價查詢服務網 https://lvr.land.moi.gov.tw/
2. 桃園住宅及不動產資訊桃寶網 https://taobao.tycg.gov.tw/Home
3. 桃園市不動產交易e指通 https://e91plus.tycg.gov.tw/Index` }
    ],
    'C7': [
      { type: 'text', text: `阿吸，您好！
買賣案件應於申請買賣移轉登記時一併辦理，租賃及預售屋(成交、解約)案件則應於立契之日起30內完成申報。` }
    ],
    'C8': [
      { type: 'text', text: `阿吸，您好！
需申報實價登錄的種類如下：
1. 買賣不動產並辦理登記時。
2. 透過建商或不動產經紀業者成交之預售屋。
3. 由不動產經紀業或租賃住宅包租業居間成交之租賃。
4. 預售屋解約。` }
    ],
    'PRICE-301': [
      { type: 'text', text: `阿吸，您好！
需申報實價登錄的種類如下：
1. 買賣不動產並辦理登記時。
2. 透過建商或不動產經紀業者成交之預售屋。
3. 由不動產經紀業或租賃住宅包租業居間成交之租賃。
4. 預售屋解約。` }
    ],
    'PRICE-302': [
      { type: 'text', text: `阿吸，您好！
買賣成交資訊實價登錄可分為「線上登錄，紙本送件」及「紙本申報」兩種方式，申報完成後均應於申請買賣移轉登記時一併送件。
「線上登錄，紙本送件」可至內政部不動產成交資訊及預售屋資訊申報網https://vlir.land.moi.gov.tw/  辦理。

如您尚有其他問題，可撥打本所電話03-4917647分機306，將有專人進一步協助您，謝謝您！` }
    ],
    'PRICE-303': [
      { type: 'text', text: `阿吸，您好！
租賃及預售屋實價登錄案件可分為「憑證登錄，線上申報」、「線上登錄，紙本送件」及「紙本申報」三種方式，提醒您若採「線上登錄，紙本送件」及「紙本申報」兩種方式申報，需於申報期限內將紙本資料送至地政事務所收件，才能完成申報手續。` }
    ],
    'PRICE-304': [
      { type: 'text', text: `阿吸，您好！
買賣案件應於申請買賣移轉登記時一併辦理，租賃及預售屋(成交、解約)案件則應於立契之日起30內完成申報。` }
    ],
    'PRICE-305': [
      { type: 'text', text: `阿吸，您好！
各類實價登錄申報義務人分別如下:
1. 買賣案件：買賣雙方
2. 租賃案件：不動產經紀業及租賃住宅包租業
3. 預售屋銷售案件：銷售預售屋者(建商)或不動產經紀業者
4. 預售屋解約案件：銷售預售屋者(建商或自然人)` }
    ],
    'PRICE-306': [
      { type: 'text', text: `阿吸，您好！
若欲查詢實價登錄資訊，可至以下網站進行查詢：
1. 內政部不動產交易實價查詢服務網 https://lvr.land.moi.gov.tw/
2. 桃園住宅及不動產資訊桃寶網 https://taobao.tycg.gov.tw/Home
3. 桃園市不動產交易e指通 https://e91plus.tycg.gov.tw/Index` }
    ],
    'D1': [
      { type: 'text', text: `阿吸，您好！
地籍謄本櫃員機提供之服務如下：
1. 設置地點：
桃園地政事務所、平鎮地政事務所、龜山地政事務所、市府地政便民工作站與本所六和地政便民工作站。
2. 服務項目：
目前可以申請桃園市、台北市、新北市、台中市、嘉義市第一、二類土地/建物登記謄本、地籍圖及建物測量成果圖謄本申請。
3. 繳費方式：
使用悠遊卡、一卡通或信用卡感應付款，目前不接受現金。
4. 身分驗證方式：
(1) 持身分證明文件至本市各地政事務所臨櫃辦理。
(2) 使用桃園市地政e管家網頁版進行線上申請(申請人須於本市各地政事務所曾經申請登記、測量、謄本案件)。網址：https://www.land.tycg.gov.tw:18018/taoyuan_app2025/index.html

如您尚有其他問題，可撥打本所電話03-4917647分機507，將有專人進一步協助您，謝謝您！` }
    ],
    'D2': [
      { type: 'text', text: `阿吸，您好！
土地基本資料申請方式分為「臨櫃申請」和「網路申請」：
1.臨櫃申請:
(1)申請之土地需為該地政事務所管轄才可受理。
(2)填寫「土地基本資料庫電子資料流通申請表」1式2份。
(3)攜帶申請人身份證明文件及印章。

2網路申請:
(1)需具備「自然人憑證」或「工商憑證」。
(2)至「桃園網路e指通」，點選「地政資訊」/「土地基本資料庫電子資料流通申請」項目，依照畫面步驟操作即可完成申請。

如您尚有其他問題，可撥打本所電話03-4917647分機507，將有專人進一步協助您，謝謝您！` }
    ],
    'D3': [
      { type: 'text', text: `阿吸，您好！
土地基本資料依「桃園市土地基本資料庫電子資料收費標準」計費，連結如下：
https://law.tycg.gov.tw/LawContent.aspx?id=GL000252 

如您尚有其他問題，可撥打本所電話03-4917647分機507，將有專人進一步協助您，謝謝您！` }
    ],
    'E1': [
      { type: 'text', text: `阿吸，您好！
辦理更正編定，可向土地所在地政事務所申請，除門牌編釘證明(佐證資料)及航照圖(佐證資料)外，請檢具檢具以下其一文件：
曾於該建物設籍之戶籍謄本、繳納房屋稅籍證明、用電證明或繳納自來水費用證明、建物完工證明書或其他證明文件。` },
      { type: 'text', text: `本所LINE+ibon卡厲害服務~ 為您搜尋到的文件如下： 
【更正編定申請書】
■ 　列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUSJ5VXFSVGH
■ 　電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/94EEE13CF36646168905E84DC1E90F1B6

【更正編定申請書填寫範例】
■ 　電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/C0E5EAEA43574243AFAA2994D367E0656

如您尚有其他問題，可撥打本所電話03-4917647分機414或419，將有專人進一步協助您，謝謝您！` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR%E6%9B%B4%E6%AD%A3%E7%B7%A8%E5%AE%9A%E7%94%B3%E8%AB%8B%E6%9B%B8.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/QR%E6%9B%B4%E6%AD%A3%E7%B7%A8%E5%AE%9A%E7%94%B3%E8%AB%8B%E6%9B%B8.v1776864365041.jpg` }
    ],
    'E2': [
      { type: 'text', text: `阿吸，您好！
辦理變更編定，請檢具下列資料向土地所在地縣市政府地政局申請：變更編定申請書、興辦事業計畫核准文件、變更編定同意書、土地登記簿謄本及地籍圖謄本、土地使用計畫配置圖及位置圖。` }
    ],
    'E3': [
      { type: 'text', text: `阿吸，您好！
欲查詢土地參考資訊檔資料，可向地政事務所申請或向內政部「土地建物參考資訊檔」官網免費查詢：
https://moiref.moi.gov.tw/pubref/` }
    ],
    'E4': [
      { type: 'text', text: `阿吸，您好！
內政部國土管理署建置「各直轄市、縣市國土功能分區圖草案公開展覽資訊查詢系統」供查詢！
🌏網址：https://up.tcd.gov.tw/Ex3S/ExWeb.aspx` }
    ],
    'E5': [
      { type: 'text', text: `阿吸，您好！
農地不可以違規使用，必須申請容許使用、臨時使用或變更土地使用地類別後再行使用，未經申請違規者，將依區域計畫法處6到30萬罰鍰。` }
    ],
    'E6': [
      { type: 'text', text: `阿吸，您好！
欲查詢土地容許使用資訊，可洽土地所在地縣市政府地政局查詢可供容許使用的項目，或請點選法規資料庫查詢 ：https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0060013&flno=6` }
    ],
    'E7': [
      { type: 'text', text: `阿吸，您好！
輸入下列數字~可獲得更多地用資訊(sunny)
【11】分辨非都市土地和都市土地
【12】非都市土地種類
【13】更正編定
【14】地目變更
【15】查詢地目
【16】變更編定
【17】土地參考資訊
【18】容許使用
【19】土地違規使用
【20】國土計畫
【21】建管時間` }
    ],
    'LAND-11': [
      { type: 'text', text: `阿吸，您好！
土地謄本載有使用分區及使用地類別之土地即為非都市土地，反之即為都市土地。` }
    ],
    'LAND-12': [
      { type: 'text', text: `阿吸，您好！
非都市土地依其使用分區之性質，編定為甲種建築、乙種建築、丙種建築、丁種建築、農牧、林業、養殖、鹽業、礦業、窯業、交通、水利、遊憩、古蹟保存、生態保護、國土保安、殯葬、海域、特定目的事業等使用地。` }
    ],
    'LAND-13': [
      { type: 'text', text: `阿吸，您好！
辦理更正編定，可向土地所在地政事務所申請，除門牌編釘證明(佐證資料)及航照圖(佐證資料)外，請檢具檢具以下其一文件：
曾於該建物設籍之戶籍謄本、繳納房屋稅籍證明、用電證明或繳納自來水費用證明、建物完工證明書或其他證明文件。` },
      { type: 'text', text: `所LINE+ibon卡厲害服務~ 為您搜尋到的文件如下： 
【更正編定申請書】
■ 　列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUSJ5VXFSVGH
■ 　電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/94EEE13CF36646168905E84DC1E90F1B6

【更正編定申請書填寫範例】
■ 　電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/C0E5EAEA43574243AFAA2994D367E0656

如您尚有其他問題，可撥打本所電話03-4917647分機414或419，將有專人進一步協助您，謝謝您！` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR%E6%9B%B4%E6%AD%A3%E7%B7%A8%E5%AE%9A%E7%94%B3%E8%AB%8B%E6%9B%B8.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/QR%E6%9B%B4%E6%AD%A3%E7%B7%A8%E5%AE%9A%E7%94%B3%E8%AB%8B%E6%9B%B8.v1776864365041.jpg` }
    ],
    'LAND-14': [
      { type: 'text', text: `阿吸，您好！
106年起地目等則制度已廢除，無法辦理地目變更相關業務。` }
    ],
    'LAND-15': [
      { type: 'text', text: `阿吸，您好！
地目等則已經廢除，土地謄本上不再顯示土地使用分區及使用地類別相關資料，如需查詢地目等則資料可向地政事務所申請人工登記簿謄本或地籍整理清冊。` }
    ],
    'LAND-16': [
      { type: 'text', text: `阿吸，您好！
辦理變更編定，請檢具下列資料向土地所在地縣市政府地政局申請：變更編定申請書、興辦事業計畫核准文件、變更編定同意書、土地登記簿謄本及地籍圖謄本、土地使用計畫配置圖及位置圖。` }
    ],
    'LAND-17': [
      { type: 'text', text: `阿吸，您好！
欲查詢土地參考資訊檔資料，可向地政事務所申請或向內政部「土地建物參考資訊檔」官網免費查詢：
https://moiref.moi.gov.tw/pubref/` }
    ],
    'LAND-18': [
      { type: 'text', text: `阿吸，您好！
欲查詢土地容許使用資訊，可洽土地所在地縣市政府地政局查詢可供容許使用的項目，或請點選法規資料庫查詢 ：https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0060013&flno=6` }
    ],
    'LAND-19': [
      { type: 'text', text: `阿吸，您好！
農地不可以違規使用，必須申請容許使用、臨時使用或變更土地使用地類別後再行使用，未經申請違規者，將依區域計畫法處6到30萬罰鍰。` }
    ],
    'LAND-20': [
      { type: 'text', text: `阿吸，您好！
內政部國土管理署建置「各直轄市、縣市國土功能分區圖草案公開展覽資訊查詢系統」供查詢！
🌏網址：https://up.tcd.gov.tw/Ex3S/ExWeb.aspx` }
    ],
    'LAND-21': [
      { type: 'text', text: `阿吸，您好！
田地目1-12等則為62年12月24日
田地目13-26等則為64年12月31日
中壢區 為內政部指定日期為62年12月24日
桃園市公告編定為70年2月15日` }
    ],
    'F1': [
      { type: 'text', text: `阿吸，您好！
有關檔案應用申請相關說明，可參閱本所官網檔案應用專區Q&A資訊，連結如下：
https://www.zhongli-land.tycg.gov.tw/archive_QA.htm` },
      { type: 'text', text: `本所LINE+ibon卡厲害~ 為您搜尋到的文件如下： 
【檔案應用申請書】
■　列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
      ASUSXSVFN5A4N
■　電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/9578C16467DC4329B9BF12B95B74768F6` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR%E6%AA%94%E6%A1%88%E6%87%89%E7%94%A8%E7%94%B3%E8%AB%8B%E6%9B%B8.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/QR%E6%AA%94%E6%A1%88%E6%87%89%E7%94%A8%E7%94%B3%E8%AB%8B%E6%9B%B8.v1776864365041.jpg` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR%E6%AA%94%E6%A1%88%E6%87%89%E7%94%A8%E4%BB%A3%E7%90%86%E4%BA%BA%E5%A7%94%E4%BB%BB%E6%9B%B8.v1776864365041.jpg`, previewImageUrl: `${BASE_URL}/public/QR%E6%AA%94%E6%A1%88%E6%87%89%E7%94%A8%E4%BB%A3%E7%90%86%E4%BA%BA%E5%A7%94%E4%BB%BB%E6%9B%B8.v1776864365041.jpg` }
    ],
    'F2': [
      { type: 'text', text: `阿吸，您好！
有關本所志工招募詳細資訊可至本所官網/便民服務/志工園地查詢，或撥打本所電話03-4917647分機412、418 ，將有專人進一步協助您，謝謝您！
🌏網址：https://www.zhongli-land.tycg.gov.tw/cl.aspx?n=5563` }
    ],
    'F3': [
      { type: 'text', text: `阿吸，您好！
本所每年寒暑假招募青年志工的資訊會在假期前兩星期於本所官網最新消息公布。
報名應備資料有：報名表1張、輪值時段需求表1張、2吋大頭照1張、在學證明(學生證或註冊單)影本1份；如您有其他問題可撥打本所電話03-4917647分機412、418，將有專人進一步協助您，謝謝您！` }
    ]
  };

  return replies[code] || [{ type: 'text', text: '很抱歉，尚未建立此關鍵字的自動回應內容。' }];
};
