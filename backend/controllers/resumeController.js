const Resume = require("../models/resume");

const uploadResume = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "User authentication required"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a PDF resume"
            });
        }

        const resume = await Resume.create({
            candidate: req.user.id,
            resumeName: req.file.originalname,
            resumeData: req.file.buffer,
            contentType: req.file.mimetype
        });

        return res.status(201).json({
            message: "Resume Uploaded Successfully",
            resume: {
                _id: resume._id,
                resumeName: resume.resumeName,
                createdAt: resume.createdAt
            }
        });

    } catch (err) {
        console.error("Resume upload error:", err);

        return res.status(500).json({
            message: err.message || "Resume upload failed"
        });
    }
};

module.exports = {
    uploadResume
};