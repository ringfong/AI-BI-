# AI-BI-數據分析專案
藉由HIS資料庫進行資料彙整形成報表，進行視覺化處哩，包含各類分析圖表之應用
專案以ASP.NET MVC為架構進行開發，資料庫為Microsoft SQL Server，上傳部分僅包含前端介面，使用ECharts進行數據可視化開發

## 健保頁面示意
![image](https://github.com/ringfong/AI-BI-/blob/master/%E5%81%A5%E4%BF%9D01.png)

前端處理 : 
1. 依據現在時間建立年度分類往回推兩個民國年。
2. 以ECharts繪製圖表，具體設定見JS註解。
AJAX流程 : 
1. 進入網頁=>前端建立民國年，回傳後端現在時間
2. 後端回傳醫生姓名、健保資料，再根據獲得資料繪製圖表。

## 自費頁面示意
![image](https://github.com/ringfong/AI-BI-/blob/master/%E8%A1%A8%E6%A0%BC1.png)

前端處理 : 
1. 依據現在時間建立年度分類往回推兩個民國年。
2. 失焦觸發計算金額加總與平均單價。
3. 阻擋數字以外任何輸入，包含小數點、負數、特殊符號。
4. 更多項目打開display:none的第二表格
AJAX流程 : 
1. 進入網頁=>請求醫生名單與醫師代號，填入上方分類，請求診所總體加總資料，載入表格，由於後端資料寄送為JSON型式，需再轉換為表格二維陣列。
2. 點選醫生、選擇年分=>回傳[醫生代號，時間]，請求資料，資料在JS中建立表格陣列，再根據表格陣列填入畫面，所有計算依循表格陣列而非畫面數值。
3. 儲存=>將畫面數值同步到JS表格陣列，再將表格陣列存入後端資料庫，並依循表格陣列以ECharts繪製圖表

![image](https://github.com/ringfong/AI-BI-/blob/master/%E8%A1%A8%E6%A0%BC2.png)

前端處理: 
1. JS寫入方向鍵進行表格二的focus切換，TAB鍵向右切換，ENTER鍵向下切換。
2. ECharts 對資料格式有每個圖表不同的要求，詳細參照JS中註解的說明。
