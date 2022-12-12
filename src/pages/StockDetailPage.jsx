import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import finnhub from "../Apis/Finnhub";
import { StockChart } from "./StockChart";

const formatData = (data) => {
 return data.t.map((el, index) => {
    return {
      x: el * 1000,
      y: Math.floor(data.c[index]),
    };
  });
};

export const StockDetailPage = () => {
  const { symbol } = useParams();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const date = new Date();
        const currentTime = Math.floor(date.getTime() / 1000);
        let oneDay;
        if (date.getDay() === 6) {
          oneDay = currentTime - 2 * 24 * 60 * 60;
        } else if (date.getDay() === 0) {
          oneDay = currentTime - 3 * 24 * 60 * 60;
        } else {
          oneDay = currentTime - 24 * 60 * 60;
        }
        const week = currentTime - 7 * 24 * 60 * 60;
        const year = currentTime - 365 * 24 * 60 * 60;
        const responses = await Promise.all([
          finnhub.get("/stock/candle", {
            params: {
              symbol,
              from: oneDay,
              to: currentTime,
              resolution: 30,
            },
          }),
          finnhub.get("/stock/candle", {
            params: {
              symbol,
              from: week,
              to: currentTime,
              resolution: 60,
            },
          }),
          finnhub.get("/stock/candle", {
            params: {
              symbol,
              from: year,
              to: currentTime,
              resolution: "W",
            },
          }),
        ]);

        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data),
        });
      } catch (error) {
        console.warn(error.response);
      }
    };

    fetchData();

    return () => (isMounted = false);
  }, [symbol]);

  return (
    <div>
      {chartData && (
        <div>
          <StockChart chartData={chartData} symbol={ symbol } />
        </div>
      )}
    </div>
  );
};
