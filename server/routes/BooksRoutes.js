const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  deleteBookById,
  updateBookById,
  getBookByIdOrCode,
} = require("../controllers/bookController");

router.get("/", getAllBooks);
router.get("/:idOrCode", getBookByIdOrCode);
router.delete("/:id", deleteBookById);
router.put("/:id", updateBookById);

module.exports = router;
