const express = require("express");
const router  = express.Router();

const {
  getQuestions,
  getQuestionById,
  createQuestion,
  likeQuestion,
  bookmarkQuestion,
  likeAnswer,
  answerQuestion,
  verifyAnswer,
} = require("../controllers/questionController");

const { protect }   = require("../middleware/auth");
const { roleCheck } = require("../middleware/roleCheck");

router.get("/",    getQuestions);
router.get("/:id", getQuestionById);

router.post("/",                protect, createQuestion);
router.post("/:id/like",        protect, likeQuestion);
router.post("/:id/bookmark",    protect, bookmarkQuestion);

router.post("/:id/answers",                           protect, roleCheck("expert", "admin"), answerQuestion);
router.post("/:questionId/answers/:answerId/like",    protect, likeAnswer);
router.put("/:questionId/answers/:answerId/verify",   protect, roleCheck("expert", "admin"), verifyAnswer);

module.exports = router;
