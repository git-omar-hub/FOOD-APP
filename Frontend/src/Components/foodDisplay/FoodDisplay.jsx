import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import EmptyState from "../EmptyState/EmptyState";
const FoodDisplay = ({ category, search }) => {
  const { food_list } = useContext(StoreContext);
  const filtered = food_list.filter((e) => {
    if (category !== "All" && category !== e.category) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!e.name.toLowerCase().includes(q) && !e.description.toLowerCase().includes(q)) return false;
    }
    return true;
  });
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      {filtered.length === 0 ? (
        <EmptyState icon="🍽️" title="No dishes found" message={search ? `No results for "${search}"` : "No dishes in this category"} />
      ) : (
        <div className="food-display-list">
          {filtered.map((e) => (
            <FoodItem key={e._id} id={e._id} name={e.name} price={e.price} description={e.description} image={e.image} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
