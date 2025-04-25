import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { url } from "../bacxkendUrl/BackendUrl";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { context } from "../../Context/Context";

const OrderItem = ({ orders }) => {
  const [image, setImage] = useState("");
  const [imageId, setImageId] = useState("");
  const { getUserDetails } = useContext(context)
  const fetchPostInfo = async () => {
    try {
      const { data } = await axios.get(`${url}/post/get-post-by-id/${orders?.post?.[0]?.post}`);
      if (data.success) {
        setImage(data.post.postImage);
        setImageId(data.post._id);
      } else {
        toast.error(data.message || "Failed to fetch product details");
      }
    } catch (error) {
      toast.error("Error fetching product details");
    }
  };

  useEffect(() => {
    if (orders?.post?.[0]?.post) {
      fetchPostInfo();
    }
  }, [orders]);

  const cancelOrder = async () => {
    try {
      const { data } = await axios.post(
        `${url}/post/cancel-order`,
        { orderId: orders?._id },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      if (data.success) {
        toast.success("Order cancelled successfully!");
        getUserDetails()
      } else {
        toast.error(data.message || "Failed to cancel order");
      }
    } catch (error) {
      toast.error("Error cancelling order");
    }
  };

  return (
    <div className="p-4 sm:p-6 relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-transform transform">
      {/* Orders Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-300 p-4">
        <p className="text-gray-600 text-sm font-medium">
          <span className="font-semibold text-pink-500">Order ID:</span> {orders?._id.slice(16, 28)}
        </p>
        <p className={`text-sm font-medium ${orders?.status === "Cancelled" ? "text-red-500" : orders?.status === 'Complted' ?  "text-green-500" :"text-yellow-500"}`}>
          {orders?.status}
        </p>
      </div>

      {/* Orders Details */}
      <div className="flex flex-col sm:flex-row items-center gap-4 p-4">
        {/* Product Image */}
        <Link to={`/product/${imageId}`} className="flex-shrink-0">
          <img
            src={image}
            alt="Product"
            className="w-32 h-32 object-cover rounded-md shadow-md transition-transform transform hover:scale-110"
          />
        </Link>

        {/* Orders Info */}
        <div className="text-gray-700 text-sm space-y-2">
          <p><span className="font-semibold text-pink-500">Price:</span> ₹{orders?.postPrice?.toFixed(2) || "N/A"}</p>
          <p><span className="font-semibold text-pink-500">User ID:</span> {orders?.user?.slice(16, 28)}</p>
          <p><span className="font-semibold text-pink-500">Product ID:</span> {orders?.post[0]?.post.slice(16, 28)}</p>
          <p><span className="font-semibold text-pink-500">Quantity:</span> {orders?.post[1]?.quantity || "N/A"}</p>
        </div>
      </div>

      {/* Cancel Orders Button */}
      <div className="p-4">
      {!(orders?.status === "Cancelled" || orders?.status === "Completed" ) &&  <button
          onClick={cancelOrder}
          className="w-full bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
          
        >
          Cancel Order
        </button>}
      </div>
    </div>
  );
};

export default OrderItem;
