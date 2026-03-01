import "./Navbar.css";

import React from "react";
import { assets } from "../../assets/assets";

const Navebar = () => {
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="" />
      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  );
};

export default Navebar;
