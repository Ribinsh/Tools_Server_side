import express from "express";
import { adminLogin } from "../controller/admin/adminController.mjs";

const router = express.Router();

router.route("/adminLogin").post(adminLogin);


export default router;
