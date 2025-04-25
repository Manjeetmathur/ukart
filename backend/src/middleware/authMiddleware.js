import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../model/user.model.js"
import { Admin } from "../model/admin.model.js";


export const verifyJwt = asyncHandler(async(req,res,next) => {
       try {
              const token = req.cookies?.token
              if(!token){
                     throw new ApiError(401 , "Unauthorized request . . . ")
              }

              const decodeToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
              const user = await User.findById(decodeToken?.userId).select(" -password -refreshToken")

              if(!user){
                     throw new ApiError(401,"Invalid Acsess token . . .")
              }
              const email = user.email
              const admin = await Admin.findOne({email})
              if(admin){
                     req.user = admin
                     
              }else{
                     req.user = user
                     
              }
              
              next();
       } catch (error) {
              res.json({
                     message : error.message
              })             
       }
});