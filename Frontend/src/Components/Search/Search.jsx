import { useState } from "react";
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
    return <button className="search-toggle" onClick={() => setOpen(true)}>🔍</button>;
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
      {value && <span className="search-clear" onClick={handleClear}>✕</span>}
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
