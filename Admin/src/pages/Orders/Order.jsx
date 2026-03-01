import "./Order.css";
import React, { useEffect, useState } from "react";
import { StoreContext } from "./../../../../Frontend/src/Components/context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "./../../../../Frontend/src/assets/assets";
const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const featchALlOrders = async () => {
    const res = await axios.get(url + "/api/order/list");
    if (res.data.success) {
      setOrders(res.data.data);
    } else {
      toast.error("Error featching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    const res = await axios.post(url + "/api/order/status", {
      status: event.target.value,
      orderId: orderId,
    });
    if (res.data.success) {
      await featchALlOrders();
      toast.success("Status updated successfuly");
    } else {
      toast.error("Error featching orders");
    }
  };

  useEffect(() => {
    featchALlOrders();
  }, []);

  return (
    <div className="orders add">
      <h3>Order page</h3>
      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " X " + item.quantity;
                    } else {
                      return item.name + " X " + item.quantity + " , ";
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.fristName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>${order.amount}</p>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
