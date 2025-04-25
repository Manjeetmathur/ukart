import {Router} from 'express'
import { upload } from '../middleware/multerMiddleware.js'
import { verifyJwt } from '../middleware/authMiddleware.js'
import {  cancelOrder, getPostById , createPost, deletePost, getAllPost, orderItem, getUserCartItem, getorderDetails, addToCart, removeToCart, editPost, changeOrderStatus } from '../controller/post.controller.js'

const router = Router()

router.route("/create-post").post(verifyJwt ,upload.single('postImage'),createPost)
router.route("/delete-post").post(verifyJwt,deletePost)
router.route("/add-cart").post(verifyJwt,addToCart)
router.route("/remove-cart").post(verifyJwt,removeToCart)
router.route("/order-item").post(verifyJwt,orderItem)
router.route("/cancel-order").post(verifyJwt,cancelOrder)
router.route("/get-post").get(getAllPost)
router.route("/get-cart-item").get(verifyJwt,getUserCartItem)
router.route("/get-post-by-id/:postId").get(getPostById)
router.route("/edit-post").patch(verifyJwt,upload.single('postImage'),editPost)
router.route("/edit-order-status").patch(verifyJwt,changeOrderStatus)

router.route("/get-order-details").get( verifyJwt ,getorderDetails)

export default router
