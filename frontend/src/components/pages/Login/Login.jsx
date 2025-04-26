import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login, setAdmin } from "../../../store/authSlice";
import toast from "react-hot-toast";
import { url } from "../../bacxkendUrl/BackendUrl";

const Login = () => {
       const { status } = useSelector((st) => st.auth);
       const navigate = useNavigate();
       const dispatch = useDispatch();

       useEffect(() => {
              if (status) {
                     navigate("/");
              }
       }, [status, navigate]);

       const [email, setEmail] = useState("");
       const [password, setPassword] = useState("");
       const [loading, setLoading] = useState(false);

       const handleLogin = async (e) => {
              e.preventDefault();
              try {
                     setLoading(true);
                     const data = await axios.post(
                            `${url}/user/login`,
                            { email, password },
                            {
                                   headers: {
                                          "content-type": "application/json",
                                   },
                                   withCredentials: true,
                            }
                     );
                     const response = data.data;
                     if (response.success) {
                            if (response.role === "admin") {
                                   dispatch(setAdmin(response.role));
                                   navigate('/dashboard')
                            }
                            dispatch(login(response.loggedInUser));
                            toast.success(response.message);
                            navigate("/");
                     } else {
                            toast.error(response.message);
                     }
              } catch (error) {
                     toast.error(error.message);
              } finally {
                     setLoading(false);
              }
       };

       return (
              <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-400 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                     {/* Subtle Overlay Effect */}
                     <div className="absolute inset-0 bg-black opacity-5 pointer-events-none"></div>

                     <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full space-y-8 transform hover:shadow-3xl transition-shadow duration-300 z-10 relative">
                            {/* Glow Effect Behind Form */}
                            <div className="absolute inset-0 -z-10 bg-purple-500/20 blur-3xl rounded-xl scale-105 animate-pulse-slow"></div>

                            {/* Logo or Branding */}
                            <div className="text-center">
                                   <h2 className="text-3xl font-bold text-gray-800 tracking-tight drop-shadow-md">
                                          Ukart Login
                                   </h2>
                                   <p className="mt-2 text-sm text-gray-600 drop-shadow-sm">
                                          Access your electronics shopping experience
                                   </p>
                            </div>

                            {/* Form Container */}
                            <div className="space-y-6">
                                   {/* Form */}
                                   <form onSubmit={handleLogin} className="space-y-6">
                                          {/* Email Field */}
                                          <div>
                                                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 drop-shadow-sm">
                                                        Email Address
                                                 </label>
                                                 <input
                                                        id="email"
                                                        type="email"
                                                        placeholder="you@example.com"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                        className="mt-1 w-full px-4 py-3 bg-gray-100 border border-gray-300/50 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 shadow-inner"
                                                 />
                                          </div>

                                          {/* Password Field */}
                                          <div>
                                                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 drop-shadow-sm">
                                                        Password
                                                 </label>
                                                 <input
                                                        id="password"
                                                        type="password"
                                                        placeholder="••••••••"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                        className="mt-1 w-full px-4 py-3 bg-gray-100 border border-gray-300/50 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 shadow-inner"
                                                 />
                                          </div>

                                          {/* Submit Button */}
                                          <button
                                                 type="submit"
                                                 className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 text-base font-semibold disabled:bg-purple-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                                                 disabled={loading}
                                          >
                                                 {loading ? "Signing In..." : "Sign In"}
                                          </button>
                                   </form>

                                   {/* Sign Up Link */}
                                   <p className="text-center text-sm text-gray-600 drop-shadow-sm">
                                          New to TechTrend?{" "}
                                          <Link
                                                 to="/signup"
                                                 className="text-purple-600 hover:text-purple-500 font-medium transition-colors duration-300"
                                          >
                                                 Create an Account
                                          </Link>
                                   </p>
                            </div>
                     </div>

                     {/* Optional Animated Accent */}
                     <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-200/30 rounded-full blur-2xl animate-float"></div>
                     <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl animate-float-slow"></div>
              </div>
       );
};

export default Login;