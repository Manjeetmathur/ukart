import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoReorderThree, IoClose } from "react-icons/io5";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { logout } from "../../store/authSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { url } from "../bacxkendUrl/BackendUrl";
import p1 from "../../assets/p6.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, admin, userInfo } = useSelector((st) => st.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${url}/user/logout`, {
        withCredentials: true,
      });
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
    <header className="sticky top-0 z-50 font-poppins bg-[#8ff3f3]  shadow-2xl ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 sparkle">
          <img
            src={p1}
            alt="Logo"
            className="w-[120px] h-[38px] md:w-[120px] rounded-xl transition-transform duration-300 hover:scale-105"
          />
          <div className="sparkle"></div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link
            to="/"
            className="text-purple-950 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition-all duration-300 font-semibold text-sm glow-button"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-purple-950 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition-all duration-300 font-semibold text-sm glow-button"
          >
            About
          </Link>
          {status && !admin && (
            <Link
              to={`/profile/${userInfo?._id}`}
              className="text-purple-950 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition-all duration-300 font-semibold text-sm glow-button"
            >
              Profile
            </Link>
          )}
          {status && !admin && (
            <Link
              to="/order-page"
              className="text-purple-950 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition-all duration-300 font-semibold text-sm glow-button"
            >
              Orders
            </Link>
          )}
          {status && !admin && (
            <Link
              to="/cart"
              className="text-purple-950 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition-all duration-300 flex items-center font-semibold text-sm glow-button"
            >
              <FiShoppingCart className="mr-1" /> Cart
            </Link>
          )}
          {admin && (
            <Link
              to="/admin"
              className="text-purple-950 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition-all duration-300 font-semibold text-sm glow-button"
            >
              Dashboard
            </Link>
          )}
          {(status || admin) && (
            <div className="floating-badge bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-950 text-xs font-semibold px-2 py-1 rounded-full shadow-md">
              {admin ? "Admin" : "Logged In"}
            </div>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          {status ? (
            <button
              onClick={logoutHandler}
              className="bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-300 hover:to-pink-300 text-purple-800 px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center shadow-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 glow-button"
            >
              <FiUser className="mr-1" /> Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-gradient-to-r from-white to-pink-300 hover:from-gray-100 hover:to-pink-200 text-purple-700 px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center shadow-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 glow-button"
            >
              <FiUser className="mr-1" /> Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-purple-950 text-2xl sm:text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <IoClose /> : <IoReorderThree />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gradient-to-r from-purple-500 to-blue-500 glassmorphism border-t border-white/20 px-4 sm:px-6 py-4 shadow-xl rounded-b-2xl animate-slideUp">
          <div className="flex flex-col space-y-3">
            <Link
              to="/"
              className="text-purple-950 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition-all duration-300 font-semibold text-sm glow-button"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-purple-950 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition-all duration-300 font-semibold text-sm glow-button"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {status && !admin && (
              <Link
                to={`/profile/${userInfo?._id}`}
                className="text-purple-950 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition-all duration-300 font-semibold text-sm glow-button"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            )}
            {status && !admin && (
              <Link
                to="/order-page"
                className="text-purple-950 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition-all duration-300 font-semibold text-sm glow-button"
                onClick={() => setIsMenuOpen(false)}
              >
                Orders
              </Link>
            )}
            {status && !admin && (
              <Link
                to="/cart"
                className="text-purple-950 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition-all duration-300 flex items-center font-semibold text-sm glow-button"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiShoppingCart className="mr-1" /> Cart
              </Link>
            )}
            {admin && (
              <Link
                to="/admin"
                className="text-purple-950 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition-all duration-300 font-semibold text-sm glow-button"
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
                className="bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-300 hover:to-pink-300 text-purple-800 px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center shadow-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 glow-button"
              >
                <FiUser className="mr-1" /> Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-white to-pink-300 hover:from-gray-100 hover:to-pink-200 text-purple-700 px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center shadow-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 glow-button"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiUser className="mr-1" /> Login
              </Link>
            )}
            {(status || admin) && (
              <div className="floating-badge bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-950 text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                {admin ? "Admin" : "Logged In"}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;