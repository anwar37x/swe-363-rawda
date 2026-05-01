const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: { type: Number, default: 0 },
    answers: [answerSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);