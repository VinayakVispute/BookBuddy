const {
        deallocateBookFromStudent,
        allocateBookToStudent,getAllBooksAllocatedByStudent
} = require('../controllers/allocationController')

const express = require("express")
const router = express.Router();

router.post('/:bookId/deallocate/:studentId',deallocateBookFromStudent).post('/:bookId/allocate/:studentId', allocateBookToStudent);
router.get("/allocated/:studentId",getAllBooksAllocatedByStudent)


module.exports = router;
