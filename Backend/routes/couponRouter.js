import express from "express";
import adminAuth from "../middlewares/adminAuth.js";
import { createCoupon, listCoupons, removeCoupon, applyCoupon } from "../controllers/couponController.js";

const couponRouter = express.Router();

couponRouter.post("/apply", applyCoupon);
couponRouter.get("/list", adminAuth, listCoupons);
couponRouter.post("/add", adminAuth, createCoupon);
couponRouter.post("/remove", adminAuth, removeCoupon);

export default couponRouter;
