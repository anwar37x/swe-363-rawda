const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            required: true,
        },

        author: {
            type: String,
            default: "Anonymous",
        },

        tags: {
            type: [String],
            default: [],
        },

        reports: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            enum: ["Active", "Warned"],
            default: "Active",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);