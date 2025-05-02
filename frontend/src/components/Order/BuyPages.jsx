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
       const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
       const [selectedAddress, setSelectedAddress] = useState('');
       const [address, setaddress] = useState([]);

       const { getUserDetails } = useContext(context);

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
       const fetchAddress = async () => {
              try {
                     const { data } = await axios.get(`${url}/user/get-address/${selectedAddress}`, {
                            withCredentials: true,
                            withXSRFToken:true
                     });
                     console.log(data)
                     if (data.success) {
                            setaddress(data.add);
                     } else {
                            // toast.error("Product not found!");
                     }
              } catch (error) {
                     // toast.error("Failed to load product!");
              } finally {
                     setLoading(false);
              }
       };
       // useEffect(()=>{fetchAddress()},[selectedAddress])
       const orderItem = async () => {
              try {
                     if (!selectedAddress) {
                            throw new Error("Please select an address");
                     }

                     setbLoading(true);
                     const response = await axios.post(
                            `${url}/post/order-item`,
                            {
                                   postId: product?._id,
                                   postPrice: product?.postPrice,
                                   quantity,
                                   addressId: selectedAddress
                            },
                            {
                                   withCredentials: true,
                                   headers: { "content-type": "application/json" },
                            }
                     );

                     if (response.data.success) {
                            toast.success("Order placed successfully!");
                            getUserDetails();
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

       if (loading) return <p className="text-center text-gray-600 py-16">Loading...</p>;
       if (!product) return <p className="text-center text-red-500 py-16">Product not found!</p>;

       return (
              <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-400 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                     <div className="absolute inset-0 bg-black opacity-5 pointer-events-none"></div>

                     <div className="container mx-auto p-6 bg-white shadow-2xl rounded-xl max-w-2xl w-full space-y-8 transform hover:shadow-3xl transition-shadow duration-300 text-center relative z-10">
                            <div className="absolute inset-0 -z-10 bg-purple-500/20 blur-3xl rounded-xl scale-105 animate-pulse-slow"></div>

                            <h1 className="text-3xl font-bold text-gray-800 drop-shadow-sm">{product?.postTitle}</h1>

                            <img
                                   src={product?.postImage}
                                   alt={product?.postTitle}
                                   className="w-64 mx-auto max-h-96 object-cover rounded-lg shadow-md"
                            />

                            <p className="text-lg text-gray-700">{product?.postContent}</p>
                            <p className="text-xl font-semibold text-red-500">Price: ₹{product?.postPrice}</p>

                            {/* Quantity Selector */}
                            <div className="flex justify-center items-center my-4">
                                   <button
                                          onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-1 px-4 rounded-l-lg"
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
                                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-1 px-4 rounded-r-lg"
                                   >
                                          +
                                   </button>
                            </div>

                            {/* Payment Options */}
                            <div className="flex flex-col items-center my-4 space-y-4">
                                   {userInfo?.address && (
                                          <>
                                                 <button
                                                        onClick={() => setIsAddressModalOpen(true)}
                                                        className="text-lg border-2 p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                                                 >
                                                        Choose Address
                                                 </button>
                                                 {selectedAddress && (
                                                        <div className=""><p className="text-sm text-gray-700">Selected Address:</p>
                                                               <div className="text-gray-700 font-semibold text-lg  ">

                                                                      <p> <b>State</b> : <i>{address?.state || "Not provided"}</i></p>
                                                                      <p> <b>District</b> : <i> {address?.district || "Not provided"}</i> </p>
                                                                      <p> <b>Area</b> : <i>{address?.area || "Not provided"}</i> </p>
                                                                      <p> <b>Pincode</b> : <i>{address?.pincode || "Not provided"}</i> </p>
                                                                      </div>
                                                        </div>
                                                 )}
                                          </>
                                   )}
                                   <div className="flex items-center space-x-3">
                                          <p className="text-lg font-semibold text-gray-700">Payment Mode:</p>
                                          <span className="text-lg font-semibold text-gray-800">Cash on Delivery</span>
                                   </div>
                            </div>

                            <button
                                   onClick={orderItem}
                                   disabled={bloading}
                                   className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg disabled:bg-purple-400"
                            >
                                   {bloading ? "Processing..." : "Confirm Order"}
                            </button>
                     </div>

                     {/* Address Modal */}
                     {isAddressModalOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                                   <div className="bg-white p-6 rounded-xl max-w-lg w-full space-y-4 shadow-lg">
                                          <h2 className="text-xl font-semibold text-gray-800">Select Delivery Address</h2>
                                          <ul className="space-y-3 max-h-60 overflow-y-auto">
                                                 {userInfo?.address?.map((addr, idx) => (
                                                        <li key={idx}>
                                                               <button
                                                                      onClick={async () => {
                                                                             setSelectedAddress(addr?._id);
                                                                            await fetchAddress()
                                                                             setIsAddressModalOpen(false);
                                                                      }}
                                                                      className={`w-full text-left p-3 rounded-lg border ${selectedAddress === addr._id
                                                                             ? "bg-blue-100 border-blue-500"
                                                                             : "bg-gray-100 hover:bg-gray-200"
                                                                             }`}
                                                               >
                                                                      <div className="text-gray-700 font-semibold text-lg  ">

                                                                             <p> <b>State</b> : <i>{addr?.state || "Not provided"}</i></p>
                                                                             <p> <b>District</b> : <i> {addr?.district || "Not provided"}</i> </p>
                                                                             <p> <b>Area</b> : <i>{addr?.area || "Not provided"}</i> </p>
                                                                             <p> <b>Pincode</b> : <i>{addr?.pincode || "Not provided"}</i> </p>
                                                                      </div>
                                                               </button>
                                                        </li>
                                                 ))}
                                          </ul>
                                          <div className="flex justify-between pt-4">
                                                 <button
                                                        onClick={() => navigate(`/profile/${userInfo?._id}`)}
                                                        className="text-sm bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                                 >
                                                        Add New Address
                                                 </button>
                                                 <button
                                                        onClick={() => setIsAddressModalOpen(false)}
                                                        className="text-sm bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                                                 >
                                                        Cancel
                                                 </button>
                                          </div>
                                   </div>
                            </div>
                     )}

                     {/* Animated Accents */}
                     <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-200/30 rounded-full blur-2xl animate-float"></div>
                     <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl animate-float-slow"></div>
              </div>
       );
};

export default BuyPage;
