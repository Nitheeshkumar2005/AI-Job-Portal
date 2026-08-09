const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
    {
        candidate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        resumeName: {
            type: String,
            required: true
        },

        resumeData: {
            type: Buffer,
            required: true
        },

        contentType: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Resume", resumeSchema);