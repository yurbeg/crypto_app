import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { requestUrl } from "../../util/constants/requestUrl";
import { CurrencyDetailResponseModel } from "../../ts/types/CurrencyDetailResponseModel";
import { Card, Spin } from "antd";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
const { Meta } = Card;

const CryptoDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useFetch<CurrencyDetailResponseModel>({
    url: `${requestUrl.coinsMarkets}/coins/${id}`,
    header: {
      "x-cg-demo-api-key": process.env.REACT_APP_CRYPTO_API_KEY,
    },
  });

  const [priceData, setPriceData] = useState<any[]>([]);
  const [priceLoading, setPriceLoading] = useState<boolean>(true);
  const [priceError, setPriceError] = useState<string>("");

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await fetch(
          `${requestUrl.coinsMarkets}/coins/${id}/market_chart?vs_currency=usd&days=1`
        );
        const result = await response.json();
        const priceChartData = result.prices.map((item: any) => ({
          time: new Date(item[0]).toLocaleTimeString(),
          price: item[1],
        }));
        setPriceData(priceChartData);
        setPriceLoading(false);
      } catch (err) {
        setPriceError("Ошибка загрузки данных о ценах");
        setPriceLoading(false);
      }
    };

    fetchPriceData();
  }, [id]);

  if (loading || priceLoading) {
    return <Spin size="large" />;
  }

  if (error || priceError) {
    return <div>{error || priceError}</div>;
  }

  return (
    <div>
      <Card
        style={{ width: "100px" }}
        cover={<img alt="example" src={data?.image.large} />}
      >
        <Meta title={data?.name} description={data?.symbol} />
      </Card>
      <h3>Price Changes (24h)</h3>

      {priceData.length === 0 ? (
        <p>No data available for price changes.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CryptoDetail;
