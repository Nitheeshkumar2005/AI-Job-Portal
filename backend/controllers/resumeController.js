const Resume = require("../models/Resume");

// Upload Resume
const uploadResume = async (req, res) => {
  try {
    // const { candidate } = req.body;
    const candidate = req.user.id;

    const resume = await Resume.create({
      candidate,
      resumeName: req.file.originalname,
      resumeUrl: req.file.path,
    });

    res.status(201).json({
      message: "Resume Uploaded Successfully",
      resume,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  uploadResume,
};