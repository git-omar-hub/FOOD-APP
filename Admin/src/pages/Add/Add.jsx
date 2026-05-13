import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { assets } from "../../assets/assets";
import FormField from "../../components/FormField/FormField";
import "./Add.css";

const foodSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  category: z.string().min(1, "Category is required"),
});

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navegate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "Salad",
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", +data.price);
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const res = await axios.post(`${url}/api/food/add`, formData);
      toast.success(`${data.name} added successfully`);
      reset();
      setImage(null);
      setPreview(null);
      navegate("/list");
    } catch {
      toast.error("Error adding the food");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={preview || assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            name="image"
            id="image"
            hidden
            accept="image/*"
          />
        </div>
        <div className="add-product-name">
          <FormField
            label="Product name"
            name="name"
            placeholder="Type here"
            register={register}
            error={errors.name}
          />
        </div>
        <div className="add-product-description">
          <FormField
            label="Product description"
            name="description"
            type="textarea"
            placeholder="Write content here"
            register={register}
            error={errors.description}
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              className="form-field__input"
              {...register("category")}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
            {errors.category && (
              <span className="form-field__error">{errors.category.message}</span>
            )}
          </div>
          <div className="add-price flex-col">
            <FormField
              label="Product price"
              name="price"
              type="number"
              placeholder="$20"
              register={register}
              error={errors.price}
            />
          </div>
        </div>
        <button type="submit" className="add-btn" disabled={isSubmitting}>
          {isSubmitting ? "ADDING..." : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default Add;
