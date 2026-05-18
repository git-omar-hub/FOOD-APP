import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: "food", required: true },
}, { timestamps: true });

favoriteSchema.index({ userId: 1, foodId: 1 }, { unique: true });

const favoriteModel = mongoose.model("favorite", favoriteSchema);
export default favoriteModel;
