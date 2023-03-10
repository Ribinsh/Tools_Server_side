import express from "express";
import {
  getBookings,
  getDates,
} from "../controller/orders/orderController.mjs";
import {
  featuredProducts,
  getAllProducts,
  premiumProducts,
} from "../controller/products/productController.mjs";
import {
  changePassword,
  checkUser,
  doLogin,
  resendOtp,
  sendOtp,
  verifyOtp,
} from "../controller/user/auth.mjs";
import {
  bookProduct,
  onlinePayment,
  singleView,
  toBookProduct,
  updateProfile,
  userProfile,
} from "../controller/user/userController.mjs";
import { authToken } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

router.route("/sendOtp").post(sendOtp);

router.route("/verifyOtp").post(verifyOtp);

router.route("/resendOtp").get(resendOtp);

router.route("/doLogin").post(doLogin);

router.route("/verifyUser").get(authToken, checkUser);

router.route("/toBookProduct").post(authToken, toBookProduct);

router.route("/featuredProduct").get(featuredProducts);

router.route("/premiumProduct").get(premiumProducts);

router.route("/getAllProduct").get(authToken, getAllProducts);

router.route("/singleView/:productId").get(singleView);

router.route("/getDates/:productId").get(getDates);

router.route("/getProfile").get(authToken, userProfile);

router.route("/changePassword").post(changePassword);

router.route("/bookProduct").post(authToken, bookProduct);

router.route("/getBooking").get(authToken, getBookings);

router.route("/payAmount").post(authToken, onlinePayment);

router.route("/updateProfile/:userId").post(authToken,updateProfile)

export default router;
