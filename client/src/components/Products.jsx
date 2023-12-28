import React, { useEffect, useState } from "react";
import publicAxios from "../config/publicAxios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [renderProducts, setRenderProducts] = useState([]);
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
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
  const handleProducts = (category_id) => {
    setRenderProducts(
      products.filter((product) => product.category_id === category_id)
    );
  };
  const handleAddToCart = async (product_id) => {
    try {
      const cart = {
        user_id: userLogin.user_id,
        product_id,
      };
      const response = await publicAxios.post("/api/v1/cart", cart);
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>Trang San pham</h1>
      <div>
        {categories.map((category) => (
          <div
            key={category.category_id}
            onClick={() => handleProducts(category.category_id)}
          >
            {category.name_category}
          </div>
        ))}
      </div>
      <div className="flex justify-evenly">
        {renderProducts.map((product) => (
          <div key={product.product_id}>
            <p>{product.name_product}</p>
            <img src={product.image} alt="" width={100} />
            <button onClick={() => handleAddToCart(product.product_id)}>
              Mua
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
