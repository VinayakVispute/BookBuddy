const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentID: {
    type: String,
    required: [true, "Please provide an StudentID!"],
    unique: [true, "StudentID Already Exist"],
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please provide an Name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Already Exist"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide an Phone Number!"],
  },
  role: {
    type: String,
    default: "student",
  },
  imageUrl: {
    type: String,
  },
  currentAllocations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AllocationLog",
      default: null,
    },
  ],
});

// Pre-save hook to generate a random unique ID for the student
studentSchema.pre("save", function (next) {
  if (!this.studentID) {
    this.studentID = uuidv4();
  }
  next();
});

module.exports = mongoose.model("Student", studentSchema);
