import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../bacxkendUrl/BackendUrl";
import { toast } from "react-hot-toast";
import { context } from "../../../Context/Context";
import Address from "./Address";
import { useSelector } from "react-redux";

const UserProfile = () => {
       const [user, setUser] = useState(null);
       const [loading, setLoading] = useState(true);
       const [editAddress, setEditAddress] = useState(false);

       const [address, setAddress] = useState([]);
       const [state, setstate] = useState("");
       const [pincode, setpincode] = useState("");
       const [district, setdistrict] = useState("");
       const [area, setarea] = useState("");

       const { getUserDetails } = useContext(context)
       const { userInfo } = useSelector(st=>st.auth)
     
       const updateAddress = async () => {
              try {
                     // let add = address + " " + paddress;
                     const adrs = { state, district, area, pincode }

                     const { data } = await axios.patch(
                            `${url}/user/add-address`,
                            { address: adrs },
                            {
                                   headers: { "Content-Type": "application/json" },
                                   withCredentials: true,
                                   withXSRFToken: true,
                            }
                     );
                     // console.log(data)

                     if (data.success) {
                            toast.success("Address updated successfully!");
                            await getUserDetails()
                            // setUser((prevUser) => ({ ...prevUser, address: adrs })); // Update UI
                            setEditAddress(false);
                     } else {
                            toast.error("Failed to update address!");
                     }
              } catch (error) {
                     toast.error("Error updating address!");
              }
       };

       // if (loading) return <p className="text-center text-gray-600 py-16">Loading...</p>;
       if (!userInfo) return <p className="text-center text-red-500 py-16">User not found!</p>;

       return (
              <div className="min-h-[60vh] bg-gradient-to-br from-pink-300 via-purple-300 to-blue-400 text-gray-800 py-16 px-4 sm:px-6 lg:px-8">
                     <div className="container mx-auto p-6 bg-white shadow-2xl rounded-xl max-w-5xl space-y-8 transform hover:shadow-3xl transition-shadow duration-300">
                            {/* User Profile Info */}
                            <div className="flex flex-col items-center space-y-3">
                                   <h2 className="text-2xl font-bold text-gray-800">{userInfo?.fullname}</h2>
                                   <p className="text-gray-600">{userInfo?.email}</p>
                                   <p>Address</p>
                                   <div className="grid md:grid-cols-2 gap-3 ">
                                          {userInfo?.address?.map((item, idx) => (
                                                 <div className=" " key={idx} >
                                                        <Address address={item} />
                                                 </div>
                                          ))}
                                   </div>
                            </div>

                            {/* Change Address Button */}
                            <button
                                   className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg mx-auto   flex"
                                   onClick={() => setEditAddress(prev => !prev)}
                            >
                                   Add Address
                            </button>

                            {/* Address Update Input */}
                            {editAddress && (
                                   <div className="mt-4 flex flex-col items-center space-y-4">
                                          <input
                                                 type="text"
                                                 value={state}
                                                 onChange={(e) => setstate(e.target.value)}
                                                 className="w-full max-w-md p-2 rounded-lg text-gray-800 bg-gray-100 border border-gray-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 shadow-inner"
                                                 placeholder="Enter State"
                                          />
                                          <input
                                                 type="text"
                                                 value={district}
                                                 onChange={(e) => setdistrict(e.target.value)}
                                                 className="w-full max-w-md p-2 rounded-lg text-gray-800 bg-gray-100 border border-gray-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 shadow-inner"
                                                 placeholder="Enter district"
                                          />
                                          <input
                                                 type="text"
                                                 value={area}
                                                 onChange={(e) => setarea(e.target.value)}
                                                 className="w-full max-w-md p-2 rounded-lg text-gray-800 bg-gray-100 border border-gray-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 shadow-inner"
                                                 placeholder="Enter new address"
                                          />
                                          <input
                                                 type="text"
                                                 value={pincode}
                                                 onChange={(e) => setpincode(e.target.value)}
                                                 className="w-full max-w-md p-2 rounded-lg text-gray-800 bg-gray-100 border border-gray-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 shadow-inner"
                                                 placeholder="Enter pincode"
                                          />
                                          <button
                                                 onClick={updateAddress}
                                                 className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                                          >
                                                 Update
                                          </button>
                                   </div>
                            )}
                     </div>
              </div>
       );
};

export default UserProfile;