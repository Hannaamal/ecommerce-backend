import express from "express";
import { createOrder,getMyOrders } from "../controllers/orderController.js";
import userAuthCheck from "../middlewares/authCheck.js";

const orderRouter = express.Router();

orderRouter.post("/create", userAuthCheck, createOrder);
orderRouter.get("/my-orders", userAuthCheck, getMyOrders);

export default orderRouter;