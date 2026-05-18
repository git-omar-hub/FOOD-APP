import express from "express";
import adminAuth from "../middlewares/adminAuth.js";
import { createCategory, listCategories, removeCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/list", listCategories);
categoryRouter.post("/add", adminAuth, createCategory);
categoryRouter.post("/remove", adminAuth, removeCategory);

export default categoryRouter;
