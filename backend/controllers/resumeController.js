const Resume = require("../models/resume");

// Upload Resume
const uploadResume = async (req, res) => {

    try {

        // Check authentication
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "User authentication required"
            });
        }

        // Check uploaded file
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a PDF resume"
            });
        }

        const candidate = req.user.id;

        const resume = await Resume.create({

            candidate,

            resumeName: req.file.originalname,

            resumeUrl: req.file.path

        });

        res.status(201).json({

            message: "Resume Uploaded Successfully",

            resume

        });

    } catch (err) {

        console.error("Resume upload error:", err);

        res.status(500).json({

            message: err.message || "Resume upload failed"

        });

    }

};

module.exports = {
    uploadResume
};