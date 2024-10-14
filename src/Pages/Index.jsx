import {Link} from "react-router-dom";

export default function Index() {
  return (
    <>
      <h1 className="font-bold">Hello</h1>
      <Link to="/Input">開始購買</Link>
    </>
  );
}
