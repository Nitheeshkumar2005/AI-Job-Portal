const pdfParse = require("pdf-parse");
const groq = require("../utils/groq");
const Resume = require("../models/resume");

const analyzeResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            candidate: req.user.id,
        }).sort({ createdAt: -1 });

        if (!resume) {
            return res.status(404).json({
                message: "Please upload your resume first",
            });
        }

        if (!resume.resumeData) {
            return res.status(404).json({
                message: "Resume data not found",
            });
        }

        // Read PDF directly from MongoDB
        const pdfBuffer = resume.resumeData;

        // Extract text from PDF
        const pdfData = await pdfParse(pdfBuffer);

        const prompt = `
Analyze this resume and provide:

1. Resume Score out of 100
2. Skills
3. Strengths
4. Weaknesses
5. Missing Skills
6. Improvement Suggestions

Resume:

${pdfData.text}
`;

        const completion = await groq.chat.completions.create({
           model: "openai/gpt-oss-120b",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.5,
        });

        return res.status(200).json({
            message: "Resume Analyzed Successfully",
            analysis: completion.choices[0].message.content,
        });

    } catch (err) {
        console.error("Resume Analysis Error:", err);

        return res.status(500).json({
            message: err.message || "Resume analysis failed",
        });
    }
};

module.exports = {
    analyzeResume,
};