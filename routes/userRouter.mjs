
import express from "express"
import { authToken, doLogin, sendOtp, tokenCheck, verifyOtp } from "../controller/user/auth.mjs";

const router = express.Router();



router
        .route("/sendOtp")
        .post(sendOtp)


router  
        .route("/verifyOtp")
        .post(verifyOtp)

router 
        .route("/doLogin")
        .post(doLogin)


router 
        .route("/tokencheck")
        .get(authToken,tokenCheck)





// router.post('/signin',controller.doLogin);
// router.post('/otp',controller.sendOtp);
// router.post('/resend',controller.resendOtp)
// router.post('/verify', controller.verify)




export default  router;
