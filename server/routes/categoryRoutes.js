const express = require("express");
const router = express.Router();

const {
  createCategory,
  deleteCategoryById,
  getAllCategory,
} = require("../controllers/categoryController");

router.get("/", getAllCategory);
router.post("/", createCategory);
router.delete("/:id", deleteCategoryById);

module.exports = router;
