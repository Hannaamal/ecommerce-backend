import { validationResult } from "express-validator";
import HttpError from "../helpers/httpError.js";
import Product from "../model/product.js";

// Get all products
export const getProducts = async (req, res, next) => {
  try {
    const { limit = 50, skip = 0, category = "All", q = "" } = req.query;
    const limitNum = parseInt(limit);
    const skipNum = parseInt(skip);

    const query = {
      is_deleted: false,
      stock: { $gt: 0 },
      ...(category !== "All" && { category }),
    };

    if (q) {
      query.product_name = { $regex: q, $options: "i" }; // ✅ match field name correctly
    }

    // console.log(query, 'query')

    const totalCount = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip(skipNum)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      message: "Products listed successfully",
      data: products,
      total: totalCount,
      limit: limitNum,
      skip: skipNum,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Failed to list products",
      data: err.message,
    });
    next(err);
  }
};

export const getTotalStockCount = async (req, res) => {
  try {
    // Only consider products that are not deleted
    const products = await Product.find({ is_deleted: false });

    // Sum all stock values
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);

    res.status(200).json({
      status: true,
      message: "Total stock count fetched",
      totalStock,
    });
  } catch (err) {
    console.error("Error fetching total stock:", err);
    res.status(500).json({
      status: false,
      message: "Error fetching total stock",
      error: err.message,
    });
  }
};



export const getProductCount = async (req, res) => {
  try {
    const total = await Product.countDocuments({ is_deleted: false, stock: { $gt: 0 } });
    res.status(200).json({
      status: true,
      message: "Total product count fetched",
      total
    });
  } catch (err) {
    console.error("Error fetching product count:", err);
    res.status(500).json({
      status: false,
      message: "Error fetching product count",
      error: err.message
    });
  }
};

// ⭐ Get Top Rated Products (minimum 5)
export const getTopRatedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({
      is_deleted: false,
      stock: { $gt: 0 }
    })
      .sort({ rating: -1 })   // ⭐ highest rating first
      .limit(5);              // ⭐ only top 5

    res.status(200).json({
      status: true,
      message: "Top rated products fetched",
      data: products
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error fetching top rated products",
      error: err.message
    });
    next(err);
  }
};
// Get Best Selling Products (lowest price)
// controllers/productController.js

export const getBestSellingProducts = async (req, res) => {
  try {
    const products = await Product.find({ is_deleted: false, stock: { $gt: 0 } })
      .sort({ price: -1 }) // or sold: -1
      .limit(5);

    console.log("Fetched products:", products);

    return res.status(200).json({
      status: true,
      message: "Best selling products fetched",
      data: products,
    });
  } catch (err) {
    console.error("Best selling fetch error:", err);
    return res.status(500).json({
      status: false,
      message: "Error fetching best selling products",
      error: err.message,
    });
    next(err);
  }

};





// Get product by ID
export const getProductById = async (req, res, next) => {
  try {
     const { id} = req.params;
 
    const product = await Product.findById(id);
    if (!product)
       return res.status(404).json({
         status: false,
         message: "Product not found",
         data: null,
       });
       else{
          res.status(200).json({
            status: true,
            message: "Product fetched successfully",
            data: product,
          });
       }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: err.message });
      next(err);
  }
};



//  Create new product
export const createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    console.error("Validation errors:", errors.array()); 
    if(!errors.isEmpty()){
      console.error(errors, 'errors')
      return next(new HttpError("Invalid data inputs passed", 400));
    }else{
      const {userRole} = req.userData
      const imagePath = req.file ? req.file.path :  "uploads/default.png";
      console.log("Request body:", req.body);
      console.log("Request file:", req.file);
  
      console.log(userRole)
  
      if (userRole !== "admin") {
        return next(new HttpError("User not authorized", 401))
      } else {
        const { product_name, description, price, stock, image, brand, category } = req.body;
        const newProduct = { 
          product_name,
          description, 
          price, 
          stock, 
          image:imagePath, 
          brand, 
          category 
        }
        const product = new Product(newProduct);
        await product.save();
        console.error(product);
        if (!product)
          
          return res.status(400).json({
            status: false,
            message: "Invalid product data",
          });
        else{
        res.status(201).json({
          status: true,
          message: "Product created successfully",
          data: product,
          });
        }
      }
    }
  } catch (err) {
    res
      .status(500)
      .json({
        status: false,
        message: "Error creating product",
        error: err.message
      });

    next(err);
    }
};

//  Update product
export const updateProduct = async (req, res, next) => { 
  try {
     const errors = validationResult(req)
    if(!errors.isEmpty()){
      console.error(errors)
      return next(new HttpError("Invalid data inputs passed", 400));
    }else{
    const {userRole} = req.userData
    const {id} = req.params 
    const imagePath = req.file ? req.file.path : null;
    if (userRole !== "admin") {
      return next(new HttpError("User not authorized", 401))
    } else{

        const { product_name, description, price, stock, image, brand, category } = req.body;
        const updatedData = { 
          product_name,
          description, 
          price, 
          stock, 
          image:image,  // req.file ? req.file.path : image || "uploads/default.png"
          brand, 
          category 
        }
        
        // ⭐ If new image exists, update image field
    if (imagePath) {
      updatedData.image = imagePath;
    }

        const product = await Product.findByIdAndUpdate(
          id,
          updatedData,
          {
            new: true,
          });
        if (!product)
           return res.status(404).json({
             status: false,
             message: "Product not found",
             data: null,
           });
        else{
           res.status(200).json({
             status: true,
             message: "Product updated successfully",
             data: product,
           });
        }
      }
    }

  } catch (err) {
    res
      .status(500)
      .json({
        status: false,
        message: "Error updating product",
        error: err.message
      });
    next(err);
  }
};


//  Delete product
// 🧹 Soft Delete Product
export const removeProduct = async (req, res, next) => {
  try {
    const {userRole} = req.userData
    const { id } = req.params;

    if (userRole !== "admin") {
      return next(new HttpError("User not authorized", 401))
    } else{
    const product = await Product.findByIdAndUpdate(
      id,
      { is_deleted: true },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
        data: null,
      });
    }

    res.json({
      status: true,
      message: "Product soft deleted successfully",
      data: product,
    });
  }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error soft deleting product",
      error: err.message,
    });
    next(err);
  }
};
