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



const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: "No image uploaded" });
    }

    // نحول upload_stream لـ Promise
    const uploadToCloudinary = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "foods",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

    const result = await uploadToCloudinary();

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: result.secure_url,
      image_public_id: result.public_id,
      category: req.body.category,
    });

    await food.save();

    res.json({ success: true, message: "Food added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding food" });
  }
};


// const addFood = async (req, res, next) => {
//   try {
//     const food = new foodModel({
//       name: req.body.name,
//       description: req.body.description,
//       price: req.body.price,
//       image_public_id: req.file.filename,
//       image: req.file.path, // بنخزن اللينك
//       category: req.body.category,
//     });

//     await food.save();

//     res.json({ success: true, message: "Food added" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

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
