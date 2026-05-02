const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["admin", "gardener", "expert", "store"],
            default: "gardener",
        },

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active",
        },

        // Expert application fields
        yearsExperience: {
            type: Number,
            default: 0,
        },

        bio: {
            type: String,
            default: "",
        },

        certificates: {
            type: [String],
            default: [],
        },

        expertStatus: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);