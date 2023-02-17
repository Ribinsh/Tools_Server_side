import express from "express";
import {
  authToken,
  doLogin,
  resendOtp,
  sendOtp,
  tokenCheck,
  verifyOtp,
} from "../controller/user/auth.mjs";
import { featuredProduct, getAllProduct, premiumProduct, singleView, toBookProduct } from "../controller/user/userController.mjs";

const router = express.Router();

router.route("/sendOtp").post(sendOtp);

router.route("/verifyOtp").post(verifyOtp);

router.route("/resendOtp").get(resendOtp);

router.route("/doLogin").post(doLogin);

router.route("/tokencheck").get(authToken, tokenCheck);

router.route("/toBookProduct").post(authToken,toBookProduct);

router.route("/featuredProduct").get(featuredProduct);

router.route("/premiumProduct").get(premiumProduct)

router.route("/getAllProduct").get(getAllProduct)

router.route("/singleView/:productId").get(singleView)




export default router;
