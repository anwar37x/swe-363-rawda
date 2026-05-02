const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
    name: String,
    price: Number,
    currency: { type: String, default: "SAR" },
    features: [String],
    activeUsers: Number,
});

module.exports = mongoose.model("Subscription", subscriptionSchema);