const mongoose = require("mongoose");

const mcqUserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model("mcqUser", mcqUserSchema);
