import { useParams } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"
import { requestUrl} from "../../util/constants/requestUrl"
import { CurrencyDetailResponseModel } from "../../ts/types/CurrencyDetailResponseModel"
import { Card } from "antd"
const { Meta } = Card
const CryptoDetail = ()=>{
    const { id } = useParams<{id:string}>()
    const {data,loading,error} = useFetch<CurrencyDetailResponseModel>({
        url:`${requestUrl.coinsMarkets}/coins/${id}`,
        header:{
            'x-cg-demo-api-key':process.env.REACT_APP_CRYPTO_API_KEY
        }
    })
    console.log(data);
    
    
    return(
        <div>
           
            <Card
                style={{width:"100px"}}
                cover={<img alt="example" src={data?.image.large}/>}    
            >
                <Meta title={data?.name} description={data?.symbol}/> 
            </Card>
        </div>
    )
}
export default CryptoDetail