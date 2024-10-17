import {Link} from "react-router-dom";
import Button from '../assets/Components.jsx'

export default function Index() {
  return (
    <>
     <div className="nav"></div>
     <div className="middle1_Main_Photo"></div>
     <div className="middle2_flex"></div>
     <div className="middle3_Gallery"></div>
     站內付 2.0
     <div className="middle4_BuyNow">  <Link to="/Input" ><Button/></Link></div>

    

      <div className="footer"></div>
    </>
  );
}
