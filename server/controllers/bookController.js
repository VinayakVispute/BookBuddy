const Book = require("../models/bookModel");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch books",
      error: error.message,
    });
  }
};

// Controller method to delete a single book by ID
const deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the book by ID
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete book",
    });
  }
};

// Controller method to update a single book by ID
const updateBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, description, code, genre, imageUrl } = req.body;

    // Find and update the book by ID
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, description, code, genre, imageUrl },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedBook,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update book",
    });
  }
};

// Controller method to get a single book by ID or code
const getBookByIdOrCode = async (req, res) => {
  try {
    const { idOrCode } = req.params;

    // Find the book by either ID or code
    const book = await Book.findOne({
      $or: [{ _id: idOrCode }, { code: idOrCode }],
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error("Error getting book by ID or code:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get book",
    });
  }
};

module.exports = {
  getAllBooks,
  deleteBookById,
  updateBookById,
  getBookByIdOrCode,
};
