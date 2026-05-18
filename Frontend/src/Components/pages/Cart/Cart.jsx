import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import EmptyState from "../../EmptyState/EmptyState";

const Cart = () => {
  const { food_list, cartItems, addToCart, removeFromCart, getTotalCartAmount, url, token, couponDiscount, setCouponDiscount, couponCode, setCouponCode } =
    useContext(StoreContext);
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const navigate = useNavigate();

  const handlePromoSubmit = async () => {
    setPromoError("");
    if (!promoCode.trim()) {
      setPromoError("Enter a promo code");
      return;
    }
    try {
      const res = await axios.post(`${url}/api/coupon/apply`, { code: promoCode, amount: getTotalCartAmount() + 2 });
      if (res.data.success) {
        setCouponDiscount(res.data.discount);
        setCouponCode(promoCode.toUpperCase());
        toast.success(`Coupon applied! You saved $${res.data.discount}`);
      } else {
        setPromoError(res.data.message);
      }
    } catch (err) {
      setPromoError("Coupon service unavailable");
    }
    setPromoCode("");
  };

  const removeCoupon = () => {
    setCouponDiscount(0);
    setCouponCode("");
    toast("Coupon removed");
  };

  const subtotal = getTotalCartAmount();
  const delivery = subtotal === 0 ? 0 : 2;
  const total = subtotal + delivery - (couponDiscount || 0);
  const cartHasItems = Object.values(cartItems).some((qty) => qty > 0);

  if (!cartHasItems) {
    return (
      <div className="cart">
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          message="Looks like you haven't added anything yet"
          action={{ label: "Browse Menu", onClick: () => navigate("/") }}
        />
      </div>
    );
  }

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
        <hr />
        {food_list.map((e) => {
          if (cartItems[e._id] > 0) {
            return (
              <React.Fragment key={e._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={e.image} alt="" />
                  <p>{e.name}</p>
                  <p>${e.price}</p>
                  <div className="cart-qty-controls">
                    <button onClick={() => removeFromCart(e._id)} className="cart-qty-btn">−</button>
                    <span>{cartItems[e._id]}</span>
                    <button onClick={() => addToCart(e._id)} className="cart-qty-btn">+</button>
                  </div>
                  <p>${e.price * cartItems[e._id]}</p>
                  <p onClick={() => removeFromCart(e._id)} className="close">X</p>
                </div>
                <hr />
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${delivery}</p>
            </div>
            {couponDiscount > 0 && (
              <>
                <hr />
                <div className="cart-total-details cart-total-discount">
                  <p>Discount ({couponCode}) <button className="cart-remove-coupon" onClick={removeCoupon}>Remove</button></p>
                  <p>−${couponDiscount}</p>
                </div>
              </>
            )}
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${Math.max(0, total)}</p>
            </div>
            <hr />
          </div>
          <button
            onClick={() => {
              if (!token) {
                toast.error("Please sign in to checkout");
                return;
              }
              if (subtotal === 0) {
                toast.error("Your cart is empty");
                return;
              }
              navigate("/order");
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input
                type="text"
                placeholder="promo code"
                value={promoCode}
                onChange={(e) => { setPromoCode(e.target.value); setPromoError(""); }}
              />
              <button onClick={handlePromoSubmit}>Submit</button>
            </div>
            {promoError && <p className="cart-promo-error">{promoError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
