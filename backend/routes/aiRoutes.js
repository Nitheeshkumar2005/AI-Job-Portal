const express = require("express");
const { analyzeResume } = require("../controllers/aiController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/analyze", authMiddleware, analyzeResume);

module.exports = router;