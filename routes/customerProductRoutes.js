import express from "express";
import {
  getProductsForCustomer,
  getProductDetailsForCustomer,
} from "../controllers/customerProductController.js";

const router = express.Router();

// NO AUTH – PUBLIC
router.get("/products", getProductsForCustomer);
router.get("/products/:id", getProductDetailsForCustomer);

export default router;
