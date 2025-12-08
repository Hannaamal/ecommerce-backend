import { validationResult } from "express-validator";
import HttpError from "../helpers/httpError.js";
import Product from "../model/product.js";

// GET unique categories with sample product
router.get("/categories", async (req, res) => {
  try {
    const data = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          image: { $first: "$thumbnail" || "$image" }, // adjust based on your schema
          description: { $first: "$description" }
        }
      }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
