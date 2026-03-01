import foodModel from "../models/foodModel.js";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";
// add food item

// const addFood = async (req, res, next) => {
//   let image_filename = `${req.file.filename}`;
//   const food = new foodModel({
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price,
//     image: image_filename,
//     category: req.body.category,
//   });
//   try {
//     await food.save();
//     res.json({ success: true, message: "Food added" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };


const addFood = async (req, res, next) => {
  try {
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image_public_id: req.file.filename,
      image: req.file.path, // بنخزن اللينك
      category: req.body.category,
    });

    await food.save();

    res.json({ success: true, message: "Food added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find();
    res.json({ success: true, message: "Food List", data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food item
// const removeFood = async (req, res) => {
//   try {
//     const food = await foodModel.findById(req.body.id);
//     fs.unlink(`uploads/${food.image}`, () => {});
//     const deleted = await foodModel.findByIdAndDelete(req.body.id);
//     res.json({ success: true, message: "Food removed", data: deleted });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };




const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }
    await cloudinary.uploader.destroy(food.image_public_id);
    const deleted = await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed", data: deleted });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
