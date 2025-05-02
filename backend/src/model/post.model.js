
import mongoose from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const PostSchema = mongoose.Schema({
       postImage: {
              type: String,
              required: true,
       },
       postTitle: {
              type: String,
       },
       postPrice: {
              type: Number,
       },
       postContent: {
              type: String,
              required: true,
       },
       postCategory: {
              type: String,
              required: true,
       },
       address:
       {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Address"

       },

       stock: {
              type: Number,
              required: true,
       },
       owner: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Admin"
       },
       postParentCategory: {
              type: String,
              required: true
       }

})
// PostSchema.plugin(mongooseAggregatePaginate)
export const Post = mongoose.model("Post", PostSchema)