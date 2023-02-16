import express from "express";
import { addCategory, addProduct, adminLogin, getCategories } from "../controller/admin/adminController.mjs";

const router = express.Router();

router.route("/adminLogin").post(adminLogin);
router.route("/addCategory").post(addCategory);
router.route("/getCategories").get( getCategories)
router.route("/addProduct").post( addProduct)




export default router;
