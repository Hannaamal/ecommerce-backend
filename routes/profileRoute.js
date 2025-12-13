import express from "express";
import { getProfile, updateProfile, updateProfileImage } from "../controllers/userController.js";
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware.js";

const ProfileRouter = express.Router();
const upload = multer({ dest: "uploads/" }); // Simple storage

ProfileRouter.get("/profile", authMiddleware, getProfile);
ProfileRouter.put("/profile", authMiddleware, updateProfile);
ProfileRouter.put("/profile/image", authMiddleware, upload.single("image"), updateProfileImage);

export default ProfileRouter;