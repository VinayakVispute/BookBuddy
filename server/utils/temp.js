const mongoose = require("mongoose");
const Book = require("../models/bookModel");
const BooksData = require("../datasets/FInalData.json");

const cloudinary = require("cloudinary").v2;
const { isFileTypeSupported, uploadFileToCloudinary } = require("./cloudinary");

require("dotenv").config();
// MongoDB connection URI
const mongoURI = process.env.MONGO_URI;
// Connect to MongoDB
MONGO_URI =
  "mongodb+srv://VinayakVispute:Admin%402023@nodejsexpressjsprojects.pbdp0vj.mongodb.net/Hackathon?retryWrites=true&w=majority";
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create an array of dummy books
// const BooksData = [
//   {
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     description: "A novel about the American Dream's unattainability.",
//     code: "GATSBY001",
//     genre: "Classic",
//     imageUrl:
//       "https://res.cloudinary.com/djqjag779/image/upload/v1689330471/Books/jrqemgrsexhah0saladb.jpg",
//   },
//   {
//     title: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     description:
//       "A story of racial injustice and moral growth in the American South.",
//     code: "MOCKING001",
//     genre: "Classic",
//     imageUrl:
//       "https://res.cloudinary.com/djqjag779/image/upload/v1689330471/Books/jrqemgrsexhah0saladb.jpg",
//   },
//   {
//     title: "1984",
//     author: "George Orwell",
//     description: "A dystopian novel exploring the dangers of totalitarianism.",
//     code: "1984001",
//     genre: "Science Fiction",
//     imageUrl:
//       "https://res.cloudinary.com/djqjag779/image/upload/v1689330471/Books/jrqemgrsexhah0saladb.jpg",
//   },
//   {
//     title: "Pride and Prejudice",
//     author: "Jane Austen",
//     description: "A classic novel about love, marriage, and social manners.",
//     code: "PRIDE001",
//     genre: "Romance",
//     imageUrl:
//       "https://res.cloudinary.com/djqjag779/image/upload/v1689330471/Books/jrqemgrsexhah0saladb.jpg",
//   },
//   {
//     title: "The Catcher in the Rye",
//     author: "J.D. Salinger",
//     description: "A coming-of-age novel about teenage angst and alienation.",
//     code: "CATCHER001",
//     genre: "Modern Classic",
//     imageUrl:
//       "https://res.cloudinary.com/djqjag779/image/upload/v1689330471/Books/jrqemgrsexhah0saladb.jpg",
//   },
// ];

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
// addDummyBooks();

cloudinary.config({
  cloud_name: "djqjag779",
  api_key: "835852364697659",
  api_secret: "y5cZQGgNTQJGe2JXJft2PDqI5XE",
});

const uploadImagesToCloudinary = async () => {
  var startIndex = 82;
  while (startIndex <= 214) {
    console.log("startAgain");
    try {
      // Retrieve all documents from the MongoDB collection
      const books = await Book.find();

      // Iterate through the documents and upload images to Cloudinary
      for (let i = startIndex; i < books.length; i++) {
        const book = books[i];
        startIndex++;
        const imageUrl = book.imageUrl;

        // Upload the image to Cloudinary with a specified folder
        const cloudinaryResponse = await cloudinary.uploader.upload(imageUrl, {
          folder: "BookData", // Specify the folder name
        });

        // Update the book document in MongoDB with the Cloudinary URL
        await Book.findByIdAndUpdate(book._id, {
          imageUrl: cloudinaryResponse.secure_url,
        });

        console.log(
          `Uploaded ${book.title}'s image to Cloudinary in the 'BookData' folder`
        );
        console.log(startIndex);
      }

      console.log("Image upload and MongoDB update completed.");
      console.log(startIndex);
    } catch (error) {
      console.error("Error:", error);
    }
    console.log(startIndex);
  }
};

// Call the function to execute the script
uploadImagesToCloudinary();
