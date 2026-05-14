import express from "express";
import { loginUser, registerUser, getProfile, updateProfile, changePassword } from "../controllers/userController.js";
import authMiddleware from "../middlewares/auth.js";

const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/profile", authMiddleware, getProfile);
userRouter.post("/update", authMiddleware, updateProfile);
userRouter.post("/change-password", authMiddleware, changePassword);
export default userRouter;
