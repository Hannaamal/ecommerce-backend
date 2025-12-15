import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";
import { check } from "express-validator";
import userAuthCheck from "../middlewares/authCheck.js";


const router = express.Router();

router.post("/add", userAuthCheck,[
  check("product_id").notEmpty().withMessage("Product_id is required"),
  check("quantity").notEmpty().withMessage("quantity  is required").isNumeric().withMessage("must be a number")
], addToCart);          
router.get("/list", userAuthCheck, getCart);  
router.put("/update/:id", userAuthCheck,[
  check("quantity").notEmpty().withMessage("quantity  is required").isNumeric().withMessage("must be a number")
], updateCartItem);              
router.delete("/remove/:id", userAuthCheck, removeFromCart); 
router.delete("/clear", userAuthCheck, clearCart);        

export default router;
