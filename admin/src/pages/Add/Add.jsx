import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets.js";
import axios from "axios";
import { ToastContainer} from "react-toastify"

function Add() {
  const url = "http://localhost:4000";
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });

  const handleChange = (event) => {
    setData((prevData) => {
      return { ...prevData, [event.target.name]: [event.target.value] };
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const foodData = new FormData();
    foodData.append("name", data.name);
    foodData.append("description", data.description);
    foodData.append("category", data.category);
    foodData.append("price", Number(data.price));
    foodData.append("image", image);

    let response =await axios.post(`${url}/food/newfood`,foodData);
    if(!response.data.success){
      return assets.ErrorMsg(response.data.message);
    }
    assets.successMsg(response.data.message)
    //reset the form feilds
    setData({
      name: "",
      description: "",
      category: "Salad",
      price: "",
    })
    setImage(false);
  };

  return (
    <div className="add">
      <form onSubmit={handleSubmit}>
        <div className="upload-img">
          <p>Upload Image </p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            id="image"
            name="image"
            hidden
            required
          />
        </div>

        <div className="prod-name">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Enter the Food Name"
            required
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div className="prod-desc">
          <p>Product Description</p>
          <textarea
            name="description"
            placeholder="Enter Food Description"
            required
            value={data.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="prod-price-category">
          <div className="prod-category">
            <p>Product Category</p>
            <select
              name="category"
              id=""
              placeholder="Select Category"
              value={data.category}
              onChange={handleChange}
              required
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="prod-price">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              placeholder="Enter the Price"
              required
              value={data.price}
              onChange={handleChange}
            />
          </div>
        </div>

        <button>ADD</button>
      </form>
    <ToastContainer/>
    </div>
  );
}

export default Add;
