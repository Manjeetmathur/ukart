import React from "react";
import Orders from "./Orders";

const OrderDetails = ({ orderDetails }) => {
  console.log(orderDetails)
  return (
    <div className="overflow-x-auto  text-white rounded-lg  p-4 shadow-lg">
      
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {orderDetails?.map((item, idx) => (
          <Orders order={item} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
