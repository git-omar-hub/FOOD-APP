import express from "express";
import { createCategory, listCategories, removeCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/list", listCategories);
categoryRouter.post("/add", createCategory);
categoryRouter.post("/remove", removeCategory);

export default categoryRouter;
