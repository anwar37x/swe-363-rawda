const Review = require("../models/Review");

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch {
        res.status(500).json({ message: "Failed to get reviews" });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const { verified, flagged } = req.body;

        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { verified, flagged },
            { new: true, runValidators: true }
        );

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json(review);
    } catch {
        res.status(400).json({ message: "Failed to update review" });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json({ message: "Review deleted successfully" });
    } catch {
        res.status(400).json({ message: "Failed to delete review" });
    }
};