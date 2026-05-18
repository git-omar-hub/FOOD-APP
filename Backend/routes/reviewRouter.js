import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { addReview, getReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/add", authMiddleware, addReview);
reviewRouter.post("/get", getReviews);

export default reviewRouter;
