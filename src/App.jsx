import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {useState} from 'react'
import Input from './Pages/Input';
import Payment from './Pages/Payment';

export default function App() {
  const [Token, setToken] = useState("");
  const [PayToken, setPayToken] = useState("");
  const [Language,setLanguage]=useState("ECPay.Language.zhTW")
  const [ServerType,setServerType]=useState("Stage")
  const [IsLoading,setIsLoading]=useState(1)
  const [Version,setVersion]=useState("V2")



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Input setToken={setToken}/>} />
        <Route path="/payment" element={<Payment Token={Token} Language={Language} ServerType={ServerType} IsLoading={IsLoading} Version={Version}/>} />
      </Routes>
    </BrowserRouter>
  );
}