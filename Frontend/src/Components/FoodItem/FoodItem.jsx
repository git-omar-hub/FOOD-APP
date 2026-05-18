import React, { useContext, useEffect, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "sonner";
import ReviewModal from "../ReviewModal/ReviewModal";
const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url, token, favoritedIds, loadFavorites } =
    useContext(StoreContext);
  const [favorited, setFavorited] = useState(favoritedIds.has(id));
  const [showReview, setShowReview] = useState(false);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    setFavorited(favoritedIds.has(id));
  }, [favoritedIds, id]);

  useEffect(() => {
    axios.post(`${url}/api/review/get`, { foodId: id }).then((res) => {
      if (res.data.success) setAvgRating(res.data.average || 0);
    });
  }, [id, url]);

  const toggleFav = async () => {
    if (!token) return toast.error("Sign in to save favorites");
    const res = await axios.post(`${url}/api/favorite/toggle`, { foodId: id }, { headers: { token } }).catch(() => {});
    if (res && res.data.success) { setFavorited(res.data.favorited); loadFavorites(token); toast(res.data.message); }
  };

  const renderStars = (rating) => {
    const full = Math.round(rating);
    return (
      <span className="food-item-stars">
        {[1, 2, 3, 4, 5].map((s) => (
          <span key={s} className={s <= full ? "star-filled" : "star-empty"}>★</span>
        ))}
      </span>
    );
  };

  return (
    <div className="food-item">
      {showReview && <ReviewModal foodId={id} foodName={name} onClose={() => setShowReview(false)} />}
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
          {avgRating > 0 ? renderStars(avgRating) : <img src={assets.rating_starts} alt="" />}
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
        <button className="food-item-review-btn" onClick={() => setShowReview(true)}>
          {avgRating > 0 ? `${avgRating} ★ Reviews` : "Rate this"}
        </button>
      </div>
    </div>
  );
};

export default FoodItem;
