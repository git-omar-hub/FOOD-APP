import express from "express";
import adminAuth from "../middlewares/adminAuth.js";
import { getStats } from "../controllers/dashboardController.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/stats", adminAuth, getStats);

export default dashboardRouter;
