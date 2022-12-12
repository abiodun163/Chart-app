import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StockOverViewPage } from "./pages/StockOverViewPage";
import { StockDetailPage } from "./pages/StockDetailPage";

/* cdiqnbaad3i9g9pvvrj0cdiqnbaad3i9g9pvvrjg */

function App() {
  return (
    <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StockOverViewPage />} />
            <Route path="/detail/:symbol" element={<StockDetailPage />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
