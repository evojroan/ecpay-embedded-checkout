import {Link} from "react-router-dom";

export default function Index() {
  return (
    <>
     <div className="nav"></div>
     <div className="middle1_Main_Photo"></div>
     <div className="middle2_flex"></div>
     <div className="middle3_Gallery"></div>
     站內付 2.0
     <div className="middle4_BuyNow">  <Link to="/Input" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">開始購買</Link></div>

    

      <div className="footer"></div>
    </>
  );
}
