import { useState,useEffect } from "react";
import SearchStocks from "../../components/SearchStocks/SearchStocks";
import style from "./style.module.css";
import StocksList from "../../components/StocksList/StocksList";
import { addSymbolToFavorites } from '../../helpers/addSymbolToFavorites';

const Stocks = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storage = localStorage.getItem("favorites");
    if (storage) {
      setFavorites(JSON.parse(storage))
    }
  }, []);

  const addSToFavorutes = (symbol) => {
    addSymbolToFavorites(symbol,favorites,() => setFavorites((prev) => [symbol, ...prev]))
  };

  const deleteFromFavorites = (symbol) => {
    deleteFromFavorites(symbol,(newArray) => setFavorites(newArray))
  };

  return (
    <div className={style.stocks}>
      <h1>Stocks</h1>
      <SearchStocks addSToFavorutes={addSToFavorutes} />
      <StocksList
        deleteFromFavorites={deleteFromFavorites}
        stocks={favorites}
      />
    </div>
  );
};

export default Stocks;
