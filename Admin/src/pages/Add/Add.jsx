import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import "./Add.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const navegate = useNavigate();
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandelar = async (event) => {
    event.preventDefault();
    if (!data.name || !data.description || !data.price || !image) {
      alert("Please fill in all fields and upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", +data.price);
    formData.append("category", data.category);
    formData.append("image", image);

    // Send a POST request
    axios({
      method: "post",
      url: `${url}/api/food/add`,
      data: formData,
    })
      .then((res) => {
        toast.success(`${data.name} added successfuly`);
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(false);
        navegate("/list");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error adding the food");
      });
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandelar}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
              console.log(e.target.files);
              console.log(image);
            }}
            type="file"
            name="image"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flec-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            id="name"
            placeholder="Type her"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            name="description"
            value={data.description}
            rows="6"
            placeholder="Write content here"
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              <option value="Saled">Saled</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
