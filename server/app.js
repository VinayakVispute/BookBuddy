const express = require("express");
const app = express();
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");
const allocationRoutes = require("./routes/allocationRoutes");
const bookRouters = require("./routes/BooksRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
const fileUpload = require("express-fileupload");
const cloudinary = require("./db/cloudinary");
// const allocationRoutes = require("./routes/allocationRoutes");
require("dotenv").config();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5500",
      "https://glittery-raindrop-63e8eb.netlify.app",
    ],
    credentials: true,
  })
);

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
// app.use("/books", allocationRoutes);
app.use("/books", bookRouters);

//authentication
app.use("/", authRoutes);
app.use("/", allocationRoutes);

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
