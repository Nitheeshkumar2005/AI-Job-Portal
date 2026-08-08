import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
function uploadresume() {

  const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  const uploadResume = async (e) => {

    e.preventDefault();

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
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);
navigate("/resume-analysis");
      console.log(response.data);

    } catch (err) {

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Upload Failed");
      }

    }

  };

  return (
  <>
    <navbar />

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

              {
                resume &&
                <span className="file-name">
                  {resume.name}
                </span>
              }

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

export default uploadresume;