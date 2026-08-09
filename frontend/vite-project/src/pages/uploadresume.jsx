import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function UploadResume() {
    const [resume, setResume] = useState(null);
    const navigate = useNavigate();

    const uploadResume = async (e) => {
        e.preventDefault();

        if (!resume) {
            alert("Please select a resume first");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const formData = new FormData();
            formData.append("resume", resume);

            const response = await axiosInstance.post(
                "/resume/upload",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(response.data.message || "Resume uploaded successfully!");

            console.log("Upload response:", response.data);

            navigate("/resume-analysis");

        } catch (err) {
            console.error("Upload error:", err);

            if (err.response) {
                console.error("Status:", err.response.status);
                console.error("Data:", err.response.data);

                alert(
                    err.response.data?.message ||
                    err.response.data?.error ||
                    `Upload failed (${err.response.status})`
                );
            } else if (err.request) {
                alert("Server did not respond. Please check the Render backend.");
            } else {
                alert("Upload Failed");
            }
        }
    };

    return (
        <>
            <div className="upload-container">

                <div className="upload-card">

                    <h1>Upload Your Resume</h1>

                    <p className="upload-subtitle">
                        Upload your resume in PDF format and let AI analyze your skills.
                    </p>

                    <form onSubmit={uploadResume}>

                        <label className="upload-box">

                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setResume(e.target.files[0])}
                            />

                            <div className="upload-content">

                                <h2>📄</h2>

                                <h3>Select Resume</h3>

                                <p>Only PDF files are supported</p>

                                {resume && (
                                    <span className="file-name">
                                        {resume.name}
                                    </span>
                                )}

                            </div>

                        </label>

                        <button
                            className="upload-btn"
                            type="submit"
                        >
                            🚀 Upload Resume
                        </button>

                    </form>

                </div>

            </div>
        </>
    );
}

export default UploadResume;