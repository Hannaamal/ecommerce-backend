import express from "express";
import { getRevenueOverTime } from "../controllers/adminreportController.js";
import checkAuth from "../middlewares/authCheck.js"; // your auth middleware

const adminreportRouter = express.Router();

// Only admin can access
adminreportRouter.get("/revenue-over-time", checkAuth, getRevenueOverTime);

export default adminreportRouter;