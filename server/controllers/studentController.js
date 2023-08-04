const bcrypt = require("bcrypt");
const User = require("../models/studentModel");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const response = (req, res) => {
  console.log(req);
  res.send("Done");
};

const getStudent = async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await User.findOne({ _id: studentId });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ student });
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await User.find();
    res.json({ students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllocationHistoryForStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate({
      path: "allocationHistory",
      populate: {
        path: "book",
        select: "title author genre",
      },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student.allocationHistory);
  } catch (error) {
    res.status(500).json({ error: "Failed to get allocation history" });
  }
};

const updateStudent = async (req, res) => {
  const { studentId } = req.params;
  const updatedData = req.body;

  try {
    // Find the student by ID
    const student = await User.findOne({ _id: studentId });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Update the student data
    Object.assign(student, updatedData);

    // Save the updated student document
    await student.save();

    res.json({ student });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteStudent = async (req, res) => {
  const { studentId } = req.params;
  try {
    // Find the student by ID
    const student = await User.findOne({ _id: studentId });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Delete the student
    await student.remove();

    // Delete allocation history associated with the student
    await AllocationHistory.deleteMany({ student: studentId });

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  response,
  deleteStudent,
  updateStudent,
  getAllStudents,
  getStudent,
  getAllocationHistoryForStudent,
};
