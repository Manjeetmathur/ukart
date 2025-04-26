import React, { useContext, useState } from "react";
import { dateFormat } from "../../DateFormat/DateFormat";
import axios from "axios";
import { url } from "../../bacxkendUrl/BackendUrl";
import { context } from "../../../Context/Context";

const Orders = ({ order }) => {
  const orderDetails = order?.result;
  const [editStatus, setEditStatus] = useState(false)
  const [editLoading, setEditLoading] = useState(false)
  const [status, setStaus] = useState("Completed");
  const { getordersdetails,getUserDetails } = useContext(context)
  const changeStatus = async () => {
    try {
      setEditLoading(true)
      const res = await axios.patch(`${url}/post/edit-order-status`, { orderId: orderDetails?._id, status }, {
        headers: { "content-type": "application/json" },
        withCredentials: true,
        withXSRFToken: true,
      })
      if (res.data.success) {
        getordersdetails()
        getUserDetails()
      }
    } catch (error) {

    }
    setEditLoading(false)

  }
  return (
    <div className="border bg-gradient-to-br from-pink-600 via-purple-500 to-pink-600  text-white rounded-xl px-3 py-3 shadow-lg transition-transform duration-300 relative">
      {/* Order ID */}
      <button className="absolute top-5 right-5 text-2xl" onClick={() => setEditStatus(prev => !prev)}> 🔁 </button>
      {
      editStatus &&
        <div className="flex flex-col justify-center mb-4">
          <div className="flex flex-col md:flex-row gap-4 mb-4 ">
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="status"
                value="Completed"
                checked={status === "Completed"}
                onChange={() => setStaus("Completed")}
                className="form-radio h-5 w-5 text-blue-500"
              />
              <span className="text-lg">Completed</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="status"
                value="Pending"
                checked={status === "Pending"}
                onChange={() => setStaus("Pending")}
                className="form-radio h-5 w-5 text-blue-500"
              />
              <span className="text-lg">Pending</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="status"
                value="Cancelled"
                checked={status === "Cancelled"}
                onChange={() => setStaus("Cancelled")}
                className="form-radio h-5 w-5 text-blue-500"
              />
              <span className="text-lg">Cancelled</span>
            </label>
          </div>
          <button className="place-content-center mx-auto border-2 p-2 rounded-lg bg-blue-400 text-black" onClick={changeStatus}>{editLoading? "Wait..." :"Change"}</button>
        </div>
      }
      <div className="flex text-sm font-medium mb-2 justify-center items-center">
        <span className="text-gray-950 w-1/3">Order ID:</span>
        <span className="w-2/3">{orderDetails?._id.slice(10)}</span>
      </div>

      {/* Product ID */}
      <div className="flex text-sm font-medium mb-2">
        <span className="text-gray-950 w-1/3">Product ID:</span>
        <span className="w-2/3">{orderDetails?.post[0]?._id.slice(10)}</span>
      </div>

      {/* User */}
      <div className="flex text-sm font-medium mb-2">
        <span className="text-gray-950 w-1/3">User:</span>
        <span className="w-2/3">{orderDetails?.user.slice(10)}</span>
      </div>
      {/* User */}
      <div className="flex text-sm font-medium mb-2">
        <span className="text-gray-950 w-1/3">Address:</span>
        <span className="w-2/3">{orderDetails?.address}</span>
      </div>

      {/* Product Price */}
      <div className="flex text-sm font-medium mb-2">
        <span className="text-gray-950 w-1/3">Product Price:</span>
        <span className="w-2/3">₹{orderDetails?.postPrice}</span>
      </div>

      {/* Quantity */}
      <div className="flex text-sm font-medium mb-2">
        <span className="text-gray-950 w-1/3">Quantity:</span>
        <span className="w-2/3">{orderDetails?.post[1]?.quantity || "N/A"}</span>
      </div>

      {/* Status */}
      <div className="flex text-sm font-medium mb-2">
        <span className="text-gray-950 w-1/3">Status:</span>
        <span className={`w-2/3 font-bold ${orderDetails?.status === "Completed" ? "text-green-400" : "text-yellow-400"}`}>
          {orderDetails?.status}
        </span>
      </div>

      {/* Date */}
      <div className="flex text-sm font-medium">
        <span className="text-gray-950 w-1/3">Date:</span>
        <span className="w-2/3">{dateFormat(orderDetails?.createdAt)}</span>
      </div>
    </div>
  );
};

export default Orders;
