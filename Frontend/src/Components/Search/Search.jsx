import { useState } from "react";
import { assets } from "../../assets/assets";
import "./Search.css";

const Search = ({ onSearch }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  if (!open) {
    return (
      <button className="search-toggle" onClick={() => setOpen(true)}>
        <img src={assets.search_icon} alt="" />
      </button>
    );
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search food..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
      />
      <button type="submit">Go</button>
    </form>
  );
};

export default Search;
