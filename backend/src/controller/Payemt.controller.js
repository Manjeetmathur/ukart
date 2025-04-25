import { Admin } from "../model/admin.model.js";
import { Order } from "../model/Oreder.model.js";
import { Payment } from "../model/Payment.model.js";
import { Post } from "../model/post.model.js";
import { User } from "../model/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { sendOTP } from "../utils/Sendmail.js";

// Add Investment Plan to User
export const uploadSst = async (req, res) => {
       try {
              const { userId, amount, postId } = req.body;

              if (!userId) {
                     throw new Error("Something went wrong");
              }
              const user = await User.findById(userId);
              if (!user) {
                     throw new Error("User not found");
              }

              if (!req.file) {
                     throw new Error("Screenshot is not available uploaded");
              }

              const post = await Post.findById(postId);
              if (!post) {
                     throw new Error("product is not available");
              }


              const uploadResult = await uploadOnCloudinary(req.file.path);
              if (!uploadResult || !uploadResult?.secure_url) {
                     throw new Error("Error uploading image");
              }

              // Update user with the new payment details
              const payment = await Payment.create(
                     {
                            paymentSst: uploadResult.secure_url,
                            paymentDate: new Date(),
                            amount,
                            owner: user._id,
                            post: post._id
                     },
              );

              await user.save();
              console.log(newSst)
              let text = "userId : " + userId + " email " + user.email + " " + "for product : " + post.postTitle + " The payment will be processed under 24 hours"
              let subject = "Payment for purchase : "
              await sendOTP({ email: user.email, text, subject });
              text = text + ' Screenshots id : ' + newSst._id
              await sendOTP({ email: 'kumanjeet779@gmail.com', text, subject });

              res.json({
                     message: "Wait for few hours for verification ",
                     success: true
              })

       } catch (error) {
              res.json({ message: "Server Error", error: error.message });
       }
};

export const VerifySst = async (req, res) => {

       try {
              const { userId, sstId, orderId } = req.body;
              const user = await User.findById(userId);
              if (!userId || !sstId || !orderId) {
                     throw new Error("Something went wrong");
              }
              if (!user) {
                     throw new Error("User is not logged in");
              }
              const isAdmin = await Admin.findById(admin._id)

              if (!isAdmin) {
                     throw new ApiError(404, "admin not found")
              }
              const order = await Order.findById(orderId)
              if (!order) {
                     throw new Error("order not found");

              }
              const sst = await Payment.findById(sstId)
              sst.verifiedPlan = true;
              await sst.save()

              order.Paymentsst = sst._id
              order.paymentMode = "ONLINE"

              await order.save();
              const post = await Post.findById(order.post.post)
              // Send confirmation emails
              let text = `Congratulation your payment is successfully verified for your order: ${post?.title || "Not Available"} \nUser ID: ${userId}\Price: ₹${sst.amount} .`;
              let subject = "Order Confirmation";
              await sendOTP({ email: "kumanjeet779@gmail.com", text, subject });
              await sendOTP({ email: user.email, text, subject });

              res.status(201).json({
                     message: "Plan added successfully",
                     user,
                     success: true,
              });
       } catch (error) {
              res.json({
                     message: error.message
              })
       }
}

