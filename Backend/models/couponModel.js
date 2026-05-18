import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  discount: { type: Number, required: true },
  type: { type: String, enum: ["percentage", "fixed"], default: "percentage" },
  minAmount: { type: Number, default: 0 },
  maxUses: { type: Number, default: 0 },
  usedCount: { type: Number, default: 0 },
  expiresAt: { type: Date },
  active: { type: Boolean, default: true },
}, { timestamps: true });

const couponModel = mongoose.model("coupon", couponSchema);
export default couponModel;
