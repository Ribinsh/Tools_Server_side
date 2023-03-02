import express from "express";
import { addCategory, addProduct, adminLogin, blockUser, changeOrderStatus, getUserData, getUsers, listProduct, offlinePayment, unBlockUser, unlistProduct } from "../controller/admin/adminController.mjs";
import { getCategories } from "../controller/categories/categoryController.mjs";
import { getAllOrders, getAllOrdersForCalender, getOrderDetails } from "../controller/orders/orderController.mjs";
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
router.route("/getAllBookings").get(getAllOrders)
router.route("/getAllBookingsCalander").get(getAllOrdersForCalender)
router.route("/getOrderDetails/:orderId").get(getOrderDetails)
router.route("/offlinePayment").post(offlinePayment)
router.route("/changeOrderStatus").post(changeOrderStatus)



export default router;
