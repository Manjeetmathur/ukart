import { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCartDetails, setOrderDetails, setPosts, setUserInfo } from "../store/authSlice";
import axios from "axios";
import { url } from "../components/bacxkendUrl/BackendUrl";

export const context = createContext()

const ContextProvider = ({ children }) => {

       const dispatch = useDispatch()
       //all posts
       const getAllPosts = async () => {
              const data = await axios.get(`${url}/post/get-post`)
              const res = data.data

              if (res.success) {
                     dispatch(setPosts(res.allPost));
              }
       }
       useEffect(() => {
              try {

                     getAllPosts()
              } catch (error) {
                     console.log(error);

              }
       }, [])

       const getUserDetails = async () => {
              const data = await axios.get(`${url}/user/get-user-details`, { withCredentials: true, withXSRFToken: true })
              const res = data.data
              if (res.success) {
                     res.admin ? dispatch(setUserInfo(res.admin)) : dispatch(setUserInfo(res.user))


              }
              // dispatch(setPosts( res.allPost));

       }
       //userDetails
       useEffect(() => {
              try {

                     getUserDetails()
              } catch (error) {
                     console.log(error);

              }

       }, [])


       //orderDetails
       const getordersdetails = async () => {
              const data = await axios.get(`${url}/post/get-order-details`, { withCredentials: true, withXSRFToken: true })
              const res = data.data
              // console.log(res);

              if (res.success) {
                     dispatch(setOrderDetails(res))
              }

       }
       useEffect(() => {
              try {

                     getordersdetails()
              } catch (error) {
                     console.log(error);

              }

       }, [])

       //cart Details
       const cart = async () => {
              const data = await axios.get(`${url}/post/get-cart-item`, { withCredentials: true, withXSRFToken: true })
              const res = data.data
              if (res.success) {
                     dispatch(setCartDetails(res.cartItems))
              }

       }
       useEffect(() => {
              try {
                     cart()
              } catch (error) {
                     console.log(error);

              }

       }, [])


       return (
              <context.Provider value={{ getAllPosts, getordersdetails, cart ,getUserDetails}}>
                     {children}
              </context.Provider>
       )
}
export default ContextProvider