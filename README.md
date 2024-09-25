# 站內付 2.0

前端頁面：
https://ecpay-embedded-checkout-git-main-evojroans-projects.vercel.app/

後端 Repo：
https://github.com/evojroan/ecpay_embedded_checkout_backend

## 待完成功能
- [ ] 1. 付款方式選 ATM 回傳的付款資訊
- [ ] 2. 付款方式選 BARCODE 回傳的付款資訊
- [ ] 3. 付款方式選 CVS 回傳的付款資訊
- [ ] 4. ApplePay 付款方式
- [ ] 5. ReturnURL
- [ ] 6. OrderResultURL
- [ ] 7. 於前端切換語言
- [X] 8. Input.jsx 按鈕不可重複按

## 待優化功能
- [ ] 1. 所有頁面如果有 error，要於前端顯示，不要只顯示於 console.log
- [ ] 2. Input 頁面可以切換語言

### 整理管理
1. 用 Reducer 管理所有狀態
2. 用 useContext 傳遞狀態 