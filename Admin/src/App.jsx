import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import SideBar from "./components/SideBar/SideBar";
import { Route, Routes } from "react-router-dom";
import List from "./pages/List/List";
import Add from "./pages/Add/Add";
import Order from "./pages/Orders/Order";
import Dashboard from "./pages/Dashboard/Dashboard";
import Categories from "./pages/Categories/Categories";
import Coupons from "./pages/Coupons/Coupons";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import { Toaster } from "sonner";

const App = () => {
  const url = "http://localhost:4000";
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken"));

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setAdminToken(null);
  };

  if (!adminToken) {
    return (
      <>
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
        <AdminLogin url={url} onLogin={() => setAdminToken(localStorage.getItem("adminToken"))} />
      </>
    );
  }

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
      <Navbar />
      <button className="logout-btn" onClick={handleLogout} style={{ position: "absolute", top: 10, right: 80, background: "none", border: "1px solid tomato", color: "tomato", borderRadius: 50, padding: "6px 16px", cursor: "pointer", fontSize: 13 }}>
        Logout
      </button>
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
