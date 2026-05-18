import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Cart from "./Components/pages/Cart/Cart";
import PlaceOrder from "./Components/pages/PlaceOrder/PlaceOrder";
import Home from "./Components/pages/home/home";
import Footer from "./Components/Footer/Footer";
import LoginPopup from "./Components/loginPopup/LoginPopup.jsx";
import Verify from "./Components/pages/verify/verify.jsx";
import MyoRders from "./Components/pages/myorders/MyoRders.jsx";
const App = () => {
  const [showLogin,setShowLogin]=useState(false)
  return (
    <>
    { showLogin? <LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyoRders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
