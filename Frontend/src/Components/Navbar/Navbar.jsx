import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "./../context/StoreContext";
import { useTheme } from "../context/ThemeContext";
import { toast } from "sonner";
import Search from "../Search/Search";
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const { dark, toggle } = useTheme();
  const navegate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navegate("/");
    toast("Signed out");
  };

  const handleSearch = (query) => {
    if (query) navegate(`/?search=${query}`);
  };

  return (
    <div className="navbar">
      <Link to="/">
        {" "}
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menue">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >home</Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menue")}
          className={menu === "menue" ? "active" : ""}
        >menu</a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >mobile-app</a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >Contact us</a>
      </ul>
      <div className="navbar-right">
        <Search onSearch={handleSearch} />
        <button className="theme-toggle" onClick={toggle}>{dark ? "☀️" : "🌙"}</button>
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          {getTotalCartAmount() === 0 ? <></> : <div className="dot"></div>}
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navegate("/profile")}>
                <img src={assets.profile_icon} alt="" />
                <p>Profile</p>
              </li>
              <li onClick={() => navegate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logOut}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
