const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const testSchema = mongoose.Schema({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  questions: [questionSchema],
});

const creatorSchema = mongoose.Schema({
  creatorId: {
    type: String,
    required: true,
  },
  tests: [testSchema],
});

module.exports = mongoose.model("Mcq", creatorSchema);
