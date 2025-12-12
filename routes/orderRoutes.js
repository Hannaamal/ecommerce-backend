import express from "express";
import { createOrder } from "../controllers/orderController.js";
import userAuthCheck from "../middlewares/authCheck.js";

const orderRouter = express.Router();

orderRouter.post("/create", userAuthCheck, createOrder);

export default orderRouter;