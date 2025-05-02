
import mongoose from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const AddressSchema = new mongoose.Schema({
       state: {
              type: String
       },
       district: {
              type: String
       },
       area: {
              type: String
       },
       pincode: {
              type: String
       }

})
// PostSchema.plugin(mongooseAggregatePaginate)
export const Address = mongoose.model("Address", AddressSchema)