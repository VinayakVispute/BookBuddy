const express = require("express");
const app = express();
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");
const bookRouters = require("./routes/BooksRoutes");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
const fileUpload = require("express-fileupload");
const cloudinary = require("./db/cloudinary");

require("dotenv").config();
app.use(cors());

// Middleware
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes
app.use("/", studentRoutes);
app.use("/books", bookRouters);

// Error handler middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

cloudinary.cloudinaryConnect();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
