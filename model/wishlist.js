// models/wishlist.js
import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Wishlist", wishlistSchema);
