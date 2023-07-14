const express = require("express");
const app = express();
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
require("dotenv").config();
app.use(cors());

//route
app.use(express.json());
app.use("/", studentRoutes);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
