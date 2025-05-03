import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiMenu } from "react-icons/fi";
import { url } from "../bacxkendUrl/BackendUrl";
import { useSelector } from "react-redux";
import Posts from "./posts/Posts";
import OrderDetails from "./Orders/OrderDetails";
import CreateProduct from "./CreateProduct/CreateProduct";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, userInfo, orderDetails, posts } = useSelector((st) => st.auth);


  const getAll = async () => {
    try {
      const { data } = await axios.get(`${url}/user/get-all-users-details`, {
        withCredentials: true,
        withXSRFToken: true,
      });
      console.log(data)
      if (data.success) {
        setUserData(data.users);
      }
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };
  useEffect(() => {
    getAll();
  }, []);
  const filteredUsers = userData.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col md:h-screen md:flex-row overflow-y-auto  bg-gray-100">
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex justify-between items-center bg-white p-4 shadow">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-full md:w-64 bg-white shadow-md p-6 space-y-6 transition-all duration-300 ${sidebarOpen ? "block" : "hidden"
          } md:block`}
      >
        <h2 className="text-2xl font-bold text-gray-800 hidden md:block">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          <button
            onClick={() => {
              setActiveTab("products");
              setSidebarOpen(false);
            }}
            className={`text-left px-4 py-2 rounded ${activeTab === "products" ? "bg-pink-200 font-semibold" : "hover:bg-pink-100"
              }`}
          >
            Products
          </button>
          <button
            onClick={() => {
              setActiveTab("orders");
              setSidebarOpen(false);
            }}
            className={`text-left px-4 py-2 rounded ${activeTab === "orders" ? "bg-pink-200 font-semibold" : "hover:bg-pink-100"
              }`}
          >
            Orders
          </button>
          <button
            onClick={() => {
              setActiveTab("users");
              setSidebarOpen(false);
            }}
            className={`text-left px-4 py-2 rounded ${activeTab === "users" ? "bg-pink-200 font-semibold" : "hover:bg-pink-100"
              }`}
          >
            Users
          </button>
          <button
            onClick={() => {
              setActiveTab("create");
              setSidebarOpen(false);
            }}
            className={`text-left px-4 py-2 rounded ${activeTab === "create" ? "bg-pink-200 font-semibold" : "hover:bg-pink-100"
              }`}
          >
            Create Product
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto ">
        {activeTab === "users" && (
          <>
            <h3 className="text-xl font-bold mb-4">Users</h3>
            <input
              type="text"
              placeholder="Search by email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4 px-4 py-2 border rounded w-full"
            />
            <div className="space-y-4 overflow-y-auto">
              {filteredUsers.map((user) => (
                <div key={user._id} className="p-4 bg-white rounded shadow">
                  <h4 className="text-lg font-semibold">{user.fullname}</h4>
                  <p>Email: {user.email}</p>
                  <p>Created: {new Date(user.createdAt).toLocaleDateString()}</p>
                  <p>Orders: {user.order.length}</p>
                  <p>Cart Items: {user.cart?.length || 0}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "orders" && (
          <>
            <h3 className="text-xl font-bold mb-4">All Orders</h3>
            {/* {active === "orders" && ( */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-center mb-6 drop-shadow-md">
                Order Details
              </h1>
              <OrderDetails className="" orderDetails={orderDetails?.d1} />
            </div>
            {/* )} */}
          </>
        )}

        {activeTab === "products" && (
          <div className="">
            <h3 className="text-xl font-bold mb-4">Product List</h3>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {posts?.length > 0 ? (
                posts?.map((post) => <Posts key={post?._id} post={post} />)
              ) : (
                <p className="text-gray-300 text-center col-span-full py-10 text-lg">
                  No posts available.
                </p>)}
            </div>
          </div>
        )}

        {activeTab === "create" && (
          <CreateProduct />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
