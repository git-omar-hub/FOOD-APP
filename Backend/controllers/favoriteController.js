import favoriteModel from "../models/favoriteModel.js";
import foodModel from "../models/foodModel.js";

const toggleFavorite = async (req, res) => {
  try {
    const { foodId } = req.body;
    const userId = req.body.userId;
    const existing = await favoriteModel.findOne({ userId, foodId });
    if (existing) {
      await favoriteModel.findByIdAndDelete(existing._id);
      return res.json({ success: true, favorited: false, message: "Removed from favorites" });
    }
    await new favoriteModel({ userId, foodId }).save();
    res.json({ success: true, favorited: true, message: "Added to favorites" });
  } catch (error) {
    res.json({ success: false, message: "Error toggling favorite" });
  }
};

const listFavorites = async (req, res) => {
  try {
    const favorites = await favoriteModel.find({ userId: req.body.userId }).populate("foodId");
    res.json({ success: true, data: favorites.map(f => f.foodId) });
  } catch (error) {
    res.json({ success: false, message: "Error fetching favorites" });
  }
};

export { toggleFavorite, listFavorites };
