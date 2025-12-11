// models/wishlist.js
import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Wishlist", wishlistSchema);
