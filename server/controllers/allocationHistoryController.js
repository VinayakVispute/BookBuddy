const AllocationHistory = require("../models/allocationHistory");

const createAllocation = async (req, res) => {
  try {
    const { bookId, studentId, allocationDate, dueDate } = req.body;

    const allocationLog = await AllocationLog.create({
      book: bookId,
      student: studentId,
      allocationDate,
      dueDate,
    });

    res.status(201).json(allocationLog);
  } catch (error) {
    res.status(500).json;
    {
      {
        error: "Failed to create allocation log";
      }
    }
  }
};

const getAllAllocationHistory = async (req, res) => {
  // Update the function name
  try {
    const allocationHistory = await AllocationHistory.find().populate(
      "book student"
    ); // Update the variable name
    res.json(allocationHistory); // Update the variable name
  } catch (error) {
    res.status(500).json({ error: "Failed to get allocation history" }); // Update the variable name
  }
};

const getAllocationHistoryById = async (req, res) => {
  // Update the function name
  try {
    const allocationHistory = await AllocationHistory.findById(
      req.params.id
    ).populate("book student"); // Update the variable name

    if (!allocationHistory) {
      return res.status(404).json({ error: "Allocation history not found" }); // Update the variable name
    }

    res.json(allocationHistory); // Update the variable name
  } catch (error) {
    res.status(500).json({ error: "Failed to get allocation history" }); // Update the variable name
  }
};

const updateAllocationHistoryById = async (req, res) => {
  // Update the function name
  try {
    const { bookId, studentId, allocationDate, dueDate } = req.body;

    const allocationHistory = await AllocationHistory.findById(req.params.id); // Update the variable name

    if (!allocationHistory) {
      return res.status(404).json({ error: "Allocation history not found" }); // Update the variable name
    }

    allocationHistory.book = bookId;
    allocationHistory.student = studentId;
    allocationHistory.allocationDate = allocationDate;
    allocationHistory.dueDate = dueDate;

    await allocationHistory.save();

    res.json(allocationHistory); // Update the variable name
  } catch (error) {
    res.status(500).json({ error: "Failed to update allocation history" }); // Update the variable name
  }
};

const deleteAllocationHistoryById = async (req, res) => {
  // Update the function name
  try {
    const allocationHistory = await AllocationHistory.findById(req.params.id); // Update the variable name

    if (!allocationHistory) {
      return res.status(404).json({ error: "Allocation history not found" }); // Update the variable name
    }

    await allocationHistory.remove();

    res.json({ message: "Allocation history deleted successfully" }); // Update the variable name
  } catch (error) {
    res.status(500).json({ error: "Failed to delete allocation history" }); // Update the variable name
  }
};

module.exports = {
  createAllocation,
  getAllAllocationHistory,
  getAllocationHistoryById,
  updateAllocationHistoryById,
  deleteAllocationHistoryById,
};
