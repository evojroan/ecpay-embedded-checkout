import {useEffect, useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom"; //   npm install react-router-dom



export default function OrderResultURL({backendurl,Language}) {
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const MerchantTradeNo = searchParams.get("MerchantTradeNo");
  const [OrderResult, setOrderResult] = useState(null);
  const translations={
    [ECPay.language.zhTW]:{
      loading:"載入中...",
      result:"付款結果",
      merchanttradeno:"廠商訂單編號",
      paymentdate:"付款時間",
      tradeamount:"交易金額",
      traderesult:"交易結果",
      tradesuccess:"交易成功",
      tradefail:"交易未成功，請聯絡客服",
      back2index:"返回首頁"
    },
    [ECPay.language.enUS]:{
      loading:"Loading",
      result:"Payment Result",
      merchanttradeno:"MerchantTradeNo",
      paymentdate:"Payment Time",
      tradeamount:"Trade Amount",
      traderesult:"Trade Result",
      tradesuccess:"Trade Successful",
      tradefail:"Trade Fails. Please contact customer service",
      back2index:"Back to Index"
    },
  }

  useEffect(() => {
    const fetchPaymentResult = async () => {
      try {
        // 向後端 API 請求付款結果
        const response = await axios.get(
       
          `${backendurl}/api/getOrderResult?MerchantTradeNo=${MerchantTradeNo}`
        );
        setOrderResult(response.data);
      } catch (error) {
        console.error("Error fetching payment result:", error);
      }
    };

    if (MerchantTradeNo) {
      console.log("MerchantTradeNo=", MerchantTradeNo);
      fetchPaymentResult();
    }
  }, [MerchantTradeNo]);

  if (!OrderResult) return <div>{translations[Language].loading}</div>;

  return (
    <div>
      <h2>{translations[Language].result}</h2>

      <p>{translations[Language].merchanttradeno}： {OrderResult.OrderInfo.MerchantTradeNo}</p>
      <p>{translations[Language].paymentdate}： {OrderResult.OrderInfo.PaymentDate}</p>
      <p>{translations[Language].tradeamount}： {OrderResult.OrderInfo.TradeAmt}</p>
      <p>
        {translations[Language].traderesult}：
        {OrderResult.RtnCode == 1
          ? translations[Language].tradesuccess
          : translations[Language].tradefail}
      </p>
      <button
        onClick={() => {
          navigate("/");
        }}>
        {translations[Language].back2index}
      </button>
    </div>
  );
}
