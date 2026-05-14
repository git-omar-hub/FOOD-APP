import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { addAddress, listAddresses, removeAddress } from "../controllers/addressController.js";

const addressRouter = express.Router();

addressRouter.post("/add", authMiddleware, addAddress);
addressRouter.post("/list", authMiddleware, listAddresses);
addressRouter.post("/remove", authMiddleware, removeAddress);

export default addressRouter;
