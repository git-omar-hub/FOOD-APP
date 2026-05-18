import orderModel from "../models/orderModel.js";
import userModel from "./../models/userModel.js";
import couponModel from "../models/couponModel.js";
import Stripe from "stripe";

const randomNextMinutes = () => (Math.floor(Math.random() * 7) + 2) * 60 * 1000;

const statusFlow = ["Food Processing", "Out for delivery", "Delivered"];

const advanceOrder = async (order) => {
  if (!order.nextStatusAt || Date.now() < order.nextStatusAt) return order;
  if (order.status === "Delivered" || order.status === "Cancelled") return order;

  const idx = statusFlow.indexOf(order.status);
  if (idx < 0 || idx >= statusFlow.length - 1) return order;

  order.status = statusFlow[idx + 1];
  order.nextStatusAt = Date.now() + randomNextMinutes();
  if (order.status === "Delivered") order.nextStatusAt = null;
  await order.save();
  return order;
};

const placeOrder = async (req, res) => {
  const stripe = new Stripe(process.env.STRIB_SECRET_KEY);
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

  try {
    const { items, address, couponCode } = req.body;

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = 2;
    let discount = 0;

    if (couponCode) {
      const coupon = await couponModel.findOne({ code: couponCode.toUpperCase(), active: true });
      if (!coupon) {
        return res.json({ success: false, message: "Invalid coupon code" });
      }
      if (coupon.expiresAt && new Date() > coupon.expiresAt) {
        return res.json({ success: false, message: "Coupon has expired" });
      }
      if (subtotal + deliveryFee < coupon.minAmount) {
        return res.json({ success: false, message: `Minimum amount $${coupon.minAmount} required` });
      }
      discount = coupon.type === "percentage"
        ? Math.round((subtotal + deliveryFee) * coupon.discount / 100)
        : coupon.discount;
      if (discount > subtotal + deliveryFee) discount = subtotal + deliveryFee;
    }

    const amount = Math.max(0, subtotal + deliveryFee - discount);

    const newOrder = new orderModel({
      userId: req.body.userId,
      items,
      amount,
      address,
      couponCode: couponCode || "",
      discount,
      nextStatusAt: Date.now() + randomNextMinutes(),
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "egp",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "egp",
        product_data: { name: "Delivery charges" },
        unit_amount: deliveryFee * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url, discount });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error placing order", error: error.message });
  }
};

const verifyOrder = async (req, res) => {
  const { success, orderId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const userOrder = async (req, res) => {
  try {
    let orders = await orderModel.find({ userId: req.body.userId });
    orders = await Promise.all(orders.map(advanceOrder));
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const listOrders = async (req, res) => {
  try {
    let orders = await orderModel.find();
    orders = await Promise.all(orders.map(advanceOrder));
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: "Error" });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await orderModel.findOne({ _id: req.body.orderId, userId: req.body.userId });
    if (!order) return res.json({ success: false, message: "Order not found" });
    if (order.status === "Delivered") return res.json({ success: false, message: "Cannot cancel delivered order" });
    order.status = "Cancelled";
    await order.save();
    res.json({ success: true, message: "Order cancelled" });
  } catch (error) {
    res.json({ success: false, message: "Error cancelling order" });
  }
};

export { placeOrder, verifyOrder, userOrder, listOrders, updateStatus, cancelOrder };

