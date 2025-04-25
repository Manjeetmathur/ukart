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
       const { cart } = useContext(context)
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
              <div className="my-6 px-4">
                     <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 max-w-sm mx-auto">
                            {/* Product Image */}
                            <Link to={`/product/${post?._id}`}>
                                   <div className="relative">
                                          <img
                                                 src={post?.postImage || ""}
                                                 alt={post?.postTitle}
                                                 className="w-full h-56 object-contain  transition-transform duration-300 "
                                          />
                                          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                                 New
                                          </div>
                                   </div>
                            </Link>

                            {/* Product Details */}
                            <div className="p-4 bg-blue-300">
                                   <h2 className="text-lg font-semibold text-gray-800 truncate">
                                          {post?.postTitle}
                                   </h2>
                                   <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                          {post?.postContent.slice(0, 80)}...
                                   </p>

                                   {/* Price and Quantity */}
                                   <div className="mt-3 flex items-center justify-between">
                                          <span className="text-xl font-bold text-gray-900">
                                                 ₹ {post?.postPrice?.toFixed(2) || "N/A"}
                                          </span>
                                          <div className="flex items-center bg-gray-100 rounded-full  py-1">
                                                 <button
                                                        onClick={handleDecrement}
                                                        className="text-gray-600 hover:text-blue-600 p-1 disabled:opacity-50"
                                                        disabled={quantity <= 1}
                                                 >
                                                        <FiMinus />
                                                 </button>
                                                 <span className="text-gray-800 font-medium mx-1 w-3 text-center">
                                                        {quantity}
                                                 </span>
                                                 <button
                                                        onClick={handleIncrement}
                                                        className="text-gray-600 hover:text-blue-600 p-1"
                                                 >
                                                        <FiPlus />
                                                 </button>
                                          </div>
                                   </div>

                                   {/* Buttons */}
                                   <div className="mt-4 grid grid-cols-2 gap-3">
                                          <button
                                                 className="bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-all duration-300 text-sm font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"

                                          >
                                                 <Link to={`/buy/${post?._id}`}> Buy Now</Link>
                                          </button>
                                          <button
                                                 onClick={addToCart}
                                                 className="bg-gray-800 text-white py-2 rounded-full hover:bg-gray-900 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-1 disabled:bg-gray-600 disabled:cursor-not-allowed"
                                                 disabled={cloading}
                                          >
                                                 {cloading ? "Adding..." : (
                                                        <>
                                                               <IoCart /> Cart
                                                        </>
                                                 )}
                                          </button>
                                   </div>
                            </div>
                     </div>
              </div>
       );
};

export default HomeLower;