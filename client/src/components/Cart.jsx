import React, { useEffect, useState } from "react";
import publicAxios from "../config/publicAxios";

export default function CartDemo() {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const handleGetCartByUser = async () => {
    try {
      const response = await publicAxios.get(
        `/api/v1/cart/${userLogin?.user_id}`
      );
      setCart(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetCartByUser();
  }, []);
  const handleGetTotal = () => {
    const result = cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotal(result);
  };
  useEffect(() => {
    handleGetTotal();
  }, [cart]);
  const handlePay = async () => {
    const order = {
      user_id: userLogin.user_id,
      purchase: total,
    };
    try {
      const response = await publicAxios.post("/api/v1/orders", order);
      await Promise.all(
        cart.map(async (item) => {
          const orderDetail = {
            order_id: response.data.orderId,
            product_id: item.product_id,
            quantity: item.quantity,
          };
          await publicAxios.post("/api/v1/order_details", orderDetail);
        })
      );
      await publicAxios.delete(`/api/v1/cart/${userLogin?.user_id}`);
      setCart([]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Cart</h1>
      <div>
        <h2>Render Cart</h2>
        <div className="flex justify-around">
          {cart.map((item) => (
            <div>
              <p>{item.name_product}</p>
              <p>{item.price}</p>
              <p>{item.quantity}</p>
              <div>
                <img src={item.image} alt="" width={100} />
              </div>
              <div>Thanh tien: {+item.price * item.quantity}</div>
            </div>
          ))}
        </div>
        <div>
          <button onClick={handlePay}>Thanh toan</button>
        </div>
      </div>
    </div>
  );
}
