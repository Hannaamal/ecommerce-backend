import express from "express";
import{
  getProducts, getProductById, createProduct, updateProduct, removeProduct
} from "../controllers/productController.js";
import userAuthCheck from "../middlewares/authCheck.js";
import { check } from "express-validator";
import upload from "../middlewares/fileUpload.js";
import { getTopRatedProducts,getBestSellingProducts,getProductCount,getTotalStockCount } from "../controllers/productController.js";



const productRouter = express.Router();
productRouter.get("/total-stock", getTotalStockCount);
productRouter.get("/count", getProductCount);
productRouter.get("/top-rated", getTopRatedProducts);
productRouter.get("/best-selling", getBestSellingProducts)
productRouter.get('/products', getProducts)
productRouter.get('/product/:id', getProductById)

productRouter.use(userAuthCheck)

const createupdatevalidationrule = [
  check("product_name").notEmpty().withMessage("Name is required").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
  check("description").notEmpty().withMessage("description is required").isLength({ min: 3 }).withMessage("description must be at least 3 characters long"),
  check("price").notEmpty().withMessage("price is required"),
  check("stock").notEmpty().withMessage("stock is required").isNumeric().withMessage("must be a number"),
  check("brand").notEmpty().withMessage(" brand,  is required"),
  check("category").notEmpty().withMessage(" category,  is required"),
  
        
 ]; 

productRouter.post('/product' , upload.single('image'), createupdatevalidationrule, createProduct)

productRouter.put('/product/:id',upload.single('image'),createupdatevalidationrule, updateProduct)

productRouter.put('/product/restore/:id', removeProduct)


// Multiple file upload
// productRouter.post('/add', upload.array('attachment', 5), addBook);

export default productRouter