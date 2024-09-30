
import Barcode from "react-barcode"; //npm i react-barcode
import { useNavigate } from "react-router-dom"; //   npm install react-router-dom

let bankname;


export default function PaymentInfoPage({ PaymentInfo }) {
  const navigate = useNavigate();

  switch (PaymentInfo.ATMInfo.BankCode) {
    case "":
      bankname = "非 ATM 匯款";
      break;
    case "004":
      bankname = "台灣銀行";
      break;
    case "005":
      bankname = "土地銀行";
      break;
    case "007":
      bankname = "第一銀行";
      break;
    case "013":
      bankname = "國泰世華銀行";
      break;
    case "118":
      bankname = "板信銀行";
      break;
    case "814":
      bankname = "大眾銀行";
      break;
    case "822":
      bankname = "中國信託銀行";
      break;
    default:
      "讀取中";
  }
  const payMethod = PaymentInfo.OrderInfo.PaymentType;
  const paymentObj = {
    ATM: {
      PaymentType: "ATM",
      PaymentName: "ATM 櫃員機",
      BankName: `付款銀行：${bankname}`,
      BankCode: `銀行代碼：${PaymentInfo.ATMInfo.BankCode}`,
      vAccount: `繳費帳號：${PaymentInfo.ATMInfo.vAccount}`,
      ExpireDate: `繳費期限：${PaymentInfo.ATMInfo.ExpireDate} 23:59:59`,
    },
    CVS: {
      PaymentType: "CVS",
      PaymentName: "超商代碼",
      CVSName: "付款超市：7-11、全家、萊爾富、OK 皆可",
      CVSCode: "繳費分店：任何分店皆可繳費",
      PaymentNo: `繳費代碼：${PaymentInfo.CVSInfo.PaymentNo}`,
      ExpireDate: `繳費期限：${PaymentInfo.CVSInfo.ExpireDate}`,
    },
    BARCODE: {
      PaymentType: "BARCODE",
      PaymentName: "超商條碼",
      CVSName: "付款超市：7-11、全家、萊爾富、OK 皆可",
      CVSCode: "繳費分店：任何分店皆可繳費",
      PaymentNo: {
        第一段條碼: PaymentInfo.BarcodeInfo.Barcode1,
        第二段條碼: PaymentInfo.BarcodeInfo.Barcode2,
        第三段條碼: PaymentInfo.BarcodeInfo.Barcode3,
      },
      ExpireDate: `繳費期限：${PaymentInfo.BarcodeInfo.ExpireDate} 23:59:59`,
    },
  };

  return (
    <>
      <h2>謝謝您！以下是訂單與匯款資料：</h2>
      訂單編號 ：{PaymentInfo.OrderInfo.MerchantTradeNo}
      <br />
      付款方式 ：{paymentObj[payMethod].PaymentName}
      <br />
      {payMethod === "ATM"
        ? paymentObj[payMethod].BankName
        : payMethod === "CVS"
        ? paymentObj[payMethod].CVSName
        : payMethod === "BARCODE"
        ? paymentObj[payMethod].CVSName
        : ""}
      <br />
      {payMethod === "ATM"
        ? paymentObj[payMethod].BankCode
        : payMethod === "CVS"
        ? paymentObj[payMethod].CVSCode
        : payMethod === "BARCODE"
        ? paymentObj[payMethod].CVSCode
        : ""}
      <br />
      {payMethod === "ATM" ? (
        paymentObj[payMethod].vAccount
      ) : payMethod === "CVS" ? (
        paymentObj[payMethod].PaymentNo
      ) : payMethod === "BARCODE" ? (
        <>
          <Barcode value={paymentObj[payMethod].PaymentNo.第一段條碼} />
          <Barcode value={paymentObj[payMethod].PaymentNo.第二段條碼} />
          <Barcode value={paymentObj[payMethod].PaymentNo.第三段條碼} />
        </>
      ) : (
        ""
      )}
      <br />
      {payMethod === "ATM"
        ? paymentObj[payMethod].ExpireDate
        : payMethod === "CVS"
        ? paymentObj[payMethod].ExpireDate
        : payMethod === "BARCODE"
        ? paymentObj[payMethod].ExpireDate
        : ""}
      <br />
      {/* <Link to="https://ecpay-embedded-checkout-git-main-evojroans-projects.vercel.app/"> */}
      <u onClick={()=>{navigate('/')}}>
        回首頁
      </u>
    </>
  );
}
