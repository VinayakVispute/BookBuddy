const mongoose = require("mongoose");
const Book = require("../models/bookModel");

require("dotenv").config();
// MongoDB connection URI
const mongoURI = process.env.MONGO_URI;
// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create an array of dummy books
const BooksData = [
  {
    title: "Book 1",
    author: "Author 1",
    description: "Description 1",
    code: "B001",
    genre: "Genre 1",
    isAllocated: false,
    allocatedTo: null,
    imageUrl:
      "https://res.cloudinary.com/djqjag779/image/upload/f_auto,q_auto/v1/Books/jrqemgrsexhah0saladb",
  },
  {
    title: "Book 2",
    author: "Author 2",
    description: "Description 2",
    code: "B002",
    genre: "Genre 2",
    isAllocated: false,
    allocatedTo: null,
    imageUrl:
      "https://res.cloudinary.com/djqjag779/image/upload/f_auto,q_auto/v1/Books/jrqemgrsexhah0saladb",
  },
  {
    title: "Book 3",
    author: "Author 3",
    description: "Description 3",
    code: "B003",
    genre: "Genre 3",
    isAllocated: false,
    allocatedTo: null,
    imageUrl:
      "https://res.cloudinary.com/djqjag779/image/upload/f_auto,q_auto/v1/Books/jrqemgrsexhah0saladb",
  },
  {
    title: "Book 4",
    author: "Author 4",
    description: "Description 4",
    code: "B004",
    genre: "Genre 1",
    isAllocated: false,
    allocatedTo: null,
    imageUrl:
      "https://res.cloudinary.com/djqjag779/image/upload/f_auto,q_auto/v1/Books/jrqemgrsexhah0saladb",
  },
  {
    title: "Book 5",
    author: "Author 5",
    description: "Description 5",
    code: "B005",
    genre: "Genre 2",
    isAllocated: false,
    allocatedTo: null,
    imageUrl:
      "https://res.cloudinary.com/djqjag779/image/upload/f_auto,q_auto/v1/Books/jrqemgrsexhah0saladb",
  },
  {
    title: "Book 6",
    author: "Author 6",
    description: "Description 6",
    code: "B006",
    genre: "Genre 3",
    isAllocated: false,
    allocatedTo: null,
    imageUrl:
      "https://res.cloudinary.com/djqjag779/image/upload/f_auto,q_auto/v1/Books/jrqemgrsexhah0saladb",
  },
  {
    title: "Book 7",
    author: "Author 7",
    description: "Description 7",
    code: "B007",
    genre: "Genre 1",
    isAllocated: false,
    allocatedTo: null,
    imageUrl:
      "https://res.cloudinary.com/djqjag779/image/upload/f_auto,q_auto/v1/Books/jrqemgrsexhah0saladb",
  },
  {
    title: "Book 8",
    author: "Author 8",
    description: "Description 8",
    code: "B008",
    genre: "Genre 2",
    isAllocated: false,
    allocatedTo: null,
    imageUrl:
      "https://res.cloudinary.com/djqjag779/image/upload/f_auto,q_auto/v1/Books/jrqemgrsexhah0saladb",
  },
  {
    title: "Book 9",
    author: "Author 9",
    description: "Description 9",
    code: "B009",
    genre: "Genre 3",
    isAllocated: false,
    allocatedTo: null,
    imageUrl:
      "https://res.cloudinary.com/djqjag779/image/upload/f_auto,q_auto/v1/Books/jrqemgrsexhah0saladb",
  },
  {
    title: "Book 10",
    author: "Author 10",
    description: "Description 10",
    code: "B010",
    genre: "Genre 1",
    isAllocated: false,
    allocatedTo: null,
    imageUrl:
      "https://res.cloudinary.com/djqjag779/image/upload/f_auto,q_auto/v1/Books/jrqemgrsexhah0saladb",
  },
];

// Function to add dummy books to the database
const addDummyBooks = async () => {
  try {
    // Delete existing books in the collection
    await Book.deleteMany();

    // Add the dummy books to the database
    await Book.insertMany(BooksData);

    console.log("Dummy books added to the database.");
  } catch (error) {
    console.error("Error adding dummy books:", error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
};

// Run the script
addDummyBooks();
