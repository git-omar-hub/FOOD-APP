import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import EmptyState from "../EmptyState/EmptyState";
const FoodDisplay = ({ category }) => {
  const { food_list, searchQuery } = useContext(StoreContext);
  const items = Array.isArray(food_list) ? food_list : [];
  const query = (searchQuery || "").toLowerCase().trim();

  const filtered = items.filter((e) => {
    const matchCategory = category === "All" || category === e.category;
    const matchSearch =
      !query ||
      e.name.toLowerCase().includes(query) ||
      e.description.toLowerCase().includes(query);
    return matchCategory && matchSearch;
  });

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      {query && <p className="food-display-search-info">Results for "<strong>{searchQuery}</strong>"</p>}
      {filtered.length === 0 ? (
        <EmptyState
          icon="🔍"
          title={query ? "No results found" : "No dishes available"}
          message={query ? `Nothing matches "${searchQuery}". Try a different search term.` : "Check back later for new dishes."}
        />
      ) : (
        <div className="food-display-list">
          {filtered.map((e) => (
            <FoodItem
              key={e._id}
              id={e._id}
              name={e.name}
              price={e.price}
              description={e.description}
              image={e.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
