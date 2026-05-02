const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
    name: String,
    minAnswers: Number,
    minVerified: Number,
});

module.exports = mongoose.model("Badge", badgeSchema);