import { useEffect, useState } from "react";

export default function Payment({
  Token,
  Language,
  ServerType,
  IsLoading,
  Version,
}) {
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = "https://ecpg-stage.ecpay.com.tw/Scripts/sdk-1.0.0.js?t=20210121100116";
      script.async = true;
      script.onload = () => {
        setSdkLoaded(true);
      };
      document.body.appendChild(script);
    };

    if (window.jQuery) {
      loadScript();
    } else {
      console.error('jQuery is not loaded. ECPay SDK may not work correctly.');
    }

    return () => {
      const script = document.querySelector('script[src="https://ecpg-stage.ecpay.com.tw/Scripts/sdk-1.0.0.js?t=20210121100116"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (sdkLoaded && window.ECPay) {
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
    }
  }, [sdkLoaded, Token, Language, ServerType, IsLoading, Version]);

  return (
    <div>
      <h2>綠界站內付 2.0 付款畫面</h2>
      <div id="ECPayPayment"></div>
    </div>
  );
}
