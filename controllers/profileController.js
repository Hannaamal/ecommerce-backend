import User from "../model/user.js";

// Get current user profile
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userData.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ status: true, data: user });
  } catch (err) {
    next(err);
  }
};

// Update user profile
export const updateProfile = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userData.userId,
      { name, email, phone },
      { new: true }
    ).select("-password");

    res.status(200).json({ status: true, data: user });
  } catch (err) {
    next(err);
  }
};

// Update profile image
export const updateProfileImage = async (req, res, next) => {
  try {
    const imagePath = req.file ? req.file.path : undefined;
    if (!imagePath) return res.status(400).json({ message: "No image uploaded" });

    const user = await User.findByIdAndUpdate(
      req.userData.userId,
      { image: imagePath },
      { new: true }
    ).select("-password");

    res.status(200).json({ status: true, data: user });
  } catch (err) {
    next(err);
  }
};
