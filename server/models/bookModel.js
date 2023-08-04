const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title."],
  },
  author: {
    type: String,
    required: [true, "Please provide an author."],
  },
  description: {
    type: String,
    required: [true, "Please provide a description."],
  },
  code: {
    type: String,
    required: [true, "Please provide a code."],
    unique: true,
  },
  genre: {
    type: String,
    required: [true, "Please provide a genre."],
  },
  isAllocated: {
    type: Boolean,
    default: false,
  },
  allocatedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    default: null,
  },
  imageUrl: {
    type: String,
    required: [true, "Please provide an image URL."],
  },
  allocationDate: {
    type: Date,
    default: null,
  },
  dueDate: {
    type: Date,
    default: null,
  },
  currentAllocations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "AllocationLog" },
  ],
  allocationHistory: [
    { type: mongoose.Schema.Types.ObjectId, ref: "AllocationLog" },
  ],
});

module.exports = mongoose.model("Book", bookSchema);
