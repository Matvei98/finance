import { useState, useEffect, useRef } from "react";
import stocksApi from "../../api/stocksApi";
import { useQuery } from "react-query";
import style from "./style.module.css";
import { filterStocks } from "../../helpers/filterStocks";
import SearchInput from "./SearchInput/SearchInput";
import Autocomplete from './Autocomplete/Autocomplete';
const SearchStocks = ({ addSToFavorutes }) => {
  const { data } = useQuery("getStocks", () => stocksApi["getStocks"]());
  const [value, setValue] = useState("");
  const [stocks, setStocks] = useState([]);
  const [focus, setFocus] = useState(false);

  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (!data) return;
    const filteredStocks = filterStocks(data, value);
    setStocks(filteredStocks);
  }, [data, value]);

  const onBlurHandler = (e) => {
    setTimeout(() => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(e.target)
      ) {
        setFocus(false);
      }
    }, 100);
  };

  const selectStock = (stock) => {
    setValue(stock.description);
    addSToFavorutes(stock.symbol);
  };

  return (
    <div className={style.searchBlock}>
      <SearchInput
        value={value}
        setFocus={setFocus}
        setValue={setValue}
        onBlurHandler={onBlurHandler}
      />
      {focus && stocks.length ? (
       <Autocomplete 
       stocks={stocks}
       ref={autocompleteRef}
       selectStock={selectStock}
       />
      ) : null}
    </div>
  );
};

export default SearchStocks;
