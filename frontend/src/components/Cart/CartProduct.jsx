import React, { useContext, useState } from "react";
import { url } from "../bacxkendUrl/BackendUrl";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { context } from "../../Context/Context";

const CartProduct = ({ product }) => {
  const postData = product.result[0];
  const navigate = useNavigate();
  const [bloading, setbLoading] = useState(false);
  const [cloading, setcLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
const {cart} = useContext(context)
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const buyItem = async () => {
    try {
      setbLoading(true);
      const data = await axios.post(
        `${url}/post/order-item`,
        { postId: postData?._id, postPrice: postData?.postPrice, quantity },
        {
          withCredentials: true,
          withXSRFToken: true,
          headers: { "content-type": "application/json" },
        }
      );
      const res = data.data;

      if (res.success) {
        toast.success("Order placed successfully!");
        navigate("/order-page");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setbLoading(false);
    }
  };

  const removeToCart = async () => {
    try {
      setcLoading(true);
      const data = await axios.post(
        `${url}/post/remove-cart`,
        { postId: postData?._id },
        {
          withCredentials: true,
          withXSRFToken: true,
          headers: { "content-type": "application/json" },
        }
      );
      const res = data.data;

      if (res.success) {
        toast.success(res.message);
        cart()
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setcLoading(false);
    }
  };

  return (
    <div
      className="p-3 sm:p-4 relative"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='25' cy='25' r='2'/%3E%3Ccircle cx='125' cy='125' r='2'/%3E%3Ccircle cx='75' cy='75' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: "cover, 150px 150px",
      }}
    >
      <div className="bg-gradient-to-br via-pink-200 from-purple-400 to-purple-400 rounded-xl shadow-lg overflow-hidden transform hover:shadow-2xl transition-all duration-300 w-full max-w-sm mx-auto relative z-10">
        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 -z-10 bg-blue-500/10 blur-3xl rounded-xl scale-105 animate-pulse-slow"></div>

        {/* Cart Item Content */}
        <div className="flex flex-col p-4">
          {/* Product Image */}
          <div className="flex-shrink-0 mb-4">
            <Link to={`/product/${postData?._id}`}>
              <img
                src={postData?.postImage || "https://via.placeholder.com/100"}
                alt={postData?.postTitle || "Product Image"}
                className="w-36 h-36 sm:w-40 sm:h-40 object-cover rounded-md shadow-md hover:scale-110 transition-transform duration-300 mx-auto"
              />
            </Link>
          </div>

          {/* Product Details */}
          <div className="flex flex-col items-center text-center space-y-3">
            <h3 className="text-lg sm:text-xl font-semibold  truncate drop-shadow-md text-wrap">
              {postData?.postTitle || "Product Title"}
            </h3>
            <p className="text-lg font-bold text-blue-900 drop-shadow-sm">
              Rs. {postData?.postPrice?.toFixed(2) || "N/A"}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center justify-center gap-2 bg-pink-600/50 rounded-full px-3 py-1.5 w-fit shadow-inner">
              <button
                onClick={handleDecrement}
                className="text-gray-300 hover:text-blue-400 text-xl font-bold disabled:opacity-50 transition-colors duration-300"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="text-white font-medium text-base w-8">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="text-gray-300 hover:text-blue-400 text-xl font-bold transition-colors duration-300"
              >
                +
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4 w-full"><Link to={`/buy/${postData?._id}`} className="w-full">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 text-sm sm:text-base font-medium disabled:bg-blue-400 disabled:cursor-not-allowed w-full sm:w-auto shadow-md hover:shadow-lg"
                // disabled={bloading}
              >
                Buy Now
              </button></Link>
              <button
                onClick={removeToCart}
                className="bg-red-400  px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 text-sm sm:text-base font-medium disabled:bg-gray-600 disabled:cursor-not-allowed w-full sm:w-auto shadow-md hover:shadow-lg"
                disabled={cloading}
              >
                {cloading ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;