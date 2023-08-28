const AllocationHistory = require("../models/allocationHistory");
const Student = require("../models/studentModel");
const Book = require("../models/bookModel");

const allocateBookToStudent = async (req, res) => {
  try {
    const { studentId, bookId } = req.params;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Check if the book is already allocated
    if (book.isAllocated) {
      return res.status(400).json({ error: "Book is already allocated" });
    }

    // Create an allocation history record
    const allocation = new AllocationHistory({
      student: studentId,
      book: bookId,
    });

    // Update book allocation status
    book.isAllocated = true;
    book.allocatedTo = studentId;
    await book.save();

    // Add the allocated book to the student's currentAllocations
    student.currentAllocations.push(allocation);
    await student.save();

    await allocation.save();

    res
      .status(201)
      .json({ message: "Book allocated successfully", allocation });
  } catch (error) {
    console.error("Error allocating book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Return a book by a student
const returnBookByStudent = async (req, res) => {
  try {
    const { studentId, bookId } = req.params;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Check if the book is allocated to the student
    if (!book.isAllocated || book.allocatedTo.toString() !== studentId) {
      return res
        .status(400)
        .json({ error: "Book is not allocated to the student" });
    }

    // Find the allocation history record for the given student and book
    const allocation = await AllocationHistory.findOne({
      student: studentId,
      book: bookId,
      returnDate: null,
    });

    if (!allocation) {
      return res.status(404).json({ error: "Allocation record not found" });
    }

    // Update book allocation status
    book.isAllocated = false;
    book.allocatedTo = null;
    await book.save();

    // Update allocation history record with return date
    allocation.returnDate = new Date();
    await allocation.save();

    res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllAllocationHistoryByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const allocationHistory = await AllocationHistory.find({
      student: studentId,
    })
      .populate("book student")
      .sort({ allocationDate: -1 });

    res.json(allocationHistory);
  } catch (error) {
    res.status(500).json({ error: "Failed to get allocation history" });
  }
};

const getCurrentAllocatedBooksByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const currentAllocations = await AllocationHistory.find({
      student: studentId,
      returnDate: null,
    })
      .populate("book student")
      .sort({ allocationDate: -1 });

    res.json(currentAllocations);
  } catch (error) {
    res.status(500).json({ error: "Failed to get current allocated books" });
  }
};

const getPastAllocatedBooksByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const pastAllocations = await AllocationHistory.find({
      student: studentId,
      returnDate: { $ne: null },
    })
      .populate("book student")
      .sort({ returnDate: -1 });

    res.json(pastAllocations);
  } catch (error) {
    res.status(500).json({ error: "Failed to get past allocated books" });
  }
};
module.exports = {
  allocateBookToStudent,
  returnBookByStudent,
  getPastAllocatedBooksByStudentId,
  getCurrentAllocatedBooksByStudentId,
  getAllAllocationHistoryByStudentId,
};
