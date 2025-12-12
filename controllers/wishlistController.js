import Wishlist from "../model/wishlist.js";
import Product from "../model/product.js";

// ADD to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { product_id } = req.body;
    const userId = req.userData.userId; // assuming you have auth middleware

    const exists = await Wishlist.findOne({ product_id, user: userId });
    if (exists) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    const wishItem = new Wishlist({ product_id, user: userId });
    await wishItem.save();

    res.status(201).json({ message: "Added to wishlist", wishItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET Wishlist Items
export const getWishlist = async (req, res) => {
  try {
    const userId = req.userData.userId;

    const items = await Wishlist.find({ user: userId }).populate({
      path: "product_id",
      select: "_id product_name price brand image",
    });

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// REMOVE from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    await Wishlist.findByIdAndDelete(id);
    res.status(200).json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
