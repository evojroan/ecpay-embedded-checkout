import axios from "axios"; // npm i axios
import { useState, useEffect } from "react";



export default function OrderResultURL() {
  const [decryptedData, setDecryptedData] = useState(null);
 

  useEffect(() => {
  

    console.log(decryptedData)

    setDecryptedData(jsonData)
  }, [decryptedData]);

  
  return (
    <div>
      <h2>訂單結果</h2>
      {decryptedData ? (
        <pre>{JSON.stringify(decryptedData, null, 2)}</pre>
      ) : (
        <p>正在獲取訂單結果...</p>
      )}
    </div>
  );
}
