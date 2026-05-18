import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import validator from "validator";

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }
    bcrypt.compare(password, user.password).then((authUser) => {
      if (!authUser) {
        return res.json({ success: false, message: "incorrect Password" });
      }
      const token = createToken(user._id);
      return res.json({
        success: true,
        message: "logined successfuly",
        token: token,
      });
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

export { loginUser, registerUser };
