const express = require("express");
const router = express.Router();
const { getQuestions, getQuestionById, answerQuestion, verifyAnswer } = require("../controllers/questionController");
const { protect } = require("../middleware/auth");
const { roleCheck } = require("../middleware/roleCheck");

router.get("/", getQuestions);
router.get("/:id", getQuestionById);
router.post("/:id/answers", protect, roleCheck("expert"), answerQuestion);
router.put("/:questionId/answers/:answerId/verify", protect, roleCheck("expert"), verifyAnswer);

module.exports = router;