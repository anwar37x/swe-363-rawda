const express = require("express");
const router = express.Router();

const {
    getReportedPosts,
    deletePost,
    resolvePost,
} = require("../controllers/forumController");

router.get("/", getReportedPosts);
router.delete("/:id", deletePost);
router.put("/:id/resolve", resolvePost);

module.exports = router;