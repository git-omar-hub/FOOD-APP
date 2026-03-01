import React from "react";
import Navebar from "./components/Navbar/Navebar";
import SideBar from "./components/SideBar/SideBar";
import { Route, Routes } from "react-router-dom";
import List from "./pages/List/List";
import Add from "./pages/Add/Add";
import Order from "./pages/Orders/Order";
import { ToastContainer } from "react-toastify";

const App = () => {
  const url = "https://food-app-eta-lemon.vercel.app";
  return (
    <div>
      <ToastContainer />
      <Navebar />
      <hr />
      <div className="app-content">
        <SideBar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/order" element={<Order url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
