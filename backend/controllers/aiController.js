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

        const pdfBuffer = resume.resumeData;

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
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.5,
        });

        res.status(200).json({
            message: "Resume Analyzed Successfully",
            analysis: completion.choices[0].message.content,
        });

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

module.exports = {
    analyzeResume,
};