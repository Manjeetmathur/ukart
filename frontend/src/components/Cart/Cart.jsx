import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";

const Cart = () => {
  const { cartDetails } = useSelector((st) => st.auth);
console.log(cartDetails)
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-gra-800 to-purple-400 py-8">
      <div className="container mx-auto px-4">
        {/* Page Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center uppercase  tracking-wide drop-shadow-md mb-8">
          Your Cart
        </h2>

        {/* Cart Items Grid */}
        {cartDetails?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartDetails?.map((item) => (
              <CartProduct key={item?._id} product={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            Your cart is empty. Start shopping now!
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;