import React, { useContext, useEffect, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "sonner";
const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url, token } =
    useContext(StoreContext);
  const [favorited, setFavorited] = useState(false);
  const [reviews, setReviews] = useState({ average: 0, count: 0 });

  const toggleFav = async () => {
    if (!token) return toast.error("Sign in to save favorites");
    const res = await axios.post(`${url}/api/favorite/toggle`, { foodId: id }, { headers: { token } });
    if (res.data.success) { setFavorited(res.data.favorited); toast(res.data.message); }
  };

  useEffect(() => {
    axios.post(`${url}/api/review/get`, { foodId: id }).then((res) => {
      if (res.data.success) setReviews({ average: res.data.average, count: res.data.count });
    });
  }, [url, id]);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={image} alt="" className="food-item-img" />
        <button className={`food-item-fav ${favorited ? "food-item-fav--active" : ""}`} onClick={toggleFav}>♡</button>
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <div className="food-item-stars">
            {"★".repeat(Math.round(reviews.average))}{"☆".repeat(5 - Math.round(reviews.average))}
            <span className="food-item-review-count">({reviews.count})</span>
          </div>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
