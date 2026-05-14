import express from "express";
import { createCoupon, listCoupons, removeCoupon, applyCoupon } from "../controllers/couponController.js";

const couponRouter = express.Router();

couponRouter.post("/apply", applyCoupon);
couponRouter.get("/list", listCoupons);
couponRouter.post("/add", createCoupon);
couponRouter.post("/remove", removeCoupon);

export default couponRouter;
