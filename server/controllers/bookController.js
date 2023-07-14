const Book = require("../models/bookModel");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
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

const addBook = async (req, res) => {
  try {
    const { title, author, description, code, genre } = req.body;

    // Create a new book object
    
    const file = req.files.imageUrl;
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    console.log("Uploading to Cloudinary");
    const response = await uploadFileToCloudinary(file, "Book")
const newBook = await Book.create({
  title,
  author,
  description,
  code,
  genre,
  isAllocated: false,
  allocatedTo: null,
  imageUrl: response.secure_url,
})
    
    // Save the new book to the database

    return res.status(200).json({
      success: true,
      message: "Book added successfully",
      newBook
    });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add book",
      error: error.message,
    });
  }
};

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

module.exports = {
  getAllBooks,
  deleteBookById,
  updateBookById,
  getBookByIdOrCode,
  addBook,
};
