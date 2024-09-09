import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useState} from "react";
import Input from "./Pages/Input";
import Payment from "./Pages/Payment";

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
 const [Language, setLanguage] = useState(ECPay.Language.zhTW);//ECPay.Language.enUS
  const [ServerType, setServerType] = useState("Stage");
  const [IsLoading, setIsLoading] = useState(1);
  const [Version, setVersion] = useState("V2");
  const [MerchantTradeNo, setMerchantTradeNo] = useState(`emb${getCurrentTime().string}`);
  const [MerchantTradeDate,setMerchantTradeDate] = useState(getCurrentTime().time);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Input
              setToken={setToken}
              MerchantID={MerchantID}
              setMerchantID={setMerchantID}
              MerchantTradeNo={MerchantTradeNo}
              MerchantTradeDate={MerchantTradeDate}
             
            />
          }
        />
        <Route
          path="/payment"
          element={
            <Payment
              MerchantID={MerchantID}
              setMerchantID={setMerchantID}
              Token={Token}
              Language={Language}
              ServerType={ServerType}
              IsLoading={IsLoading}
              Version={Version}
              MerchantTradeNo={MerchantTradeNo}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
