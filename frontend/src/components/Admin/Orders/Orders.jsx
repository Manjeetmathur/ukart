import React, { useContext, useState } from "react";
import { dateFormat } from "../../DateFormat/DateFormat";
import axios from "axios";
import { url } from "../../bacxkendUrl/BackendUrl";
import { context } from "../../../Context/Context";

const Orders = ({ order }) => {
  const orderDetails = order?.result;
  const [editStatus, setEditStatus] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [status, setStaus] = useState("Completed");
  const { getordersdetails, getUserDetails } = useContext(context);

  const changeStatus = async () => {
    try {
      setEditLoading(true);
      const res = await axios.patch(
        `${url}/post/edit-order-status`,
        { orderId: orderDetails?._id, status },
        {
          headers: { "content-type": "application/json" },
          withCredentials: true,
          withXSRFToken: true,
        }
      );
      if (res.data.success) {
        getordersdetails();
        getUserDetails();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="relative w-full my-4 bg-black/10 backdrop-blur-lg text-sm  rounded-lg p-4 border border-white/10 shadow-md transition hover:scale-[1.01]">
      {/* Toggle Button */}
      <button
        className="absolute top-3 right-3 text-lg bg-white/20 hover:bg-white/30 rounded-full p-1 transition"
        onClick={() => setEditStatus((prev) => !prev)}
        title="Change Status"
      >
        🔁
      </button>

      {/* Status Edit Panel */}
      {editStatus && (
        <div className="mb-3 p-3 rounded-md bg-white/20 border border-white/30">
          <div className="flex flex-wrap gap-3 mb-3">
            {["Completed", "Pending", "Cancelled"]?.map((s) => (
              <label key={s} className="flex items-center gap-1 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value={s}
                  checked={status === s}
                  onChange={() => setStaus(s)}
                  className="form-radio text-blue-500"
                />
                <span className="text-black" >{s}</span>
              </label>
            ))}
          </div>
          <button
            onClick={changeStatus}
            disabled={editLoading}
            className="bg-blue-400 hover:bg-blue-500 text-black font-medium py-1 px-4 rounded transition"
          >
            {editLoading ? "Wait..." : "Update Status"}
          </button>
        </div>
      )}

      {/* Order Info Grid */}
      <div className="space-y-2">
        <OrderRow label="Order ID" value={orderDetails?._id.slice(10)} />
        <OrderRow label="Product ID" value={orderDetails?.post[0]?._id.slice(10)} />
        <OrderRow label="User" value={orderDetails?.user.slice(10)} />
        <OrderRow label="Address" value={orderDetails?.address} />
        <OrderRow label="Product Price" value={`₹${orderDetails?.postPrice}`} />
        <OrderRow label="Quantity" value={orderDetails?.post[1]?.quantity || "N/A"} />
        <OrderRow
          label="Status"
          value={orderDetails?.status}
          valueClass={
            orderDetails?.status === "Completed"
              ? "text-green-400 font-semibold"
              : orderDetails?.status === "Cancelled"
              ? "text-red-400 font-semibold"
              : "text-yellow-400 font-semibold"
          }
        />
        <OrderRow label="Date" value={dateFormat(orderDetails?.createdAt)} />
      </div>
    </div>
  );
};

const OrderRow = ({ label, value, valueClass = "" }) => (
  <div className="flex  gap-5 border-b text-black border-white/10 pb-1">
    <span className=" font-medium">{label}:</span>
    <span className={`truncate ${valueClass}`}>{value}</span>
  </div>
);

export default Orders;
