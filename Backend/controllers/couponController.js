import couponModel from "../models/couponModel.js";

const createCoupon = async (req, res) => {
  try {
    const coupon = new couponModel(req.body);
    await coupon.save();
    res.json({ success: true, message: "Coupon created", data: coupon });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error creating coupon" });
  }
};

const listCoupons = async (req, res) => {
  try {
    const coupons = await couponModel.find();
    res.json({ success: true, data: coupons });
  } catch (error) {
    res.json({ success: false, message: "Error fetching coupons" });
  }
};

const removeCoupon = async (req, res) => {
  try {
    await couponModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Coupon removed" });
  } catch (error) {
    res.json({ success: false, message: "Error removing coupon" });
  }
};

const applyCoupon = async (req, res) => {
  try {
    const { code, amount } = req.body;
    const coupon = await couponModel.findOne({ code: code.toUpperCase(), active: true });
    if (!coupon) {
      return res.json({ success: false, message: "Invalid coupon code" });
    }
    if (coupon.expiresAt && new Date() > coupon.expiresAt) {
      return res.json({ success: false, message: "Coupon has expired" });
    }
    if (amount < coupon.minAmount) {
      return res.json({ success: false, message: `Minimum amount $${coupon.minAmount} required` });
    }
    let discount = coupon.type === "percentage" ? Math.round(amount * coupon.discount / 100) : coupon.discount;
    if (discount > amount) discount = amount;

    res.json({ success: true, discount, message: `Coupon applied! You saved $${discount}` });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error applying coupon" });
  }
};

export { createCoupon, listCoupons, removeCoupon, applyCoupon };
