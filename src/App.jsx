import {useState} from "react";

export default function App() {
  function getCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
    const time = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    const string = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    return {time, string};
  }

  const [Unit, setUnit] = useState(1);
  const [TotalAmount, setTotalAmount] = useState(100);
  const [Name, setName] = useState("測試帳號三");
  const [Phone, setPhone] = useState("0912345678");
  const [Email, setEmail] = useState("3002607@test.com");
  const [RememberCard, setRememberCard] = useState(false);
  const price = 100;
  const MerchantID = "3002607";
  const PaymentUIType = 2;
  const ChoosePaymentList = 0;
  const MerchantTradeDate = getCurrentTime().time;
  const MerchantTradeNo = `emb${getCurrentTime().string}`;
  const ReturnURL = "https://www.ecpay.com.tw/";
  const OrderResultURL = "https://www.ecpay.com.tw/";
  const TradeDesc = "站內付 2.0 範例";
  const ItemName = "測試商品";
  const CreditInstallment = "3,6,12,18,24";
  const ExpireDate = 3;
  const StoreExpireDate_CVS = 10080;
  const StoreExpireDate_BARCODE = 7;
  const DataBeforeEncrypt = {
    "MerchantID": MerchantID,
    "RemeberCard": RememberCard,
    "PaymentUIType": PaymentUIType,
    "ChoosePaymentList": ChoosePaymentList,
    "OrderInfo": {
      "MerchantTradeDate": MerchantTradeDate,
      "MerchantTradeNo": MerchantTradeNo,
      "TotalAmount": TotalAmount,
      "TradeDesc": TradeDesc,
      "ItemName": ItemName,
      "ReturnURL": ReturnURL
    },
    "CardInfo": {
      "OrderResultURL": OrderResultURL,
      "CreditInstallment": CreditInstallment
    },
    "UnionPayInfo": {OrderResultURL: OrderResultURL},
    "ATMInfo": {
      "ExpireDate": ExpireDate
    },
    "CVSInfo": {
      "StoreExpireDate": StoreExpireDate_CVS
    },
    "BARCODEInfo": {
      "StoreExpireDate": StoreExpireDate_BARCODE
    },
    "ConsumerInfo": {
      "Name": Name,
      "Phone": Phone,
      "Email": Email
    }
  };

  async function handleSubmit() {
    // try { const response = await.axios.post( "https://ecpg-stage.ecpay.com.tw/Merchant/GetTokenbyTrade", {option:1,} )} catch ( error ) { }
  }

  return (
    <>
      <div className="purchase-info">
        <h2>請輸入購買數量</h2>
        <p>價格：{price}元/份</p>
        <p>
          <input
            value={Unit}
            id="Unit"
            type="number"
            min="1"
            max="100"
            onChange={e => {
              const newUnit = Math.max(1, parseInt(e.target.value) || 0);
              setUnit(newUnit);
              setTotalAmount(newUnit * price);
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
            onChange={e => setName(e.target.value)}
            value={Name}
          />
        </p>
        <p>
          <label>電話</label>
          <input
            id="Phone"
            type="tel"
            maxLength="60"
            onChange={e => {
              const inputValue = e.target.value.replace(/\D/g, "");
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
            onChange={e => setEmail(e.target.value)}
            value={Email}
          />
        </p>

        <label>是否記憶信用卡卡號</label>
        <form>
          是
          <input
            type="radio"
            name="RememberCard"
            value="true"
            checked={RememberCard === true}
            onChange={() => setRememberCard(true)}
          />
          否
          <input
            type="radio"
            name="RememberCard"
            value="false"
            checked={RememberCard === false}
            onChange={() => setRememberCard(false)}
          />
        </form>
      </div>
      <button onClick={() => console.log(DataBeforeEncrypt)}>送出</button>
    </>
  );
}
