import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import validator from "validator";

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const authUser = await bcrypt.compare(password, user.password);
    if (!authUser) {
      return res.json({ success: false, message: "Incorrect password" });
    }
    const token = createToken(user._id);
    return res.json({
      success: true,
      message: "Logged in successfully",
      token,
      isAdmin: user.isAdmin || false,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Failed to login" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRT);
};

// register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "user already exists" });
    }
    // validating email and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter strong password " });
    }
    // hashing use password
    const hasedPassword = await bcrypt.hash(password, 10);
    // new user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hasedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    return res.json({
      success: true,
      message: "Success registration",
      token: token,
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error registration",
      err: error,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId).select("-password");
    res.json({ success: true, data: user });
  } catch (error) {
    res.json({ success: false, message: "Error fetching profile" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await userModel.findByIdAndUpdate(req.body.userId, { name }, { new: true }).select("-password");
    res.json({ success: true, message: "Profile updated", data: user });
  } catch (error) {
    res.json({ success: false, message: "Error updating profile" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await userModel.findById(req.body.userId);
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.json({ success: false, message: "Current password is incorrect" });
    if (newPassword.length < 8) return res.json({ success: false, message: "Password must be at least 8 characters" });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ success: true, message: "Password changed" });
  } catch (error) {
    res.json({ success: false, message: "Error changing password" });
  }
};

export { loginUser, registerUser, getProfile, updateProfile, changePassword };
