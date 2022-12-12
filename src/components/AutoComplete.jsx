import { useState, useEffect, useContext } from "react";
import finnhub from "../Apis/Finnhub";
import { WatchListContext } from "../WatchListContext";

export const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const { addStock } = useContext(WatchListContext);
  // const [isMounted, setIsMounted] = useState(true);

  const renderDropDown = () => {
    const dropDown = search ? "show" : null;

    return (
      <ul
        className={`dropdown-menu mt-3 ${dropDown}`}
        style={{
          height: "400px",
          placeItems: "center",
          width: "100%",
          padding: "1.5rem",
          fontSize: "1.1rem",
          lineHeight: "2rem",
          overflowX: "hidden",
          overflowY: "scroll",
          cursor: "pointer",
        }}
      >
        {results.map((result) => {
          const { description, symbol } = result;
          return (
            <li key={symbol} onClick={() => {
              addStock(symbol)
              setSearch('')
            }
        }>
              {description} ({symbol})
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const { data } = await finnhub.get("/search", {
          params: {
            q: search,
          },
        }); /* tesla */

        const { result } = data;

        if (isMounted) {
          setResults(result);
        }
  
      } catch (error) {
        console.log(error.response);
      }
    };
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }

    return () => (isMounted = false);
  }, [search]);

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          className="form-control"
          value={search}
          style={{ background: "rgba(145, 158, 171, 0.04)" }}
          id="search"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          autoComplete="off"
        />

        <label htmlFor="search">Search</label>
        {renderDropDown()}
      </div>
    </div>
  );
};
