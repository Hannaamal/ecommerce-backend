import Category from "../model/category.js";

// Add Category
export const addCategory = async (req, res) => {
  try {
    const { title } = req.body;

    // 👇 IMPORTANT: file path from Multer
    const imagePath = req.file ? req.file.path : "";

    const category = await Category.create({
      title,
      image: imagePath,
    });
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const { title } = req.body;

    // first get existing category from db
    const existing = await Category.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: "Not found" });

    let imagePath = existing.image; // keep old image

    // if new file uploaded → replace old one
    if (req.file) {
      imagePath = req.file.path;
    }

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { title, image: imagePath },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

