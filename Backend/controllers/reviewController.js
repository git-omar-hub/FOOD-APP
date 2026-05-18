import reviewModel from "../models/reviewModel.js";

const addReview = async (req, res) => {
  try {
    const { foodId, rating, comment } = req.body;
    const userId = req.body.userId;
    const existing = await reviewModel.findOne({ userId, foodId });
    if (existing) {
      existing.rating = rating;
      existing.comment = comment || "";
      await existing.save();
      return res.json({ success: true, message: "Review updated" });
    }
    await new reviewModel({ userId, foodId, rating, comment }).save();
    res.json({ success: true, message: "Review added" });
  } catch (error) {
    res.json({ success: false, message: "Error adding review" });
  }
};

const getReviews = async (req, res) => {
  try {
    const { foodId } = req.body;
    const reviews = await reviewModel.find({ foodId });
    const avg = reviews.reduce((s, r) => s + r.rating, 0) / (reviews.length || 1);
    res.json({ success: true, data: reviews, average: Math.round(avg * 10) / 10, count: reviews.length });
  } catch (error) {
    res.json({ success: false, message: "Error fetching reviews" });
  }
};

export { addReview, getReviews };
