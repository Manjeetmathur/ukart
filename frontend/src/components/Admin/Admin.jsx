import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateProduct from "./CreateProduct/CreateProduct";
import Orders from "./Orders/Orders";
import Posts from "./posts/Posts";
import OrderDetails from "./Orders/OrderDetails";

const Admin = () => {
  const navigate = useNavigate();
  const { admin, userInfo, orderDetails, posts } = useSelector((st) => st.auth);

  useEffect(() => {
    if (!admin) {
      navigate("/");
    }
  }, [admin, navigate]);

  const [active, setActive] = useState("posts");

  return (
    <div
      className="min-h-screen  bg-gradient-to-br from-pink-300 via-purple-300 to-blue-400 flex flex-col relative overflow-hidden"
      id="admin-dash"
    >
      {/* Subtle Texture Overlay */}
      <div
        className="absolute inset-0 bg-no-repeat bg-[length:150px_150px] opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='25' cy='25' r='2'/%3E%3Ccircle cx='125' cy='125' r='2'/%3E%3Ccircle cx='75' cy='75' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Top Navigation */}
      <div className=" bg-gradient-to-br from-pink-600 via-purple-500 to-blue-600  backdrop-blur-md shadow-lg p-4 flex justify-center gap-4 sm:gap-6 mt-5 mx-4 sm:mx-auto rounded-full z-20">
        {[
          { name: "Posts", value: "posts" },
          { name: "Create", value: "create-product" },
          { name: "Orders", value: "orders" },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setActive(item.value)}
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 cursor-pointer ${
              active === item.value
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-300 hover:bg-blue-100 hover:text-black"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 m-3 relative z-10">
        <div className="min-h-[calc(100vh-12rem)]">
          {active === "create-product" && <CreateProduct />}
          {active === "orders" && (
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white text-center mb-6 drop-shadow-md">
                Order Details
              </h1>
              <OrderDetails className="w-full" orderDetails={orderDetails?.d1} />
            </div>
          )}
          {active === "posts" && (
            <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-10 w-full">
              {posts?.length > 0 ? (
                posts?.map((post) => <Posts key={post._id} post={post} />)
              ) : (
                <p className="text-gray-300 text-center col-span-full py-10 text-lg">
                  No posts available.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Animated Accents */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
    </div>
  );
};

export default Admin;