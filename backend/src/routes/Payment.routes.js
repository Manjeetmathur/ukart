import {Router} from 'express'
import { upload } from '../middleware/multerMiddleware.js'
import { verifyJwt } from '../middleware/authMiddleware.js'
import { uploadSst, VerifySst } from '../controller/Payemt.controller.js'


const router = Router()

router.route("/upload-sst").post(verifyJwt ,upload.single('paymentSst'),uploadSst)
router.route("/verify-payment").post(verifyJwt,VerifySst)


export default router
