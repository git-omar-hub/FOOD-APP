import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../../assets/assets";
const MyoRders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const featchOrdes = async () => {
    const res = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } },
    );
    setData(res.data.data);
  };
  useEffect(
    (params) => {
      if (token) {
        featchOrdes();
      }
    },
    [token],
  );
  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div className="my-orders-order" key={index}>
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " X " + item.quantity;
                  } else {
                    return item.name + " X " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items:{order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button onClick={featchOrdes}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyoRders;
