import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((e, i) => {
          if (category === "All" || category === e.category) {
            return (
              <FoodItem
                key={e._id}
                id={e._id}
                name={e.name}
                price={e.price}
                description={e.description}
                image={e.image}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
