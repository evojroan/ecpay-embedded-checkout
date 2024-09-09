import { useEffect, useState } from "react";
import axios from "axios"; // npm i axios
export default function Payment({
  MerchantID,
  MerchantTradeNo,
  Token,
  Language,
  ServerType,
  IsLoading,
  Version,
}) {
  const [paymentRendered, setPaymentRendered] = useState(false);
  const [isClicked,setIsClicked]=useState(false)
  const [PayToken, setPayToken] = useState("");
  const [ThreeDURL, setThreeDURL] = useState("");
  const Timestamp = Math.floor(Date.now() / 1000);
  const Data = {
    PlatformID: "",
    MerchantID: MerchantID,
    PayToken: PayToken,
    MerchantTradeNo: MerchantTradeNo,
  };

  const CreatePaymentPayload = {
    MerchantID: MerchantID,
    RqHeader: { Timestamp: Timestamp },
    Data: Data,
  };

  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    const checkSDKLoaded = setInterval(() => {
      if (window.ECPay) {
        clearInterval(checkSDKLoaded);
        setSdkLoaded(true);
      }
    }, 100);

    return () => clearInterval(checkSDKLoaded);
  }, []);

  useEffect(() => {
    if (sdkLoaded) {
      ECPay.initialize(ServerType, IsLoading, function (errMsg) {
        if (errMsg) {
          console.error(errMsg);
        } else {
          ECPay.createPayment(
            Token,
            Language,
            function (errMsg) {
              if (errMsg) {
                console.error(errMsg);
              }else{setPaymentRendered(true)}
            },
            Version
          );
        }
      });
    }
  }, [sdkLoaded, Token, Language, ServerType, IsLoading, Version]);

  //等待取得 Paytoken
  useEffect(() => {
    if (PayToken) {
      handleCreatePayment();
    }
  }, [PayToken]);

  //等待取得 ThreeDURL
  useEffect(() => {
    if (ThreeDURL) {
      window.location.href = ThreeDURL.replace(/^"|"$/g, "");
    }
  }, [ThreeDURL]);

  //取得 Paytoken 後，立即以 CreatePaymentPayload 呼叫後端
  async function handleCreatePayment() {
    try {
      const response = await axios.post(
        "https://ecpay-embedded-checkout-backend.vercel.app/CreatePayment",
        CreatePaymentPayload
      );
      setThreeDURL(JSON.stringify(response.data.ThreeDInfo.ThreeDURL));

      //CreatePayment 還要 3D 驗證。
    } catch (error) {
      console.error(error);
    }
  }

  //SDK 取得 Paytoken
  function handleGetPayToken() {
    ECPay.getPayToken(function (paymentInfo, errMsg) {
      if (errMsg) {
        console.error(errMsg);
        return;
      }
      setPayToken(paymentInfo.PayToken);
      setIsClicked(true)
    });
  }

  return (
    <div>
      <h2>綠界站內付 2.0 付款畫面</h2>
      {sdkLoaded ? (
        <div id="PaymentComponent">
          <div id="ECPayPayment"> </div>
          {paymentRendered && (
            <button onClick={handleGetPayToken}  disabled={isClicked}>{isClicked?"付款中":"付款"}</button>
          )}
         
        </div>
      ) : (
        <p>正在載入支付 SDK...</p>
      )}
    </div>
  );
}
