import { requestUrl } from "../../util/constants/requestUrl";
import { useFetch } from "../../hooks/useFetch";
import { Table, Select } from "antd";
import type { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { CurrencyListResponseModel } from "../../ts/types/CurrencyListResponseModel";
import { ROUTE_PATH } from "../../util/constants/routes";
import { useQueryParam } from "../../hooks/useQueryParam"; 
import { useMemo,  useState } from "react";
import { DEFAULT_PAGEINATION } from "../../util/constants/pageination";

const CryptoList = () => {
  const { getQueryParam, setQueryParam } = useQueryParam();
  const navigate = useNavigate();

  const page = getQueryParam("page") || DEFAULT_PAGEINATION.page;
  const pageSize = getQueryParam("pageSize") || DEFAULT_PAGEINATION.pageSize;
  const currency = getQueryParam("currency") || "usd"; 

  const [selectedCurrency, setSelectedCurrency] = useState(currency);

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
    setQueryParam({ currency: value, page, pageSize });
  };

  const { data, loading } = useFetch<CurrencyListResponseModel[]>({
    url: `${requestUrl.coinsMarkets}/coins/markets?vs_currency=${selectedCurrency}&per_page=${pageSize}&page=${page}&currency=${selectedCurrency}`,
    header: {
      'x-cg-demo-api-key': process.env.REACT_APP_CRYPTO_API_KEY,
    },
  });

  const columns: TableProps<CurrencyListResponseModel>["columns"] = useMemo(() => {
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
        render: (value) => <img alt="example" src={value} height={50} width={50} />,
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
  }, []);

  const handleNavigateDetailPage = (row: CurrencyListResponseModel) => {
    navigate(`${ROUTE_PATH.CRYPTO_DETAIL}/${row.id}`);
  };

  return (
    <div>
      <Select
        value={selectedCurrency}
        onChange={handleCurrencyChange}
        style={{ marginBottom: 20, width: 120 }}
      >
        <Select.Option value="usd">USD</Select.Option>
        <Select.Option value="rub">RUB</Select.Option>
        <Select.Option value="aed">AED</Select.Option>
      </Select>

      <Table
        columns={columns}
        loading={loading}
        dataSource={data || []}
        pagination={{
          total: 100,
          current: +page,
          pageSize: +pageSize,
          onChange(currentPage, pageSize) {
            setQueryParam({
              page: currentPage,
              pageSize,
              currency: selectedCurrency, 
            });
          },
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
