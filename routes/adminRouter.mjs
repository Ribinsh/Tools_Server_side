import express from "express";
import { addCategory, addProduct, adminLogin, blockUser, getCategories, getUserData, getUsers, listProduct, unBlockUser, unlistProduct } from "../controller/admin/adminController.mjs";

const router = express.Router();

router.route("/adminLogin").post(adminLogin);
router.route("/addCategory").post(addCategory);
router.route("/getCategories").get( getCategories)
router.route("/addProduct").post( addProduct)
router.route("/getUsersList").get(getUsers)
router.route("/getUserData/:userId").get(getUserData)
router.route("/blockUser/:userId").get(blockUser)
router.route("/unBlockUser/:userId").get(unBlockUser)
router.route("/listProduct/:productId").get(listProduct)
router.route("/unlistProduct/:productId").get(unlistProduct)




export default router;
