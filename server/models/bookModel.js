const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  genre: { type: String, required: true },
  isAllocated: { type: Boolean, default: false },
  allocatedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    default: null,
  },
});

module.exports = mongoose.model("Book", bookSchema);
