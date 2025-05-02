import React, { useContext, useState } from 'react'
import { context } from '../../../Context/Context';
import toast from 'react-hot-toast';
import { url } from "../../bacxkendUrl/BackendUrl";
import axios from 'axios';

const Address = ({ address }) => {
       const [editAddress, setEditAddress] = useState(false);

       const [state, setstate] = useState("");
       const [pincode, setpincode] = useState("");
       const [district, setdistrict] = useState("");
       const [area, setarea] = useState("");
       const { getUserDetails } = useContext(context)
       const updateAddress = async () => {
              try {
                     const adrs = { state, district, area, pincode }

                     const { data } = await axios.patch(
                            `${url}/user/update-address`,
                            { address:adrs,addressId:address?._id },
                            {
                                   headers: { "Content-Type": "application/json" },
                                   withCredentials: true,
                                   withXSRFToken: true,
                            }
                     );
                     console.log(data)

                     if (data.success) {
                            toast.success("Address updated successfully!");
                            await getUserDetails()
                            setEditAddress(false)
                            setarea('')
                            setstate('')
                            setdistrict('')
                            setpincode('')
                     } else {
                            toast.error("Failed to update address!");
                     }
              } catch (error) {
                     toast.error("Error updating address!");
              }
       };
       const deleteAddress = async () => {
              try {
                     // let add = address + " " + paddress;
                     // const adrs = { state, district, area, pincode }
                     console.log(address)
                     let addressId=address._id
                     const { data } = await axios.delete(
                            `${url}/user/delete-address/${addressId}`,
                            {
                                   headers: { "Content-Type": "application/json" },
                                   withCredentials: true,
                                   withXSRFToken: true,
                            }
                     );
                     console.log(data)

                     if (data.success) {
                            toast.success("Address updated successfully!");
                            await getUserDetails()
                            setEditAddress(false);
                     } else {
                            toast.error("Failed to update address!");
                     }
              } catch (error) {
                     toast.error("Error updating address!");
              }
       };
       return (
              <div className='border-2 p-4 border-pink-400 rounded-xl w-[300px] relative'>
                     <div className="absolute top-1 right-4 text-3xl mb-2" onClick={() => setEditAddress(prev => !prev)}> = </div>
                     {!editAddress &&
                            <div className="text-gray-700 font-semibold text-lg  ">

                                   <p> <b>State</b> : <i>{address?.state || "Not provided"}</i></p>
                                   <p> <b>District</b> : <i> {address?.district || "Not provided"}</i> </p>
                                   <p> <b>Area</b> : <i>{address?.area || "Not provided"}</i> </p>
                                   <p> <b>Pincode</b> : <i>{address?.pincode || "Not provided"}</i> </p>
                            </div>}
                     {/* Address Update Input */}
                     {editAddress && (


                            <div className="mt-6 flex flex-col items-center space-y-4 relative">

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
                                          placeholder="Enter new area"
                                   />
                                   <input
                                          type="text"
                                          value={pincode}
                                          onChange={(e) => setpincode(e.target.value)}
                                          className="w-full max-w-md p-2 rounded-lg text-gray-800 bg-gray-100 border border-gray-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 shadow-inner"
                                          placeholder="Enter pincode"
                                   />
                                   <div className="flex gap-4">
                                          <button
                                                 onClick={updateAddress}
                                                 className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                                          >
                                                 Update
                                          </button>  <button
                                                 onClick={deleteAddress}
                                                 className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                                          >
                                                 delete
                                          </button>
                                   </div>
                            </div>

                     )}
              </div>
       )
}

export default Address
