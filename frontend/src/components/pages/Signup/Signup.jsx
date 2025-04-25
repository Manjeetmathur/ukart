import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../../bacxkendUrl/BackendUrl";
import toast from "react-hot-toast";

const Signup = () => {
       const dispatch = useDispatch();
       const navigate = useNavigate();
       const [email, setEmail] = useState("");
       const [fullName, setfullName] = useState("");
       const [password, setPassword] = useState("");
       const [confirmPassword, setconfirmPassword] = useState("");
       const [profile, setProfile] = useState("");
       const [loading, setLoading] = useState(false);

       const handleSignup = async (e) => {
              e.preventDefault();
              setLoading(true);
              try {
                     const formData = new FormData();
                     formData.append("profile", profile);
                     formData.append("fullName", fullName);
                     formData.append("email", email);
                     formData.append("password", password);
                     formData.append("confirmPassword", confirmPassword);

                     const dataResponse = await axios.post(`${url}/user/register`, formData, {
                            headers: {
                                   "content-type": "multipart/form-data",
                            },
                     });
                     const res = dataResponse.data;

                     if (res.success) {
                            navigate("/login");
                            toast.success(res.message);
                     } else {
                            toast.error(res.message);
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

                            {/* Heading */}
                            <div className="text-center">
                                   <h2 className="text-3xl font-bold text-gray-800 tracking-tight drop-shadow-md">
                                          Create Your TechTrend Account
                                   </h2>
                                   <p className="mt-2 text-sm text-gray-600 drop-shadow-sm">
                                          Join the future of electronics shopping
                                   </p>
                            </div>

                            {/* Form Container */}
                            <div className="space-y-6">
                                   {/* Form */}
                                   <form onSubmit={handleSignup} className="space-y-6">
                                          {/* Profile Picture Field (Uncomment if needed) */}
                                          {/* <div>
              <label htmlFor="profile" className="block text-sm font-medium text-gray-700 drop-shadow-sm">
                Profile Picture
              </label>
              <input
                id="profile"
                type="file"
                accept="image/*"
                onChange={(e) => setProfile(e.target.files?.[0])}
                required
                className="mt-1 w-full px-4 py-3 bg-gray-100 border border-gray-300/50 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 shadow-inner file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
              />
            </div> */}

                                          {/* Full Name Field */}
                                          <div>
                                                 <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 drop-shadow-sm">
                                                        Full Name
                                                 </label>
                                                 <input
                                                        id="fullName"
                                                        type="text"
                                                        placeholder="Enter your name..."
                                                        value={fullName}
                                                        onChange={(e) => setfullName(e.target.value)}
                                                        required
                                                        className="mt-1 w-full px-4 py-3 bg-gray-100 border border-gray-300/50 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 shadow-inner"
                                                 />
                                          </div>

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

                                          {/* Confirm Password Field */}
                                          <div>
                                                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 drop-shadow-sm">
                                                        Confirm Password
                                                 </label>
                                                 <input
                                                        id="confirmPassword"
                                                        type="password"
                                                        placeholder="••••••••"
                                                        value={confirmPassword}
                                                        onChange={(e) => setconfirmPassword(e.target.value)}
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
                                                 {loading ? "Signing Up..." : "Sign Up"}
                                          </button>
                                   </form>

                                   {/* Sign In Link */}
                                   <p className="text-center text-sm text-gray-600 drop-shadow-sm">
                                          Already have an account?{" "}
                                          <Link
                                                 to="/login"
                                                 className="text-purple-600 hover:text-purple-500 font-medium transition-colors duration-300"
                                          >
                                                 Sign In
                                          </Link>
                                   </p>
                            </div>
                     </div>

                     {/* Animated Accents */}
                     <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-200/30 rounded-full blur-2xl animate-float"></div>
                     <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl animate-float-slow"></div>
              </div>
       );
};

export default Signup;