import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { toggleFavorite, listFavorites } from "../controllers/favoriteController.js";

const favoriteRouter = express.Router();

favoriteRouter.post("/toggle", authMiddleware, toggleFavorite);
favoriteRouter.post("/list", authMiddleware, listFavorites);

export default favoriteRouter;
