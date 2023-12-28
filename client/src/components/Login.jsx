import axios from "axios";
import React, { useState } from "react";

export default function LoginDemo() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleGetValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    // Xử lý đăng nhập
    try {
      const response = await axios.post(
        "http://localhost:7700/api/auth/login",
        user
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userLogin", JSON.stringify(response.data.user));
      alert(response.data.message);
      window.location.href = "/products";
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <div className="max-w-sm mx-auto">
        <h2 className="text-2xl mb-6">Login</h2>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleLogin}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleGetValue}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleGetValue}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
