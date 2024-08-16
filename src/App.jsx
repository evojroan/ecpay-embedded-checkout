import { useState } from "react";

export default function App() {
  const [TotalAmount, setTotalAmount] = useState(0);
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const price=100
  const MerchantID="3002607"
  const PaymentUIType =2
  const ChoosePaymentList = 0
  const MerhantTradeDate=""
  const MerchantTradeNo=""
  const ReturnURL=""
  const TradeDesc="站內付 2.0 範例"
  const ItemName = "測試商品"


  return (
    <>
      <div className="purchase-info">
        <h2>請輸入購買數量</h2>
        <p>圖片</p>
        <p>價格：{price}元/份</p>
        <p>
          <input
            id="Unit"
            type="number"
            min="0"
            max="100"
            onChange={(e) => {
              const Unit = parseInt(e.target.value) || 0;
              setTotalAmount(Unit * price);
            }}
          />
        </p>
        總額：{TotalAmount}元
      </div>

      <div className="purchase-info">
        <h2>請輸入購買資訊</h2>
        <p>
          <label>姓名</label>
          <input
            id="Name"
            type="text"
            maxLength="50"
            onChange={(e) => setName(e.target.value)}
            value={Name}
          />
        </p>
        <p>
          <label>電話</label>
          <input
            id="Phone"
            type="tel"
            maxLength="60"
            onChange={(e) => {
              const inputValue = e.target.value.replace(/\D/g, '');
              setPhone(inputValue);
            }}
            value={Phone}
          />
        </p>
        <p>
          <label>電子郵件</label>
          <input
            id="Email"
            type="email"
            maxLength="30"
            onChange={(e) => setEmail(e.target.value)}
            value={Email}
          />
        </p>
        {/* <p>
          <label>是否記憶信用卡卡號</label>
          <input
            id="Email"
            type="email"
            maxLength="30"
            onChange={(e) => setEmail(e.target.value)}
            value={Email}
          />
        </p> */}
      </div>
      <button>送出</button>
    </>
  );
}