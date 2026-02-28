import orderModel from "../models/orderModel.js";
import userModel from "./../models/userModel.js";
import axios from "axios";
import Stripe from "stripe";

// placing order for  frontend

const placeOrder = async (req, res) => {
  const stripe = new Stripe(process.env.STRIB_SECRET_KEY);

  const fronyEndUrl = "http://localhost:3000";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    const line_items = req.body.items.map((item, i) => ({
      price_data: {
        currency: "egp",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "egp",
        product_data: {
          name: "Delivery charges",
        },
        unit_amount: 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${fronyEndUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${fronyEndUrl}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ succes: false, message: "Error", session_url: session.url });
  }
};

const verifyOrder = async (req, res) => {
  const { success, orderId } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ succes: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ succes: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ succes: false, message: "Error" });
  }
};

const userOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ succes: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ succes: false, message: "Error" });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
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

export { placeOrder, verifyOrder, userOrder, listOrders, updateStatus };
