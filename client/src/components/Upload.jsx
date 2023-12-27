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
  const handleSave = async () => {
    try {
      const response = await publicAxios.put(
        `/api/v1/products/${newProduct.product_id}`,
        newProduct
      );

      setProducts(response.data.products);
    } catch (error) {}
  };
  const [choose, setChoose] = useState("category");
  const handleEdit = async (item) => {
    const response = await publicAxios.get(
      `/api/v1/editProduct/${item.product_id}`
    );
    setChoose(response.data.data.name_category);
    setNewProduct(response.data.data);
  };

  return (
    <>
      <h1>Upload</h1>
      <div className="w-full flex">
        <div className="w-1/3">
          <input type="file" onChange={handleAddMedia} />
          <img src={preview} alt="" width={100} />
          <select name="category_id" onChange={handleGetValue}>
            <option value="">{choose}</option>
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
            value={newProduct.name_product}
          />
          <br />
          <label htmlFor="">Price:</label>
          <input
            type="text"
            className="border border-sky-500"
            name="price"
            onChange={handleGetValue}
            value={newProduct.price}
          />
          <br />
          <label htmlFor="">Description:</label>
          <input
            type="text"
            className="border border-sky-500"
            name="description"
            onChange={handleGetValue}
            value={newProduct.description}
          />
          <br />
          <label htmlFor="">Stock:</label>
          <input
            type="text"
            className="border border-sky-500"
            name="stock"
            onChange={handleGetValue}
            value={newProduct.stock}
          />
          <br />

          <button onClick={newProduct.product_id ? handleSave : handleAdd}>
            Add
          </button>
        </div>
        <div className="w-2/3">
          <table></table>
          {products.map((item, index) => (
            <div key={index} className="flex">
              <img src={item.image} alt="" width={100} />
              <p>{item.name_product}</p>
              <p>{item.price}</p>
              <p>{item.description}</p>
              <p>{item.category_id}</p>
              <p>{item.stock}</p>
              <button className="px-[20px]" onClick={() => handleEdit(item)}>
                sua
              </button>
              <button>xoa</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
