const express = require("express");

const upload = require("../middlewares/uploadMiddleware");
const { uploadResume } = require("../controllers/resumeController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
    "/upload",
    authMiddleware,
    upload.single("resume"),
    uploadResume
);

module.exports = router;