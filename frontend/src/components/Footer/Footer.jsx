import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full p-6 sm:p-10 relative bg-gradient-to-r from-pink-300 via-purple-300 to-blue-400 text-gray-800 shadow-md border-t border-gray-300/50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left relative z-10">
        {/* Logo and Navigation Links */}
        <div className="flex flex-col items-center md:items-start gap-6">
          <div className="text-2xl font-bold text-purple-700 drop-shadow-md">
            <Link to="/">Ukart</Link>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 sm:gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 text-sm sm:text-base font-medium transition-colors duration-300 relative group"
            >
              Home
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/explore"
              className="text-gray-700 hover:text-purple-600 text-sm sm:text-base font-medium transition-colors duration-300 relative group"
            >
              Explore
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-purple-600 text-sm sm:text-base font-medium transition-colors duration-300 relative group"
            >
              About
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-purple-700 drop-shadow-md">
            Reach Us
          </h1>
          <p className="text-gray-700 text-sm sm:text-base">
            Email:{" "}
            <a
              href="mailto:crazykapisway9973@gmail.com"
              className="text-purple-600 hover:text-purple-500 transition-colors duration-300"
            >
              crazykapisway9973@gmail.com
            </a>
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            Contact No.:{" "}
            <a
              href="tel:+919973154827"
              className="text-purple-600 hover:text-purple-500 transition-colors duration-300"
            >
              +91 9973154827
            </a>
          </p>
        </div>

        {/* Copyright Info */}
        <div className="flex flex-col gap-2 text-center md:text-right">
          
          <p className="text-gray-600 text-sm sm:text-base drop-shadow-sm">
            Content owned, maintained, and updated by TechTrend
          </p>
          <p className="text-gray-600 text-sm sm:text-base drop-shadow-sm">
            Copyright © 2024 Manjeet
          </p>
          <p className="text-gray-600 text-sm sm:text-base drop-shadow-sm">
            Designed & Developed by: Manjeet Mathur
          </p>
        </div>
      </div>

      {/* Animated Accents */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-200/30 rounded-full blur-2xl animate-float"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl animate-float-slow"></div>
    </footer>
  );
};

export default Footer;