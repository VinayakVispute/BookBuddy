const Category = require("../models/categoryModel");

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Categories",
      error: error.message,
    });
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch {
    console.error("Error deleting Category:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Category",
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if a category with the same name already exists
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category with this name already exists.",
      });
    }

    const newCategory = await Category.create({ name });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error creating Category:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Category",
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  deleteCategoryById,
  getAllCategory,
};
