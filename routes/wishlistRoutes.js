import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

const wishlistRouter = express.Router();


wishlistRouter.post("/add", addToWishlist);
wishlistRouter.get("/list", getWishlist);
wishlistRouter.delete("/remove/:id", removeFromWishlist);

export default wishlistRouter;