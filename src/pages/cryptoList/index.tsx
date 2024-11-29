import { requestUrl } from "../../util/constants/requestUrl";
import { useFetch } from "../../hooks/useFetch";
import { Table } from "antd";
import type { TableProps } from "antd";
import { CureencyResponseModel } from "../../ts/types/CureencyResponseModel";
import { log } from "console";

const CryptoList = () => {
  const { data, loading, error } = useFetch<CureencyResponseModel[]>({
    url: `${requestUrl.coinsMarkets}?vs_currency=usd`,
  });

  console.log(data, "data");

  const columns: TableProps<CureencyResponseModel>["columns"] = [
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
      key: "price_cahnge_24h",
    },
    {
      title: "Price",
      dataIndex: "current_price",
      key: "currency_price",
    },
  ];

  const handleNavigateDetailPage = (row: CureencyResponseModel) => {
    console.log(row.id);
  };
  return (
    <div>
      <Table
        columns={columns}
        loading={loading}
        dataSource={data || []}
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
