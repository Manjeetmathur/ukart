import mongoose, { Schema } from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const adminSchema  = new Schema(
       {
              phone : {
                     type : String,
              },
              fullname : {
                     type : String,
                     required : true,
                     trim : true
              },
              email : {
                     type : String,
                     required : true,
                     unique : true,
              },
              password : {
                     type : String,
                     required : [true, "Password is required..."]
              },
              profile : {
                     type : String,
              },
              posts:[
                     {
                            type : mongoose.Schema.Types.ObjectId,
                            ref : "Post"
                     }
              ],
              orders:[
                     {
                            type : mongoose.Schema.Types.ObjectId,
                            ref : "Order"
                     }
              ],
              
       },
       {
              timestamps : true,
       }
);

// adminSchema.plugin(mongooseAggregatePaginate)
export const Admin = mongoose.model("Admin",adminSchema)