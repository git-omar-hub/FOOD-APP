import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";
import adminAuth from "../middlewares/adminAuth.js";

const foodRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

foodRouter.post("/add", adminAuth, upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", adminAuth, removeFood);

export default foodRouter;

