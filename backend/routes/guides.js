const express = require("express");
const router = express.Router();
const { getGuides, getGuideById, createGuide, updateGuide, deleteGuide } = require("../controllers/guideController");
const { protect } = require("../middleware/auth");
const { roleCheck } = require("../middleware/roleCheck");

router.get("/", getGuides);
router.get("/:id", getGuideById);
router.post("/", protect, roleCheck("expert"), createGuide);
router.put("/:id", protect, roleCheck("expert"), updateGuide);
router.delete("/:id", protect, roleCheck("expert"), deleteGuide);

module.exports = router;