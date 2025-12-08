import express from "express";
import { getAllUsers, updateUser } from "../controllers/userController.js";
import { toggleStatus } from "../controllers/userController.js";

const userRouter = express.Router();


// GET all users
userRouter.get("/", getAllUsers);

// Update user
userRouter.put("/:id", updateUser);

// Toggle status
userRouter.put("/:id/status", toggleStatus);

export default userRouter;