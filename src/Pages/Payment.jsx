import {useEffect, useState} from "react";
import axios from "axios"; // npm i axios
export default function Payment({
  MerchantID,
  MerchantTradeNo,
  Token,
  Language,
  ServerType,
  IsLoading,
  Version
}) {
  const [PayToken, setPayToken] = useState("");
  const [ThreeDURL, setThreeDURL] = useState("");
  const Timestamp = Math.floor(Date.now() / 1000);
  const Data = {
    PlatformID: "",
    MerchantID: MerchantID,
    PayToken: PayToken,
    MerchantTradeNo: MerchantTradeNo
  };

  const CreatePaymentPayload = {
    MerchantID: MerchantID,
    RqHeader: {Timestamp: Timestamp},
    Data: Data
  };

  //初始化付款畫面
  useEffect(() => {
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
            }
          },
          Version
        );
      }
    });
  }, [Token, Language, ServerType, IsLoading, Version]);

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
        "http://localhost:3000/CreatePayment",
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
    });
  }

  return (
    <div>
      <h2>綠界站內付 2.0 付款畫面</h2>
      {/* {ThreeDURL} */}
      <div id="PaymentComponent">
        <div id="ECPayPayment"></div>
        <button onClick={handleGetPayToken}>付款</button>
      </div>
    </div>
  );
}
