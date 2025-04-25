import mongoose from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const CartSchema = mongoose.Schema({
       post:{
              type: mongoose.Schema.Types.ObjectId,
              ref: "Post"
       },

       owner: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
       }
})

// CartSchema.plugin(mongooseAggregatePaginate)
export const Cart = mongoose.model("Cart", CartSchema)