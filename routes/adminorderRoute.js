import express from "express";
import { getTotalOrders } from "../controllers/adminorderController.js";
import checkAuth from "../middlewares/authCheck.js";

const router = express.Router();

router.get("/total-orders", checkAuth, getTotalOrders);

export default router;