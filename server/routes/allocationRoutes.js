const express = require("express");
const router = express.Router();

const {
  allocateBookToStudent,
  returnBookByStudent,
  getPastAllocatedBooksByStudentId,
  getCurrentAllocatedBooksByStudentId,
  getAllAllocationHistoryByStudentId,
} = require("../controllers/allocationHistoryController");

// Allocate a book to a student
router.post("/allocate/:studentId/:bookId", allocateBookToStudent);

// Return a book by a student
router.post("/return/:studentId/:bookId", returnBookByStudent);
router.get(
  "/allocation-history/:studentId",
  getAllAllocationHistoryByStudentId
);

// Get currently allocated books for a student
router.get(
  "/current-allocations/:studentId",
  getCurrentAllocatedBooksByStudentId
);

// Get past allocated books for a student
router.get("/past-allocations/:studentId", getPastAllocatedBooksByStudentId);

module.exports = router;
