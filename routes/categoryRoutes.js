import express from "express";
import { addCategory, getCategories, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import userAuthCheck from "../middlewares/authCheck.js";

const categoryRouter = express.Router();

categoryRouter.get("/list", getCategories);

categoryRouter.use(userAuthCheck)

categoryRouter.post("/add", addCategory);
categoryRouter.put("/update/:id", updateCategory);
categoryRouter.delete("/delete/:id", deleteCategory);

export default categoryRouter;
