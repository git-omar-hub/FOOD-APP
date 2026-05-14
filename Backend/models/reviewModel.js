import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: "food", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: "" },
}, { timestamps: true });

reviewSchema.index({ userId: 1, foodId: 1 }, { unique: true });

const reviewModel = mongoose.model("review", reviewSchema);
export default reviewModel;
