import express from "express";
import { addCategory, getCategories, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import userAuthCheck from "../middlewares/authCheck.js";
import upload from "../middlewares/fileUpload.js";

const categoryRouter = express.Router();

categoryRouter.get("/list", getCategories);

categoryRouter.use(userAuthCheck)

categoryRouter.post("/add",upload.single('image'), addCategory);
categoryRouter.put("/update/:id",upload.single('image'), updateCategory);
categoryRouter.delete("/delete/:id", deleteCategory);

export default categoryRouter;
