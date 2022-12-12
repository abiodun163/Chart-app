import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { finnhub } from "../Apis/Finnhub";
import { WatchListContext } from "../WatchListContext";

export const StockList = () => {
  const [stock, setStock] = useState([]);
  const { watchList, deleteStock } = useContext(WatchListContext);
  let navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      let isMounted = true;
      try {
        const responses = await Promise.all(
          watchList.map((stocks) => {
            return finnhub.get("/quote", { params: { symbol: stocks } });
          })
        );

        const data = responses.map((response) => {
          return { data: response.data, symbol: response.config.params.symbol };
        });

        if (isMounted) {
          setStock(data);
        }
        console.warn(stock);
      } catch (error) {
        console.warn(error.response);
      }
    };

    fetchData();

    return () => (isMounted = false);
  }, [watchList]);
  

  const handleStockSelect = (symbol) => {
    navigate(`/detail/${symbol}`);
  }

  const changeColor = (change) => {
    return change > 0 ? "success" : "danger";
  };

  const renderIcon = (change) => {
    return change < 0 ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />;
  };

  return (
    <div>
      <table className="table hover mt-5">
        <thead style={{ color: "rgb(79,89,102)" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chgv</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
          </tr>
        </thead>

        <tbody>
          {stock.map((stockData) => {

            const { symbol } = stockData;
            return (
              <tr
                style={{ cursor: "pointer" }}
                key={symbol}
                className="table-row"
                onClick={() => handleStockSelect(symbol)}
              >
                <th scope="row">{symbol}</th>
                <td>{stockData.data.c}</td>
                <td className={`text-${changeColor(stockData.data.d)}`}>
                  {stockData.data.d} {renderIcon(stockData.data.d)}
                </td>
                <td className={`text-${changeColor(stockData.data.dp)}`}>
                  {stockData.data.dp} {renderIcon(stockData.data.d)}
                </td>
                <td>{stockData.data.h} </td>
                <td>{stockData.data.l}</td>
                <td>{stockData.data.o}</td>
                <td>
                  {stockData.data.pc}{" "}
                  <button className="text-white btn btn-sn ml-3 d-inline-block delete-button bg-danger rounded hover bd-n" onClick={(e) => {
                    e.stopPropagation();
                    deleteStock(symbol);
                  }}>remove</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
