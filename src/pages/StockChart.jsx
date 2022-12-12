import Chart from "react-apexcharts";
import { useState } from "react";

export const StockChart = ({ chartData, symbol }) => {
  const [dateFormat, setDateFormat] = useState("24h");

    const { day, week, year } = chartData;

    const determineTimeFormat = () => {
      switch (dateFormat) {
        case "24h":
          return day;
        case "W":
          return week;
        case "Y":
          return year;
        default:
          return day;
      }
    };
    const series = [
      {
        name: symbol,
        data: determineTimeFormat(),
      },
    ];

    const renderButtonSelect = (buttonClicked) => {
      const classes = "btn m-1 ";

      if (buttonClicked === dateFormat) {
        return classes + "btn-primary";
      } else {
        return classes + "btn-outline-primary";
      }
    };

    const color =
      determineTimeFormat()[determineTimeFormat().length - 1].y -
        determineTimeFormat()[0].y >
      0
        ? "#26C281"
        : "#ed3419";

    
   
  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: "center",

      style: {
        fontsize: "24px",
      },
    },

    chart: {
      id: "stock data",
      animations: { speed: 1300 },
    },

    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    tooltip: {
      x: { format: "MMM dd HH:MM" },
    },
  };
  

  return (
    <div className="mt-5 p-4 shadow-sn bg-white">
      {/* style={{background: 'rgba(145, 158, 171, 0.04)'}} */}
      <Chart options={options} series={series} type="area" width={"100%"} />
      <div>
        <button
          onClick={() => setDateFormat("24h")}
          className={renderButtonSelect("24h")}
        >
          1D
        </button>
        <button
          onClick={() => setDateFormat("W")}
          className={renderButtonSelect("W")}
        >
          W
        </button>
        <button
          onClick={() => setDateFormat("Y")}
          className={renderButtonSelect("Y")}
        >
          Y
        </button>
      </div>
    </div>
  );
};
