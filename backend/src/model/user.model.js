import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
       {
              phone: {
                     type: String,
              },
              
              fullname: {
                     type: String,
                     required: true,
                     trim: true
              },
              email: {
                     type: String,
                     required: true,
                     unique: true,
              },
              password: {
                     type: String,
                     required: [true, "Password is required..."]
              },
              profile: {
                     type: String,
              },
              cart: [
                     {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Cart"
                     }
              ],
              order: [
                     {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Order"
                     }
              ],
              address: 
                     {
                           type:String
                     }
              ,
              
       },
       {
              timestamps: true,
       }
);

export const User = mongoose.model("User", userSchema)