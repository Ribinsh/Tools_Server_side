import express from "express";
import { addCategory, addProduct, adminLogin, blockUser, getUserData, getUsers, listProduct, unBlockUser, unlistProduct } from "../controller/admin/adminController.mjs";
import { getCategories } from "../controller/categories/categoryController.mjs";
import { getAllProducts } from "../controller/products/productController.mjs";

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
router.route("/getAllproducts").get(getAllProducts)



export default router;
