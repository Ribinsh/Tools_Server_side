import express from "express";
import {
  addCategory,
  addProduct,
  adminLogin,
  blockUser,
  changeOrderStatus,
  daySales,
  getgrandOrder,
  getMonthOrders,
  getMonthSales,
  getUserData,
  getUsers,
  listProduct,
  offlinePayment,
  totalProducts,
  totalSales,
  totalUsers,
  unBlockUser,
  unlistProduct,
  updateCategory,
  updateProduct,
} from "../controller/admin/adminController.mjs";
import {
  getCategories,
  getCategoryName,
  getDaySaleReport,
  singleCategory,
} from "../controller/categories/categoryController.mjs";
import {
  getAllOrders,
  getAllOrdersForCalender,
  getOrderDetails,
} from "../controller/orders/orderController.mjs";
import { getAllProducts } from "../controller/products/productController.mjs";

const router = express.Router();

router.route("/adminLogin").post(adminLogin);
router.route("/addCategory").post(addCategory);
router.route("/getCategories").get(getCategories);
router.route("/getCategoryNames").get(getCategoryName);
router.route("/addProduct").post(addProduct);
router.route("/updateProduct/:productId").post(updateProduct);
router.route("/updateCategory/:categoryId").post(updateCategory);
router.route("/getUsersList").get(getUsers);
router.route("/getUserData/:userId").get(getUserData);
router.route("/blockUser/:userId").get(blockUser);
router.route("/unBlockUser/:userId").get(unBlockUser);
router.route("/listProduct/:productId").get(listProduct);
router.route("/unlistProduct/:productId").get(unlistProduct);
router.route("/getAllproducts").get(getAllProducts);
router.route("/getAllBookings").get(getAllOrders);
router.route("/getAllBookingsCalander").get(getAllOrdersForCalender);
router.route("/getOrderDetails/:orderId").get(getOrderDetails);
router.route("/offlinePayment").post(offlinePayment);
router.route("/changeOrderStatus").post(changeOrderStatus);
router.route("/getMonthOrder").get(getMonthSales);
router.route("/getMonthBooking").get(getMonthOrders);
router.route("/getTotalSales").get(totalSales);
router.route("/getTotalUsers").get(totalUsers);
router.route("/getTotalProducts").get(totalProducts);
router.route("/lastSales").get(daySales);
router.route("/lastBookings").get(getgrandOrder);
router.route("/getSingleCategory/:Id").get(singleCategory);
router.route("/getDaySales").post(getDaySaleReport)

export default router;
