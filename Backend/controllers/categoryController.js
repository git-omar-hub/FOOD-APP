import categoryModel from "../models/categoryModel.js";

const createCategory = async (req, res) => {
  try {
    const category = new categoryModel({ name: req.body.name });
    await category.save();
    res.json({ success: true, message: "Category created", data: category });
  } catch (error) {
    res.json({ success: false, message: "Error creating category" });
  }
};

const listCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.json({ success: false, message: "Error fetching categories" });
  }
};

const removeCategory = async (req, res) => {
  try {
    await categoryModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Category removed" });
  } catch (error) {
    res.json({ success: false, message: "Error removing category" });
  }
};

export { createCategory, listCategories, removeCategory };
