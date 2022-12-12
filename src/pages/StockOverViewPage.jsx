import {AutoComplete} from '../components/AutoComplete';
import {StockList} from "../components/StockList";

export const StockOverViewPage = () => {
  return (
    <div>
      <h1>Stock Overview Page</h1>
      <h2><AutoComplete/></h2>
      <h2><StockList /></h2>
    </div>
  );
};