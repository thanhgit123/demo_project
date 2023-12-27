import axios from "axios";
import React, { useEffect, useState } from "react";
import publicAxios from "../config/publicAxios";

export default function Upload() {
  const [preview, setPreview] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name_product: "",
    price: 0,
    image: null,
    description: "",
    category_id: 0,
    stock: 0,
  });
  const handleGetCategories = async () => {
    try {
      const response = await publicAxios.get("/api/v1/categories");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetProducts = async () => {
    try {
      const response = await publicAxios.get("/api/v1/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetCategories();
    handleGetProducts();
  }, []);
  const handleAddMedia = (event) => {
    setSelectedMedia(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };
  const handleGetValue = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedMedia);
      formData.append("upload_preset", "project");
      const [uploadMedia] = await Promise.all([
        axios.post(
          "https://api.cloudinary.com/v1_1/dzwap0buq/image/upload",
          formData
        ),
      ]);
      const media = uploadMedia.data.secure_url;
      const response = await publicAxios.post("/api/v1/products", {
        ...newProduct,
        image: media,
      });
      setProducts(response.data.products);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <h1>Upload</h1>
      <div>
        <input type="file" onChange={handleAddMedia} />
        <img src={preview} alt="" width={100} />
        <select name="category_id" onChange={handleGetValue}>
          <option value="">Chọn thể loại</option>
          {categories.map((category) => (
            <option value={category.category_id}>
              {category.name_category}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="">Name:</label>
        <input
          type="text"
          className="border border-sky-500"
          name="name_product"
          onChange={handleGetValue}
        />
        <br />
        <label htmlFor="">Price:</label>
        <input
          type="text"
          className="border border-sky-500"
          name="price"
          onChange={handleGetValue}
        />
        <br />
        <label htmlFor="">Description:</label>
        <input
          type="text"
          className="border border-sky-500"
          name="description"
          onChange={handleGetValue}
        />
        <br />
        <label htmlFor="">Stock:</label>
        <input
          type="text"
          className="border border-sky-500"
          name="stock"
          onChange={handleGetValue}
        />
        <br />

        <button onClick={handleAdd}>Add</button>
      </div>
    </>
  );
}
