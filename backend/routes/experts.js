const express = require("express");
const router = express.Router();

const {
    getExpertApplications,
    updateExpertStatus,
} = require("../controllers/expertController");

router.get("/", getExpertApplications);
router.put("/:id/status", updateExpertStatus);

module.exports = router;