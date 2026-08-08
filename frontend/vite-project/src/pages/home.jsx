import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

function Home() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "candidate";

  return (
    <>
      <Navbar />

      <div className="home">
        <div className="hero hero-center">

          <div className="hero-left">

            <h1>
              {role === "recruiter" ? (
                <>
                  Hire the <span>Best Talent</span> with AI
                </>
              ) : (
                <>
                  Find Your <span>Dream Job</span> with AI
                </>
              )}
            </h1>

            <p>
              {role === "recruiter"
                ? "Post jobs, manage applicants, track applicants and hire smarter using Artificial Intelligence."
                : "Discover thousands of opportunities, upload your resume and let Artificial Intelligence match you with the perfect job."}
            </p>

            <div className="hero-buttons">
              {role === "candidate" ? (
                <>
                  <button onClick={() => navigate("/jobs")}>
                    Explore Jobs
                  </button>

                  <button
                    className="secondary-btn"
                    onClick={() => navigate("/upload-resume")}
                  >
                    Upload Resume
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => navigate("/create-job")}>
                    Create Job
                  </button>

                  <button
                    className="secondary-btn"
                    onClick={() => navigate("/recruiter/dashboard")}
                  >
                    View Applicants
                  </button>
                </>
              )}
            </div>

            <div className="hero-features">

              <div className="feature-card">
                🤖
                <h3>AI Powered</h3>
                <p>Smart resume analysis using AI.</p>
              </div>

              <div className="feature-card">
                💼
                <h3>5000+ Jobs</h3>
                <p>Explore opportunities from top companies.</p>
              </div>

              <div className="feature-card">
                ⭐
                <h3>Trusted Platform</h3>
                <p>Used by recruiters and candidates.</p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Home;
