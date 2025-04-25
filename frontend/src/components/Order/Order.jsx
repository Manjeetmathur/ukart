import React from "react";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";

const Order = () => {
  const { userInfo } = useSelector((st) => st.auth);
const orders = userInfo?.order
// console.log()
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-pink-200 py-10">
      <div className="container mx-auto px-4">
        {/* Page Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-purple-800 tracking-wide drop-shadow-md mb-8">
          Your Orders
        </h2>

        {/* Orders Grid */}
        {userInfo?.order?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...orders].reverse().map((item) => (
              <OrderItem key={item._id} orders={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 text-lg">
            No orders found. Start shopping now!
          </p>
        )}
      </div>
    </div>
  );
};

export default Order;
