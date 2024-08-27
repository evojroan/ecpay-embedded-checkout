import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Input from './Pages/Input';
import Payment from './Pages/Payment';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Input />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}