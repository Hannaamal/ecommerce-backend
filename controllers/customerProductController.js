import mongoose from "mongoose";
import Product from "../model/product.js";
import category from "../model/category.js";

// CUSTOMER → list products
export const getProductsForCustomer = async (req, res) => {
  try {
    const { limit = 50, skip = 0, category = "All", q = "" } = req.query;

    const query = {
      is_deleted: false,
      stock: { $gt: 0 },
    };

    // category filter
    if (category && category !== "All") {
      query.category = new mongoose.Types.ObjectId(category);
    }

    // search
    if (q && q.trim()) {
      query.product_name = { $regex: q.trim(), $options: "i" };
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip(Number(skip))
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .populate("category", "title image");

    res.status(200).json({
      status: true,
      data: products,
      total,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Failed to list products",
      error: err.message,
    });
  }
};

// CUSTOMER → product details
export const getProductDetailsForCustomer = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      is_deleted: false,
    }).populate("category", "title image");

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: true,
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error fetching product",
      error: err.message,
    });
  }
};
