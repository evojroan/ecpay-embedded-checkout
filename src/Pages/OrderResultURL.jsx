import {useEffect, useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom"; //   npm install react-router-dom

export default function OrderResultURL({backendurl}) {
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const MerchantTradeNo = searchParams.get("MerchantTradeNo");
  const [OrderResult, setOrderResult] = useState(null);

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

  if (!OrderResult) return <div>載入中...</div>;

  return (
    <div>
      <h2>付款結果</h2>

      <p>廠商訂單編號： {OrderResult.OrderInfo.MerchantTradeNo}</p>
      <p>付款時間： {OrderResult.OrderInfo.PaymentDate}</p>
      <p>交易金額： {OrderResult.OrderInfo.TradeAmt}</p>
      <p>
        交易結果：
        {OrderResult.RtnCode == 1
          ? "交易完成，謝謝您的購買！"
          : "交易未成功，請聯絡客服"}
      </p>
      <button
        onClick={() => {
          navigate("/");
        }}>
        返回首頁
      </button>
    </div>
  );
}
