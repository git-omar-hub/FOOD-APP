import React from "react";
import "./exploreMenu.css";
import { menu_list } from "../../assets/assets";
export default function ExploreMenu({ category, setCategory }) {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Expiore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes
        crafted with finest ingredients and elevate your dining experience, one
        delicious meal at a time
      </p>
      <div className="explore-menu-list">
        {menu_list.map((e, i) => {
          return (
            <div
              onClick={() => {
                setCategory((prev) =>
                  prev === e.menu_name ? "All" : e.menu_name,
                );
              }}
              key={i}
              className="explore-menu-list-item"
            >
              <img
                className={category === e.menu_name ? "active" : ""}
                src={e.menu_image}
                alt=""
              />
              <p>{e.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
}
