import React from "react";
import Orders from "./Orders";

const OrderDetails = ({ orderDetails }) => {
  console.log(orderDetails)
  return (
    <div className="  text-white rounded-lg  p-4 shadow-lg">
      
      <div className="md:grid flex-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...orderDetails]?.reverse().map((item, idx) => (
          <Orders order={item} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
