import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";

// POST /api/orders
const OrderRouter = express.Router();
OrderRouter.post("/orderplaced", createOrder);
OrderRouter.get("/placedorder", getOrders);

export default OrderRouter;
