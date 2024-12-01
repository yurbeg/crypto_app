import { requestUrl } from "../../util/constants/requestUrl";
import { useFetch } from "../../hooks/useFetch";
import { Table } from "antd";
import type { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { CurrencyListResponseModel } from "../../ts/types/CurrencyListResponseModel";
import { ROUTE_PATH } from "../../util/constants/routes";
import { useQueryParam } from "../../hooks/useQueryParam"; 
import { useMemo } from "react";
import { DEFAULT_PAGEINATION } from "../../util/constants/pageination";
const CryptoList = () => {
  const { getQueryParam,setQueryParam} = useQueryParam()
  const navigate = useNavigate()
  const page = getQueryParam('page') || DEFAULT_PAGEINATION.page
  const pegeSize = getQueryParam('pageSize') || DEFAULT_PAGEINATION.pageSize
  const { data, loading, error } = useFetch<CurrencyListResponseModel[]>({
    url: `${requestUrl.coinsMarkets}/coins/markets?vs_currency=usd&per_page=${pegeSize}&page=${page}&currency=usd`,
    header:{
      'x-cg-demo-api-key':process.env.REACT_APP_CRYPTO_API_KEY
    }
  });

  const columns: TableProps<CurrencyListResponseModel>["columns"] =useMemo(()=>{
   return [
      {
        title: "#ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: (value) => {
          return <img src={value} height={50} width={50} />;
        },
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Price Change 24",
        dataIndex: "price_change_24h",
        key: "price_change_24h",
      },
      {
        title: "Price",
        dataIndex: "current_price",
        key: "current_price",
      },
    ];
  },[])

  const handleNavigateDetailPage = (row: CurrencyListResponseModel) => {
    navigate(`${ROUTE_PATH.CRYPTO_DETAIL}/${row.id}`)
  };
  return (
    <div>
      <Table
      
        columns={columns}
        loading={loading}
        dataSource={data || []}
        pagination={{
          total:100,
          current:+page,
          pageSize:+pegeSize,
          onChange(page,pageSize){
            setQueryParam({
              page,pageSize
            })
          }
        }}
        onRow={(row) => {
          return {
            onClick: () => handleNavigateDetailPage(row),
          };
        }}
      />
    </div>
  );
};
export default CryptoList;
