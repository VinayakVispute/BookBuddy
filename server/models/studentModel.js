const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

// Pre-save hook to generate a random unique ID for the student
studentSchema.pre("save", function (next) {
  if (!this.studentID) {
    this.studentID = uuidv4();
  }
  next();
});

module.exports = mongoose.model("Student", studentSchema);
