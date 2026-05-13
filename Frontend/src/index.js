import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"
import StoreContextProvider from './Components/context/StoreContext';
import { Toaster } from "sonner";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <StoreContextProvider>
    <App />
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
  </StoreContextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
