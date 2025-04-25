
import mongoose from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const PaymentSchema =new mongoose.Schema({
       amount : {
              type : String,
              required : true,
       },
       paymentSst : {
              type : String,
              required:true,
       },
       PaymentDate : {
              type: Date,
              required:true
       },
       verifiedSst: { type: Boolean, default: false },
       owner: {
              type: Schema.Types.ObjectId,
              ref: "User"
       },
       post: {
              type: Schema.Types.ObjectId,
              ref: "Post"
       }

})
// PostSchema.plugin(mongooseAggregatePaginate)
export const Payment = mongoose.model("Payment",PaymentSchema)