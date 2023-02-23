import express from "express";
import {
  
  changePassword,
  doLogin,
  forgotPassword,
  resendOtp,
  sendOtp,
  tokenCheck,
  verifyOtp,
} from "../controller/user/auth.mjs";
import { bookProduct, featuredProduct, getAllProduct, getBooking, premiumProduct, singleView, toBookProduct } from "../controller/user/userController.mjs";
import { authToken } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

router.route("/sendOtp").post(sendOtp);

router.route("/verifyOtp").post(verifyOtp);

router.route("/resendOtp").get(resendOtp);

router.route("/doLogin").post(doLogin);

router.route("/tokencheck").get(authToken, tokenCheck);

router.route("/toBookProduct").post(authToken,toBookProduct);

router.route("/featuredProduct").get(featuredProduct);

router.route("/premiumProduct").get(premiumProduct)

router.route("/getAllProduct").get(authToken, getAllProduct)

router.route("/singleView/:productId").get( singleView)

// router.route("/forgotPassword").post(forgotPassword)

router.route("/changePassword").post(changePassword)

router.route("/bookProduct").post(authToken, bookProduct)

router.route("/getBooking").get(authToken,getBooking)




export default router;
