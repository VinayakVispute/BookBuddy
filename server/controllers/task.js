const Data = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomeError } = require("../errors/custom-error");

const getAllData = asyncWrapper(async (req, res) => {
  const data = await Data.find({});
  res.status(200).json({ data });
});

const getData = asyncWrapper(async (req, res, next) => {
  console.log(req.params);
  const { id: taskID } = req.params;
  const task = await Data.findOne({ id: taskID });
  console.log("Task", task);
  if (!task) {
    return next(createCustomeError(`No Data Found with id: ${taskID}`, 404));
  } else {
    return res.status(200).json({ task });
  }
});

module.exports = {
  getAllData,
  getData,
};
