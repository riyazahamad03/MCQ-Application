const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
  testId: { type: Object, required: true },
  score: { type: Number, required: true },
});

const candidateSchema = mongoose.Schema({
  username: { type: String, required: true },
  tests: [testSchema],
});

module.exports = mongoose.model("Candidate", candidateSchema);
