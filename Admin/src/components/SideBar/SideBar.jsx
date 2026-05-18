import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./SideBar.css";
import React from "react";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/" end className="sidebar-option">
          <p>📊</p>
          <p>Dashboard</p>
        </NavLink>
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/order" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
        <NavLink to="/categories" className="sidebar-option">
          <p>🏷️</p>
          <p>Categories</p>
        </NavLink>
        <NavLink to="/coupons" className="sidebar-option">
          <p>🎫</p>
          <p>Coupons</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
