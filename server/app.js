const express = require("express");
const app = express();

const tasks = require("./routes/task");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");

require("dotenv").config();

//route

app.use("/", tasks);
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
