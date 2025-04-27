import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../bacxkendUrl/BackendUrl";
import { useSelector } from "react-redux";
import { IoCart } from "react-icons/io5";
import { FiMinus, FiPlus } from "react-icons/fi";
import { context } from "../../Context/Context";

const HomeLower = ({ post }) => {
  const [cloading, setcLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { status } = useSelector((st) => st.auth);
  const { cart } = useContext(context);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
    try {
      if (!status) throw new Error("User is not logged in");
      setcLoading(true);
      const data = await axios.post(
        `${url}/post/add-cart`,
        { postId: post?._id },
        {
          withCredentials: true,
          withXSRFToken: true,
          headers: { "content-type": "application/json" },
        }
      );
      const res = data.data;

      if (res.success) {
        toast.success(res.message);
        cart();
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
    <div className="my-6 px-4">
      <div className="bg-white/90 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 max-w-sm mx-auto animate-slideUp">
        {/* Product Image */}
        <Link to={`/product/${post?._id}`}>
          <div className="relative group">
            <img
              src={post?.postImage || "https://via.placeholder.com/200"}
              alt={post?.postTitle}
              className="w-full h-56 object-contain rounded-t-xl transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 glassmorphism opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="floating-badge absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
              {post?.stock === 0 ? "Sold Out" : "New"}
            </div>
          </div>
        </Link>

        {/* Product Details */}
        <div className="p-4 bg-gradient-to-r from-purple-200 to-pink-200 rounded-b-xl">
          <h2 className="text-lg font-semibold text-purple-800 truncate">
            {post?.postTitle || "Product Name"}
          </h2>
          <p className="text-sm text-purple-600 mt-1 line-clamp-2">
            {post?.postContent?.slice(0, 80) || "No description available"}...
          </p>

          {/* Price and Quantity */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xl font-bold text-purple-900">
              ₹ {post?.postPrice?.toFixed(2) || "N/A"}
            </span>
            <div className="flex items-center bg-white/80 rounded-full py-1 px-2">
              <button
                onClick={handleDecrement}
                className="text-purple-600 hover:text-pink-600 p-1 disabled:opacity-50"
                disabled={quantity <= 1}
              >
                <FiMinus />
              </button>
              <span className="text-purple-800 font-medium mx-2 w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="text-purple-600 hover:text-pink-600 p-1"
              >
                <FiPlus />
              </button>
            </div>
          </div>

          {/* Buttons */}
          {post?.stock === 0 ? (
            <p className="mt-4 bg-red-500 text-white py-2 rounded-full text-sm font-medium text-center glow-button">
              Sold Out
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-full glow-button transition-all duration-300 text-sm font-medium disabled:bg-purple-400 disabled:cursor-not-allowed">
                <Link to={`/buy/${post?._id}`}>Buy Now</Link>
              </button>
              <button
                onClick={addToCart}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-full glow-button transition-all duration-300 text-sm font-medium flex items-center justify-center gap-1 disabled:bg-blue-400 disabled:cursor-not-allowed"
                disabled={cloading}
              >
                {cloading ? (
                  "Adding..."
                ) : (
                  <>
                    <IoCart /> Cart
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeLower;