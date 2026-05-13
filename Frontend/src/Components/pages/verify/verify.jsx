import React, { useContext, useEffect } from "react";
import "./verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "sonner";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navegate = useNavigate();
  const verifyPayment = async () => {
    try {
      const res = await axios.post(url + "/api/order/verify", {
        success,
        orderId,
      });
      if (res.data.success) {
        toast.success("Payment successful");
        navegate("/myorders");
      } else {
        toast.error("Payment verification failed");
        navegate("/");
      }
    } catch {
      toast.error("Something went wrong");
      navegate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
