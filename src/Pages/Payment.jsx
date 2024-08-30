import { useEffect,useState } from "react";
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

  const [PayToken,setPayToken]=useState("")

  const Timestamp = Math.floor(Date.now() / 1000);
  const Data={
    PlatformID:"",
    MerchantID:MerchantID,
    PayToken:PayToken,
    MerchantTradeNo:MerchantTradeNo
  }

  const CreatePaymentPayload= {
    MerchantID: MerchantID,
    RqHeader: {Timestamp: Timestamp},
    Data: Data
  };



  useEffect(() => {
    ECPay.initialize(ServerType, IsLoading, function (errMsg) {
      if (errMsg) {
        console.error(errMsg);
      } else {
        console.log("Token=",Token)
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

  async function handleSubmit(){

    try{
      const response = await axios.post(
        " http://localhost:3000/CreatePayment",
        CreatePaymentPayload
      );
      console.log("CreatePayment結果：",response.data)
      //接下來要 Navigate 到 OrderResuktURL?
    }catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (PayToken) {
      console.log("PayToken取得 ",PayToken)
      handleSubmit();
    }
  }, [PayToken]);

  function handlePayment() {
    ECPay.getPayToken(function (paymentInfo, errMsg) {
      if (errMsg) {
        console.error(errMsg);
        return;
      }
      setPayToken(paymentInfo.PayToken)
     
      //console.log("CreatePaymentPayload: ",CreatePaymentPayload)

    });


  }

 

  return (
    <div>
      <h2>綠界站內付 2.0 付款畫面</h2>
      <div id="PaymentComponent">
        <div id="ECPayPayment"></div>
        <button onClick={handlePayment}>付款</button>
      </div>
    
    </div>
  );
}
