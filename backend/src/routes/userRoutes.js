import {Router} from "express"
import { getUserDetails, login, logout, registerUser ,makeUserAdmin, addAddress, phoneNo, deleteAddress, updateAddress, getAddress, getAllUserDetails} from "../controller/userController.js"
import {upload} from "../middleware/multerMiddleware.js"
import { verifyJwt } from "../middleware/authMiddleware.js";

const router = Router();


router.route("/register").post( upload.single("profile") ,registerUser)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/get-user-details").get( verifyJwt ,getUserDetails)
router.route("/get-all-users-details").get( verifyJwt ,getAllUserDetails)
router.route("/make-user-admin").post(makeUserAdmin)
router.route("/add-address").patch( verifyJwt ,addAddress)
router.route("/get-address/:id").get( verifyJwt ,getAddress)
router.route("/delete-address/:addressId").delete( verifyJwt ,deleteAddress)
router.route("/update-address").patch( verifyJwt ,updateAddress)
router.route("/add-phone").patch( verifyJwt ,phoneNo)

export default router
