import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {useState} from 'react'
import Input from './Pages/Input';
import Payment from './Pages/Payment';

export default function App() {

  
  const [MerchantID,setMerchantID]=useState("3002607")
  const [Token, setToken] = useState("");
  const [Language,setLanguage]=useState("ECPay.Language.zhTW")
  const [ServerType,setServerType]=useState("Stage")
  const [IsLoading,setIsLoading]=useState(1)
  const [Version,setVersion]=useState("V2")
  const [MerchantTradeNo,setMerchantTradeNo] =useState("")
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Input setToken={setToken} MerchantID={MerchantID} setMerchantID={setMerchantID} MerchantTradeno={MerchantTradeNo} setMerchantTradeNo={setMerchantTradeNo} />} />
        <Route path="/payment" element={<Payment MerchantID={MerchantID} setMerchantID={setMerchantID} Token={Token} Language={Language} ServerType={ServerType} IsLoading={IsLoading} Version={Version} MerchantTradeNo={MerchantTradeNo}/>} />
      </Routes>
    </BrowserRouter>
  );
}