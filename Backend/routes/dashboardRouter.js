import express from "express";
import { getStats } from "../controllers/dashboardController.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/stats", getStats);

export default dashboardRouter;
