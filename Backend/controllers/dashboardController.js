import orderModel from "../models/orderModel.js";
import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";

const getStats = async (req, res) => {
  try {
    const totalOrders = await orderModel.countDocuments();
    const totalFoods = await foodModel.countDocuments();
    const totalUsers = await userModel.countDocuments();
    const orders = await orderModel.find();
    const totalRevenue = orders.reduce((s, o) => s + (o.payment ? o.amount : 0), 0);
    const pendingOrders = orders.filter(o => o.status !== "Delivered").length;
    res.json({ success: true, data: { totalOrders, totalFoods, totalUsers, totalRevenue, pendingOrders } });
  } catch (error) {
    res.json({ success: false, message: "Error fetching stats" });
  }
};

export { getStats };
