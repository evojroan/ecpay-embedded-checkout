# 站內付 2.0

## 待解決問題
1. 到了 payment 頁面，console 錯誤訊息： Uncaught TypeError: i is not a function
2. 付款畫面的語言有時會自動改

## 待優化功能
### 所有頁面
1. 如果有 error，要於前端顯示，不要只顯示於 console.log

### Payment 頁面：
1. 付款按鈕與站內付畫面一起出來
2. 按下付款按鈕後，就不能再按了，並顯示「付款中」
3. 於前端切換正式/測試，後端也要改




### 整理管理
1. 用 Reducer 管理所有狀態
2. 用 useContext 傳遞狀態