import {useEffect} from "react";

export default function Payment({
  Token,
  Language,
  ServerType,
  IsLoading,
  Version
}) {
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
  }, [ Token, Language, ServerType, IsLoading, Version ] );
  
  function handlePayment() {
    ECPay.getPayToken(function (paymentInfo, errMsg) {});
  }

  return (
    <div>
      <h2>綠界站內付 2.0 付款畫面</h2>
      <div id="ECPayPayment"></div>
      <button onClick={handlePayment}>付款</button>
    </div>
  );
}
