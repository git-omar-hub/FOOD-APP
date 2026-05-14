import React from "react";
import Navebar from "./components/Navbar/Navebar";
import SideBar from "./components/SideBar/SideBar";
import { Route, Routes } from "react-router-dom";
import List from "./pages/List/List";
import Add from "./pages/Add/Add";
import Order from "./pages/Orders/Order";
import Dashboard from "./pages/Dashboard/Dashboard";
import Categories from "./pages/Categories/Categories";
import Coupons from "./pages/Coupons/Coupons";
import { Toaster } from "sonner";

const App = () => {
  const url = "https://food-app-eta-lemon.vercel.app";
  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "100px",
            padding: "10px 20px",
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(12px)",
            color: "#fff",
            fontSize: "14px",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          },
          success: { icon: "✓" },
          error: { icon: "✗" },
        }}
      />
      <Navebar />
      <hr />
      <div className="app-content">
        <SideBar />
        <Routes>
          <Route path="/" element={<Dashboard url={url} />} />
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/order" element={<Order url={url} />} />
          <Route path="/categories" element={<Categories url={url} />} />
          <Route path="/coupons" element={<Coupons url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
