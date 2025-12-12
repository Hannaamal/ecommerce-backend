import express from "express";
import { getAllUsers, updateUser } from "../controllers/userController.js";
import { getProfile, updateProfile, updateProfileImage } from "../controllers/profileController.js";
import { toggleStatus } from "../controllers/userController.js";
import upload from "../middlewares/fileUpload.js";

const userRouter = express.Router();

userRouter.get("/profile", getProfile);
userRouter.put("/profile", updateProfile);
userRouter.put("/profile/image", upload.single("image"), updateProfileImage);

// GET all users
userRouter.get("/", getAllUsers);

// Update user
userRouter.put("/:id", updateUser);

// Toggle status
userRouter.put("/:id/status", toggleStatus);

export default userRouter;