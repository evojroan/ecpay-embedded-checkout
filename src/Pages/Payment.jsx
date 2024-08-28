import { useState, useEffect } from "react";


export default function Payment({Token, Language, ServerType, IsLoading, Version}) {
  useEffect(() => {
    function initializeECPay (){
      if (window.ECPay) {
        window.ECPay.initialize(ServerType, IsLoading, function (errMsg) {
          if (errMsg) {
            console.error("ECPay SDK 初始化錯誤:", errMsg);
          } else {
            console.log("ECPay SDK 初始化成功");
          }
        });
      } else {
        alert("ECPay SDK 未正確加載");
      }

      ECPay.createPayment({Token},{Language},function(errMsg){if(errMsg) {
        console.error("ECPay SDK 取得付款畫面錯誤:", errMsg);
      } else {
        console.log("ECPay SDK 取得付款畫面成功");
      }},Version)
    };

    if (document.readyState === "complete") {
      initializeECPay();
    } else {
      window.addEventListener("load", initializeECPay);
      return () => window.removeEventListener("load", initializeECPay);
    }
  }, []);



  return (
    <div>
      <h2>綠界站內付 2.0 付款畫面</h2>
      {Token}
    </div>
  );
}