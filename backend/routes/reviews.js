const express = require("express");
const router = express.Router();

const {
    getReviews,
    updateReview,
    deleteReview,
} = require("../controllers/reviewController");

router.get("/", getReviews);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;