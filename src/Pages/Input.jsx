import { useState } from "react";
import "../App.css";
import axios from "axios"; // npm i axios
import { useNavigate } from "react-router-dom"; //   npm install react-router-dom

export default function Input({
  backendurl,
  setToken,
  MerchantID,
  getCurrentTime,
  setMerchantTradeNo,
  Language,
  setLanguage,
}) {
  const navigate = useNavigate();
  const Timestamp = Math.floor(Date.now() / 1000);
  const MerchantMemberID = "member3002607";

  const [Unit, setUnit] = useState(1);
  const [TotalAmount, setTotalAmount] = useState(100);
  const [Name, setName] = useState("測試帳號三");
  const [Phone, setPhone] = useState("0912345678");
  const [Email, setEmail] = useState("3002607@test.com");
  const [RememberCard, setRememberCard] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const price = 100;
  const PaymentUIType = 2;
  const ChoosePaymentList = 0;
  const ReturnURL = `${backendurl}/ReturnURL`;
  const OrderResultURL = `${backendurl}/OrderResultURL`;
  const latestMerchantTradeNo = `emb${getCurrentTime().string}`;
  const MerchantTradeDate = `${getCurrentTime().time}`;

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
      MerchantTradeNo: latestMerchantTradeNo,
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

  async function handleSubmit() {
    setMerchantTradeNo(latestMerchantTradeNo);
    setIsClicked(true);
    try {
      const response = await axios.post(
        "https://ecpay-embedded-checkout-backend.vercel.app/GetTokenbyTrade",
        //"http://localhost:3000/GetTokenbyTrade",
        GetTokenByTradePayload
      );

      setToken(response.data);
      navigate("/payment");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="paramsInput">
        
          <form>
            <input
              type="radio"
              name="chooseLanguage"
              checked={Language==ECPay.Language.zhTW}
              onChange={() => {
                setLanguage(ECPay.Language.zhTW);
              }}
            />
            中文
            <input
              type="radio"
              name="chooseLanguage"
              checked={Language==ECPay.Language.enUS}
              onChange={() => {
                setLanguage(ECPay.Language.enUS);
              }}
            />
            English
          </form>
        
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
              onChange={(e) => {
                const newUnit = Math.min(
                  100,
                  Math.max(1, parseInt(e.target.value) || 1)
                );
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
        <button onClick={handleSubmit} disabled={isClicked}>
          {isClicked ? "送出中" : "送出"}
        </button>
      </div>

      <div id="ECPayPayment" className="PaymentUI"></div>
    </>
  );
}
