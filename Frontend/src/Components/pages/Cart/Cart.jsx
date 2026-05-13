import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Cart = () => {
  const { food_list, cartItems, removeFromCart, getTotalCartAmount, url, token } =
    useContext(StoreContext);
  const [promoCode, setPromoCode] = useState("");
  const navegate = useNavigate();

  const handlePromoSubmit = async () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }
    try {
      await axios.post(`${url}/api/cart/coupon`, { code: promoCode });
      toast.success("Coupon applied!");
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        toast.error("Coupon service unavailable");
      } else {
        toast.error(err.response?.data?.message || "Invalid coupon code");
      }
    }
    setPromoCode("");
  };
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((e, i) => {
          if (cartItems[e._id] > 0) {
            return (
              <React.Fragment key={e._id}>
                <div className="cart-items-title  cart-items-item">
                  <img src={e.image} alt="" />
                  <p>{e.name}</p>
                  <p>${e.price}</p>
                  <p>{cartItems[e._id]}</p>
                  <p>${e.price * cartItems[e._id]}</p>
                  <p
                    onClick={() => {
                      removeFromCart(e._id);
                    }}
                    className="close"
                  >
                    X
                  </p>
                </div>
                <hr />
              </React.Fragment>
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Suptotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </p>
            </div>
            <hr />
          </div>
          <button
            onClick={() => {
              if (!token) {
                toast.error("Please sign in to checkout");
                return;
              }
              if (getTotalCartAmount() === 0) {
                toast.error("Your cart is empty");
                return;
              }
              navegate("/order");
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input
                type="text"
                placeholder="promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={handlePromoSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
