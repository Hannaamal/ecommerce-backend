import express from "express";
import { getAllOrders, getTotalOrders, updateOrderStatus } from "../controllers/adminorderController.js";
import userAuthCheck from "../middlewares/authCheck.js";
import { getUserStats } from "../controllers/adminorderController.js";

const router = express.Router();

router.get("/total-user", userAuthCheck, getUserStats);
router.get("/total-orders", userAuthCheck, getTotalOrders);

router.get("/orders", userAuthCheck, getAllOrders);

router.patch("/:orderId/status", userAuthCheck, updateOrderStatus);



export default router;