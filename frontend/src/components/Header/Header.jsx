import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoReorderThree, IoClose } from "react-icons/io5";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { logout } from "../../store/authSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { url } from "../bacxkendUrl/BackendUrl";
import p1 from "../../assets/p1.jpg";
// import p1 from "../../assets/p5.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, admin, userInfo } = useSelector((st) => st.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${url}/user/logout`, { withCredentials: true });
      if (data.success) {
        dispatch(logout());
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred during logout.");
    }
  };

  return (
    <header className="bg-[#8ff3f3]  sticky top-0 z-50 font-poppins shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={p1}
            alt="Logo"
            className="w-[80px] rounded-xl h-[50px] md:w-[120px] "
          />
         
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link
            to="/"
            className="text-black hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-pink-500 transition-all duration-300 font-semibold text-sm"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-black hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-pink-500 transition-all duration-300 font-semibold text-sm"
          >
            About
          </Link>
          {status && !admin && (
            <Link
              to={`/profile/${userInfo._id}`}
              className="text-black hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-pink-500 transition-all duration-300 font-semibold text-sm"
            >
              Profile
            </Link>
          )}
          {status && !admin && (
            <Link
              to="/order-page"
              className="text-black hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-pink-500 transition-all duration-300 font-semibold text-sm"
            >
              Orders
            </Link>
          )}
          {status && !admin && (
            <Link
              to="/cart"
              className="text-black hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-pink-500 transition-all duration-300 flex items-center font-semibold text-sm"
            >
              <FiShoppingCart className="mr-1" /> Cart
            </Link>
          )}
          {admin && (
            <Link
              to="/admin"
              className="text-black hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-pink-500 transition-all duration-300 font-semibold text-sm"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          {status ? (
            <button
              onClick={logoutHandler}
              className="bg-gradient-to-r from-yellow-300 to-pink-300 hover:from-gray-100 hover:to-pink-200 text-black px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center shadow-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              <FiUser className="mr-1" /> Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-gradient-to-r from-white to-pink-300 hover:from-gray-100 hover:to-pink-200 text-purple-700 px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center shadow-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              <FiUser className="mr-1" /> Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-black text-2xl sm:text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <IoClose /> : <IoReorderThree />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden  bg-[#7bffde]  border-t border-black px-4 sm:px-6 py-4 shadow-xl rounded-2xl  ">
          <div className="flex flex-col space-y-3">
            <Link
              to="/"
              className="text-black hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-pink-500 transition-all duration-300 font-semibold text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-black hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-pink-500 transition-all duration-300 font-semibold text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {status && !admin && (
              <Link
                to={`/profile/${userInfo._id}`}
                className="text-black hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-pink-500 transition-all duration-300 font-semibold text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            )}
            {status && !admin && (
              <Link
                to="/order-page"
                className="text-black hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-pink-500 transition-all duration-300 font-semibold text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Orders
              </Link>
            )}
            {status && !admin && (
              <Link
                to="/cart"
                className="text-black hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-pink-500 transition-all duration-300 flex items-center font-semibold text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiShoppingCart className="mr-1" /> Cart
              </Link>
            )}
            {admin && (
              <Link
                to="/admin"
                className="text-black hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-pink-500 transition-all duration-300 font-semibold text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {status ? (
              <button
                onClick={() => {
                  logoutHandler();
                  setIsMenuOpen(false);
                }}
                className="bg-gradient-to-r from-blue-200 to-pink-300 hover:from-blue-100 hover:to-pink-200 text-purple-700 px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center shadow-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                <FiUser className="mr-1" /> Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-white to-pink-300 hover:from-gray-100 hover:to-pink-200 text-purple-700 px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center shadow-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiUser className="mr-1" /> Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;