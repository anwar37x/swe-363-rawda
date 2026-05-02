const express = require("express");
const router = express.Router();

const {
    getAdminStats,
    getRecentActivity,
} = require("../controllers/adminController");

router.get("/stats", getAdminStats);
router.get("/recent-activity", getRecentActivity);

module.exports = router;