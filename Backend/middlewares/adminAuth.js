import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const adminAuth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not authorized" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRT);
    const user = await userModel.findById(tokenDecode.id);
    if (!user || !user.isAdmin) {
      return res.json({ success: false, message: "Admin access required" });
    }
    req.body.userId = tokenDecode.id;
    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Invalid token" });
  }
};

export default adminAuth;
