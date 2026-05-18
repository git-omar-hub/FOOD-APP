import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};
const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    return res.json({
      success: true,
      message: "User Cart Items",
      data: userData.cartData,
    });
  } catch (error) {
    return res.json({ success: false, message: "Error" });
  }
};

const mergeCart = async (req, res) => {
  try {
    const { items } = req.body;
    const userData = await userModel.findById(req.body.userId);
    const serverCart = userData.cartData || {};
    if (items && typeof items === "object") {
      for (const [itemId, qty] of Object.entries(items)) {
        if (qty > 0) {
          serverCart[itemId] = Math.max(serverCart[itemId] || 0, qty);
        }
      }
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: serverCart });
    res.json({ success: true, data: serverCart });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error merging cart" });
  }
};

export { addToCart, removeFromCart, getCart, mergeCart };
