const Book = require('../models/bookModel');
const Student = require('../models/studentModel');

// Controller method to allocate a book to a student
const allocateBookToStudent = async (req, res) => {
    try {
      const { bookId, studentId } = req.params;
  
      // Find the book and student by their IDs
      const book = await Book.findById(bookId);
      const student = await Student.findOne({ studentID: studentId });
  
      if (!book || !student) {
        return res.status(404).json({
          success: false,
          message: 'Book or student not found',
        });
      }
  
      // Check if the book is already allocated
      if (book.isAllocated) {
        return res.status(400).json({
          success: false,
          message: 'Book is already allocated',
        });
      }
  
      // Allocate the book to the student
      book.isAllocated = true;
      book.allocatedTo = student._id;
      await book.save();
  
      // Update the student's borrowed books list
      student.borrowedBooks.push(book._id);
      await student.save();
  
      res.status(200).json({
        success: true,
        message: 'Book allocated to student successfully',
      });
    } catch (error) {
      console.error('Error allocating book to student:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to allocate book to student',
      });
    }
  };
  

// Controller method to deallocate a book from a student
const deallocateBookFromStudent = async (req, res) => {
  try {
    const { bookId, studentId } = req.params;

    // Find the book and student by their IDs
    const book = await Book.findById(bookId);
    const student = await Student.findOne({ studentID: studentId });


    if (!book || !student) {
      return res.status(404).json({
        success: false,
        message: 'Book or student not found',
      });
    }

    // Check if the book is already deallocated
    if (!book.isAllocated || book.allocatedTo.toString() !== student._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Book is not allocated to this student',
      });
    }

    // Deallocate the book from the student
    book.isAllocated = false;
    book.allocatedTo = null;
    await book.save();

    // Remove the book ID from the student's borrowed books list
    student.borrowedBooks = student.borrowedBooks.filter(
      (bookId) => bookId.toString() !== book._id.toString()
    );
    await student.save();

    res.status(200).json({
      success: true,
      message: 'Book deallocated from student successfully',
    });
  } catch (error) {
    console.error('Error deallocating book from student:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to deallocate book from student',
    });
  }
};

const getAllBooksAllocatedByStudent = async (req, res) => {
    try {
      const { studentId } = req.params;
  
      console.log(studentId)
      // Find the student by ID
      const student = await Student.findOne({ studentID: studentId });
  
      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Student not found",
        });
      }
  
      // Find all books allocated to the student
      const books = await Book.find({ allocatedTo: student._id });
  
      res.status(200).json({
        success: true,
        data: books,
      });
    } catch (error) {
      console.error("Error retrieving allocated books:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve allocated books",
      });
    }
  };


module.exports = {getAllBooksAllocatedByStudent,
  deallocateBookFromStudent,
  allocateBookToStudent,
};
