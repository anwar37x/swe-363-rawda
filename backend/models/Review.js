const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        storeName: {
            type: String,
            required: true,
            trim: true,
        },
        reviewer: {
            type: String,
            required: true,
            trim: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        text: {
            type: String,
            required: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        flagged: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);