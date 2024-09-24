import axios from "axios"; // npm i axios

const ws = new WebSocket('ws://localhost:3000')

export default function OrderResultURL(){
    const [decryptedData, setDecryptedData] = useState(null);

    useEffect(()=>{
        ws.onopen=()=>{console.log("WebSocket 已連接")}
        ws.onmessage=(event)=>{
            try{
                const data=JSON.parse(event.data)
                setDecryptedData(data)
            }catch(error){ console.error('解析接收到的數據時出錯:', error);}
        }

        return () => {
            ws.close();
          };

    },[])


    return (
        <>
        購買結果：
        <p>{decryptedData}</p>
        </>
      );}