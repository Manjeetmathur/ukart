import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { url } from "../bacxkendUrl/BackendUrl";
import { useSelector } from "react-redux";
import { context } from "../../Context/Context";
import HomeLower from "../HomeMiddle/HomeLower";

const BuyPage = () => {
       const { id } = useParams();
       const navigate = useNavigate();
       const [product, setProduct] = useState(null);
       const [loading, setLoading] = useState(true);
       const [quantity, setQuantity] = useState(1);
       const { userInfo } = useSelector((state) => state.auth);
       const [bloading, setbLoading] = useState(false);
       const [paymentMethod, setPaymentMethod] = useState("cod");
       const { getUserDetails } = useContext(context)
       useEffect(() => {
              const fetchProduct = async () => {
                     try {
                            const { data } = await axios.get(`${url}/post/get-post-by-id/${id}`, {
                                   withCredentials: true,
                            });
                            if (data.success) {
                                   setProduct(data.post);
                            } else {
                                   toast.error("Product not found!");
                            }
                     } catch (error) {
                            toast.error("Failed to load product!");
                     } finally {
                            setLoading(false);
                     }
              };

              fetchProduct();
       }, [id]);

       const orderItem = async () => {
              try {
                     if (userInfo?.address?.length > 4) {
                            setbLoading(true);
                            const response = await axios.post(
                                   `${url}/post/order-item`,
                                   { postId: product?._id, postPrice: product.postPrice, quantity, paymentMethod },
                                   {
                                          withCredentials: true,
                                          headers: { "content-type": "application/json" },
                                   }
                            );

                            if (response.data.success) {
                                   toast.success("Order placed successfully!");
                                   getUserDetails()
                                   navigate("/order-page");
                            } else {
                                   toast.error("Something went wrong");
                            }
                     } else {
                            throw new Error("Please add Address");
                     }
              } catch (error) {
                     toast.error(error.message);
              } finally {
                     setbLoading(false);
              }
       };

       if (loading) return <p className="text-center text-gray-600 py-16">Loading...</p>;
       if (!product) return <p className="text-center text-red-500 py-16">Product not found!</p>;

       return (
              <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-400 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                     {/* Subtle Overlay Effect */}
                     <div className="absolute inset-0 bg-black opacity-5 pointer-events-none"></div>

                     <div className="container mx-auto p-6 bg-white shadow-2xl rounded-xl max-w-2xl w-full space-y-8 transform hover:shadow-3xl transition-shadow duration-300 text-center relative z-10">
                            {/* Subtle Glow Effect */}
                            <div className="absolute inset-0 -z-10 bg-purple-500/20 blur-3xl rounded-xl scale-105 animate-pulse-slow"></div>

                            <h1 className="text-3xl font-bold text-gray-800 drop-shadow-sm">{product.postTitle}</h1>

                            <img
                                   src={product.postImage}
                                   alt={product.postTitle}
                                   className="w-64 mx-auto max-h-96 object-cover rounded-lg shadow-md"
                            />

                            <p className="text-lg text-gray-700">{product.postContent}</p>
                            <p className="text-xl font-semibold text-red-500">Price: ₹{product.postPrice}</p>

                            {/* Quantity Selector */}
                            <div className="flex justify-center items-center my-4">
                                   <button
                                          onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-1 px-4 rounded-l-lg transition-all duration-300"
                                   >
                                          -
                                   </button>
                                   <input
                                          type="text"
                                          value={quantity}
                                          readOnly
                                          className="w-12 text-center text-gray-800 font-bold bg-gray-100 py-2 border-none"
                                   />
                                   <button
                                          onClick={() => setQuantity((prev) => prev + 1)}
                                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-r-lg transition-all duration-300"
                                   >
                                          +
                                   </button>
                            </div>

                            {/* Payment Options */}
                            <div className="flex flex-col items-center my-4 space-y-4">
                                   {userInfo?.address?.length < 4 && (
                                          <Link
                                                 to={`/profile/${userInfo._id}`} // Fixed typo from userInfo._id/
                                                 className="text-lg border-2 p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
                                          >
                                                 Add Address
                                          </Link>
                                   )}
                                   <div className="flex items-center space-x-3">
                                          <p className="text-lg font-semibold text-gray-700">Payment Mode:</p>
                                          <span className="text-lg font-semibold text-gray-800">Cash on Delivery</span>
                                   </div>
                            </div>

                            <button
                                   onClick={orderItem}
                                   disabled={bloading}
                                   className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:bg-purple-400 disabled:cursor-not-allowed"
                            >
                                   {bloading ? "Processing..." : "Confirm Order"}
                            </button>
                     </div>

                     {/* Animated Accents */}
                     <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-200/30 rounded-full blur-2xl animate-float"></div>
                     <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl animate-float-slow"></div>
              </div>
       );
};

export default BuyPage;