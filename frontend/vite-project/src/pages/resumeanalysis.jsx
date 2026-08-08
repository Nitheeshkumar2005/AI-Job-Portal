import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Navbar from "../components/navbar";

function resumeAnalysis() {

  const [analysis, setAnalysis] = useState("");

  const analyzeResume = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axiosInstance.post(
        "/ai/analyze",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalysis(response.data.analysis);

    } catch (err) {

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Analysis Failed");
      }

    }

  };

return (
  <>
    <Navbar />

    <div className="analysis-container">

      <div className="analysis-card">

        <h1>🤖 AI Resume Analysis</h1>

        <p className="analysis-subtitle">
          Let Artificial Intelligence analyze your resume and provide professional career suggestions.
        </p>

        <button
          className="analysis-btn"
          onClick={analyzeResume}
        >
          🚀 Analyze Resume
        </button>

        {
          analysis && (

            <div className="analysis-result">

              <h2>AI Report</h2>

              <pre>{analysis}</pre>

            </div>

          )
        }

      </div>

    </div>

  </>
);
}

export default resumeAnalysis;