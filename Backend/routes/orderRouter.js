import express from "express";
import authMiddleware from "./../middlewares/auth.js";
import adminAuth from "./../middlewares/adminAuth.js";
import {
  placeOrder,
  verifyOrder,
  userOrder,
  listOrders,
  updateStatus,
  cancelOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.get("/userorders", authMiddleware, userOrder);
orderRouter.get("/list", adminAuth, listOrders);
orderRouter.post("/status", adminAuth, updateStatus);
orderRouter.post("/cancel", authMiddleware, cancelOrder);

export default orderRouter;
