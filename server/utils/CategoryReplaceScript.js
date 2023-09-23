const mongoose = require("mongoose");

const Book = require("../models/bookModel");

// Function to fetch book data
async function fetchBooks() {
  try {
    const response = await fetch("http://localhost:3000/books");
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const books = await response.json();
    console.log("Book Done");
    return books.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

// Function to fetch categories
async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:3000/categories");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const categoriesData = await response.json();
    console.log("Categories Done");
    return categoriesData.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Function to update book genres with category references and save to MongoDB
async function updateBookGenres() {
  const books = await fetchBooks();
  const categories = await fetchCategories();

  // Create a category name to ID map for quick lookup
  console.log(categories);
  const categoryMap = {};
  categories.forEach((category) => {
    categoryMap[category.name] = category._id;
    console.log(category.name);
  });

  // Update book genres with category references
  const updatedBooks = books.map((book) => {
    const categoryID = categoryMap[book.genre];
    if (categoryID) {
      book.genre = categoryID;
    }
    console.log(book.title);
    return book;
  });

  // Connect to MongoDB
  mongoose.connect(
    "mongodb+srv://VinayakVispute:Admin%402023@nodejsexpressjsprojects.pbdp0vj.mongodb.net/Hackathon?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  // Save updated books to the MongoDB database
  let i = 0;
  for (const updatedBook of updatedBooks) {
    await Book.findByIdAndUpdate(updatedBook._id, updatedBook);
    i++;
    console.log(i);
  }

  // Disconnect from MongoDB
  mongoose.disconnect();

  console.log("Updated Books:", updatedBooks);
}

// Call the function to update book genres and save to MongoDB
updateBookGenres();
