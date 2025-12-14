import express from "express";
import { getMyOrders } from "../controllers/orderController.js";
import userAuthCheck from "../middlewares/authCheck.js";

const MyorderRouter = express.Router();

MyorderRouter.get("/my-orders", userAuthCheck, getMyOrders);

export default MyorderRouter;
