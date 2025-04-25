import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       status : false,
       userData : null,
       posts : null,
       postData : null,
       userInfo : null,
       admin : null,
       orderDetails : null,
       cartDetails : null,
}
const authSlice = createSlice({
       name : "auth",
       initialState,
       reducers : {
              login : (state,action) => {
                     state.status = true,
                     state.userData = action.payload
                     
              },
              setAdmin : (state,action) => {
                     state.admin = action.payload
              },
              
              logout : (state) => {
                     state.status = false,
                     state.userData = null
                     state.admin = null
              },

              setPosts : (state,action) => {
                     state.posts = action.payload
              },
              setPostData : (state,action) => {
                     state.postData=action.payload
                     
              },
              setUserInfo : (state,action) => {
                     state.userInfo=action.payload
                     
              },
              setOrderDetails : (state,action) => {
                     state.orderDetails=action.payload
                     
              },
              setCartDetails : (state,action) => {
                     
                     state.cartDetails=action.payload
                     
              },
       }

})
export const {login,logout,setPosts,setPostData,setUserInfo,setAdmin,setOrderDetails,setCartDetails} = authSlice.actions
export default authSlice.reducer