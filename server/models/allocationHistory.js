const mongoose = require("mongoose");

const allocationHistorySchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  allocationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    default: function () {
      // Set the due date to 2 weeks (14 days) from the allocation date
      const dueDate = new Date(this.allocationDate);
      dueDate.setDate(dueDate.getDate() + 14);
      return dueDate;
    },
  },
  returnDate: {
    type: Date,
  },
});

module.exports = mongoose.model("AllocationHistory", allocationHistorySchema);
