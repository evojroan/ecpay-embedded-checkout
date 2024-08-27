import { useState, useEffect } from "react";
import "../App.css";
import axios from "axios"; // npm i axios
import {Link} from 'react-router-dom' //   npm install react-router-dom

export default function Input() {
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
    return { time, string };
  }
  const ServerType = "Stage"; // Stage or Prod
  const IsLoading = 1; // 1 or 0
  const Timestamp = Math.floor(Date.now() / 1000);
  const [Token, setToken] = useState("");
  const [PayToken, setPayToken] = useState("");
  const [MerchantID, setMerchantID] = useState("3002607");
  const MerchantMemberID = "member3002607";
  const [Unit, setUnit] = useState(1);
  const [TotalAmount, setTotalAmount] = useState(100);
  const [Name, setName] = useState("測試帳號三");
  const [Phone, setPhone] = useState("0912345678");
  const [Email, setEmail] = useState("3002607@test.com");
  const [RememberCard, setRememberCard] = useState(0);
  const price = 100;
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
  const Data = {
    MerchantID: MerchantID,
    RememberCard: RememberCard,
    PaymentUIType: PaymentUIType,
    ChoosePaymentList: ChoosePaymentList,
    OrderInfo: {
      MerchantTradeDate: MerchantTradeDate,
      MerchantTradeNo: MerchantTradeNo,
      TotalAmount: TotalAmount,
      TradeDesc: TradeDesc,
      ItemName: ItemName,
      ReturnURL: ReturnURL,
    },
    CardInfo: {
      OrderResultURL: OrderResultURL,
      CreditInstallment: CreditInstallment,
    },
    UnionPayInfo: { OrderResultURL: OrderResultURL },
    ATMInfo: {
      ExpireDate: ExpireDate,
    },
    CVSInfo: {
      StoreExpireDate: StoreExpireDate_CVS,
    },
    BARCODEInfo: {
      StoreExpireDate: StoreExpireDate_BARCODE,
    },
    ConsumerInfo: {
      MerchantMemberID: MerchantMemberID,
      Name: Name,
      Phone: Phone,
      Email: Email,
    },
  };
  const GetTokenByTradePayload = {
    MerchantID: MerchantID,
    RqHeader: { Timestamp: Timestamp },
    Data: Data,
  };

  async function handleSubmit(GetTokenByTradePayload) {
    console.log("payload", GetTokenByTradePayload);
    try {
      const response = await axios.post(
        " http://localhost:3000/getTokenbyTrade",
        GetTokenByTradePayload
      );

      setToken(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // 待完成：
  //1. useNavigate() 轉到 /payment
  //2. token 要不要改給  App?

  // useEffect(() => {
  //   function initializeECPay (){
  //     if (window.ECPay) {
  //       window.ECPay.initialize(ServerType, IsLoading, function (errMsg) {
  //         if (errMsg) {
  //           console.error("ECPay SDK 初始化錯誤:", errMsg);
  //         } else {
  //           console.log("ECPay SDK 初始化成功");
  //         }
  //       });
  //     } else {
  //       alert("ECPay SDK 未正確加載");
  //     }
  //   };

  //   if (document.readyState === "complete") {
  //     initializeECPay();
  //   } else {
  //     window.addEventListener("load", initializeECPay);
  //     return () => window.removeEventListener("load", initializeECPay);
  //   }
  // }, []);

  return (
    <>
      <div className="paramsInput">
        <div className="purchase-info">
          <h2>請選擇帳號</h2>
          <form>
            <label className="hover_radio">
              <input
                type="radio"
                name="MerchantID"
                value="3002607"
                checked={MerchantID === "3002607"}
                onChange={() => setMerchantID("3002607")}
              />
              3002607(特店測試資料)
            </label>
            <label className="hover_radio">
              <input
                type="radio"
                name="MerchantID"
                value="3003008"
                checked={MerchantID === "3003008"}
                onChange={() => setMerchantID("3003008")}
              />
              3003008(平台商測試資料)
            </label>
          </form>
          <h2>請輸入購買數量</h2>
          <p>價格：{price}元/份</p>
          <p>
            <input
              value={Unit}
              id="Unit"
              type="number"
              min="1"
              max="100"
              onChange={(e) => {
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
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
            />
          </p>

          <div>是否記憶信用卡卡號</div>
          <form>
            <label className="hover_radio">
              <input
                type="radio"
                name="RememberCard"
                value="1"
                checked={RememberCard === 1}
                onChange={() => setRememberCard(1)}
              />
              是
            </label>
            <label className="hover_radio">
              <input
                type="radio"
                name="RememberCard"
                value="0"
                checked={RememberCard === 0}
                onChange={() => setRememberCard(0)}
              />
              否
            </label>
          </form>
        </div>
       <button onClick={() => handleSubmit(GetTokenByTradePayload)}>
        送出
        </button>
        
      </div>
      
      <div id = "ECPayPayment" className="PaymentUI"></div>
    </>
  );
}
