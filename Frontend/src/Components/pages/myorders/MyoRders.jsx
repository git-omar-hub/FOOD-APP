import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../../assets/assets";
import { toast } from "sonner";
import OrderTimeline from "../../OrderTimeline/OrderTimeline";
import Skeleton from "../../Skeleton/Skeleton";
import EmptyState from "../../EmptyState/EmptyState";
const MyoRders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { url, token } = useContext(StoreContext);

  const featchOrdes = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } },
      );
      if (res.data.success) {
        setData(res.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const cancelOrder = async (orderId) => {
    const res = await axios.post(url + "/api/order/cancel", { orderId }, { headers: { token } });
    if (res.data.success) { toast.success("Order cancelled"); featchOrdes(); }
    else toast.error(res.data.message);
  };

  useEffect(() => {
    if (token) featchOrdes();
  }, [token]); // eslint-disable-line

  if (loading) return <div className="my-orders"><h2>My Orders</h2><Skeleton type="order" count={3} /></div>;

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {data.length === 0 ? (
        <EmptyState icon="📦" title="No orders yet" message="Your orders will appear here once you place one" action={{ label: "Browse Food", onClick: () => window.location.href = "/" }} />
      ) : (
        <div className="container">
          {data.map((order, index) => {
            const canCancel = order.status !== "Delivered" && order.status !== "Cancelled";
            return (
              <div className="my-orders-order" key={index}>
                <img src={assets.parcel_icon} alt="" />
                <div className="my-orders-order__info">
                  <p>
                    {order.items.map((item, i) => {
                      if (i === order.items.length - 1) return item.name + " X " + item.quantity;
                      return item.name + " X " + item.quantity + ", ";
                    })}
                  </p>
                  <p>${order.amount}.00 — Items: {order.items.length}</p>
                  <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                </div>
                <div className="my-orders-order__actions">
                  <OrderTimeline status={order.status} />
                  {canCancel && <button className="cancel-btn" onClick={() => cancelOrder(order._id)}>Cancel</button>}
                  <button onClick={featchOrdes}>Refresh</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyoRders;
