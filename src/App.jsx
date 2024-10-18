//import {HashRouter as Router, Routes, Route} from "react-router-dom";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import {useState} from "react";
import Index from "./Pages/Index";
import Input from "./Pages/Input";
import Payment from "./Pages/Payment";
import OrderResultURL from "./Pages/OrderResultURL";
import PaymentInfoPage from "./Pages/PaymentInfoPage";
//import ApplePay from '../public/.well-known/apple-developer-merchantid-domain-association.zip'

export default function App() {
  function getCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
    const time = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    const string = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    return {time, string};
  }

  const [MerchantID, setMerchantID] = useState("3002607");
  const [Token, setToken] = useState("");
  const [Language, setLanguage] = useState(ECPay.Language.zhTW); //ECPay.Language.enUS
  const [ServerType, setServerType] = useState("Stage");
  const [IsLoading, setIsLoading] = useState(1);
  const [Version, setVersion] = useState("V2");
  const [PaymentInfo, setPaymentInfo] = useState("");
  const [MerchantTradeNo, setMerchantTradeNo] = useState("");
  const backendurl = "https://ecpay-embedded-checkout-backend.vercel.app";
//const backendurl = "http://localhost:3000";

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Index/>}/>
        {/* <Route path='/.well-known' element={<ApplePay/>}/> */}
        <Route
          path="/Input"
          element={
            <Input
            Language= {Language}
            setLanguage= {setLanguage}
              backendurl={backendurl}
              setToken={setToken}
              MerchantID={MerchantID}
              setMerchantID={setMerchantID}
              getCurrentTime={getCurrentTime}
              setMerchantTradeNo={setMerchantTradeNo}
            />
          }
        />
        <Route
          path="/payment"
          element={
            <Payment
              backendurl={backendurl}
              MerchantID={MerchantID}
              setMerchantTradeNo={setMerchantTradeNo}
              MerchantTradeNo={MerchantTradeNo}
              setPaymentInfo={setPaymentInfo}
              Token={Token}
              Language={Language}
              ServerType={ServerType}
              IsLoading={IsLoading}
              Version={Version}
            />
          }
        />
        <Route
          path="/OrderResultURL"
          element={<OrderResultURL backendurl={backendurl} Language={Language} />}
        />
        <Route
          path="/PaymentInfoPage"
          element={<PaymentInfoPage PaymentInfo={PaymentInfo} />}
        />
      </Routes>
    </Router>
  );
}
