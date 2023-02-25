import express from "express";
import { getBookings, getDates } from "../controller/orders/orderController.mjs";
import {  featuredProducts, getAllProducts, premiumProducts } from "../controller/products/productController.mjs";
import {
  
  changePassword,
  doLogin,
 
  resendOtp,
  sendOtp,
  tokenCheck,
  verifyOtp,
} from "../controller/user/auth.mjs";
import { bookProduct, onlinePayment, singleView, toBookProduct } from "../controller/user/userController.mjs";
import { authToken } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

router.route("/sendOtp").post(sendOtp);

router.route("/verifyOtp").post(verifyOtp);

router.route("/resendOtp").get(resendOtp);

router.route("/doLogin").post(doLogin);

router.route("/tokencheck").get(authToken, tokenCheck);

router.route("/toBookProduct").post(authToken,toBookProduct);

router.route("/featuredProduct").get(featuredProducts);

router.route("/premiumProduct").get(premiumProducts)

router.route("/getAllProduct").get(authToken, getAllProducts)

router.route("/singleView/:productId").get( singleView)

router.route("/getDates/:productId").get( getDates)

// router.route("/forgotPassword").post(forgotPassword)

router.route("/changePassword").post(changePassword)

router.route("/bookProduct").post(authToken, bookProduct)

router.route("/getBooking").get(authToken,getBookings)

router.route("/payAmount").post(authToken,onlinePayment)




export default router;
