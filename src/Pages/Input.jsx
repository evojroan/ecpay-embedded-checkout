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
  const ChoosePaymentList = 7;
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

  const translations = {
    [ECPay.Language.zhTW]: {
      purchaseAmount: "請輸入購買數量",
      price: "價格",
      priceunit:" 元/份",
      totalAmount: "總額",
      ntd:" ",
      purchaseInfo: "請輸入購買資訊",
      name: "姓名",
      phone: "電話",
      email: "電子郵件",
      rememberCard: "是否記憶信用卡卡號",
      yes: "是",
      no: "否",
      submit: "送出",
      submitting: "送出中"
    },
    [ECPay.Language.enUS]: {
      purchaseAmount: "Purchase Amount",
      price: "Price",
      priceunit:" NTD/Piece",
      totalAmount: "Total Amount ",
      ntd:" NTD",
      purchaseInfo: "Purchase Information",
      name: "Name",
      phone: "Phone",
      email: "Email",
      rememberCard: "Remember Credit Card Number",
      yes: "Yes",
      no: "No",
      submit: "Submit",
      submitting: "Submitting"
    }
  };

  async function handleSubmit() {
    setMerchantTradeNo(latestMerchantTradeNo);
    setIsClicked(true);
    try {
      const response = await axios.post(
        `${backendurl}/GetTokenbyTrade`,
        //"http://localhost:3000/GetTokenbyTrade",
        GetTokenByTradePayload
      );

      console.log("Token=",response.data)
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
          <h2>{translations[Language].purchaseAmount}</h2>
          <p>{translations[Language].price}：{price}{translations[Language].priceunit}</p>
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
          {translations[Language].totalAmount}：{TotalAmount}{translations[Language].ntd}
        </div>

        <div className="purchase-info">
          <h2>{translations[Language].purchaseInfo}</h2>
          <p>
            <label>{translations[Language].name}</label>
            <input
              id="Name"
              type="text"
              maxLength="50"
              onChange={(e) => setName(e.target.value)}
              value={Name}
            />
          </p>
          <p>
            <label>{translations[Language].phone}</label>
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
            <label>{translations[Language].email}</label>
            <input
              id="Email"
              type="email"
              maxLength="30"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
            />
          </p>

          <div>{translations[Language].rememberCard}</div>
          <form>
            <label className="hover_radio">
              <input
                type="radio"
                name="RememberCard"
                value="1"
                checked={RememberCard === 1}
                onChange={() => setRememberCard(1)}
              />
              {translations[Language].yes}
            </label>
            <label className="hover_radio">
              <input
                type="radio"
                name="RememberCard"
                value="0"
                checked={RememberCard === 0}
                onChange={() => setRememberCard(0)}
              />
              {translations[Language].no}
            </label>
          </form>
        </div>
        <button onClick={handleSubmit} disabled={isClicked}>
          {isClicked ? translations[Language].submitting:translations[Language].submit }
        </button>
      </div>

      <div id="ECPayPayment" className="PaymentUI"></div>
    </>
  );
}
