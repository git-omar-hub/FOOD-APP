import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    fristName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  const navegat = useNavigate();

  useEffect(() => {
    if (!token) {
      navegat("/cart");
    } else if (getTotalCartAmount() === 0) {
      navegat("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            onChange={onChangeHandler}
            type="text"
            name="fristName"
            id=""
            placeholder="Frist name"
          />
          <input
            required
            onChange={onChangeHandler}
            type="text"
            name="lastName"
            id=""
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          type="email"
          name="email"
          id=""
          placeholder="Email address"
        />
        <input
          required
          onChange={onChangeHandler}
          type="text"
          name="street"
          id=""
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            onChange={onChangeHandler}
            type="text"
            name="city"
            id=""
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            type="text"
            name="state"
            id=""
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            onChange={onChangeHandler}
            type="text"
            name="zipcode"
            id=""
            placeholder="Zip code"
          />
          <input
            required
            onChange={onChangeHandler}
            type="text"
            name="country"
            id=""
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          type="text"
          name="phone"
          id=""
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
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
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
