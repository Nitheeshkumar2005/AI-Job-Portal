import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Jobs from "./pages/jobs";
import JobDetails from "./pages/jobdetails";
import CandidateDashboard from "./pages/candidatedashboard";
import RecruiterDashboard from "./pages/recruiterdashboard";
import UploadResume from "./pages/uploadresume";
import ResumeAnalysis from "./pages/resumeanalysis";
import CreateJob from "./pages/createjob";
import Applicants from "./pages/applicants";
import NotFound from "./pages/notfound";

import ProtectedRoute from "./components/protectedroutes";

function App() {
  return (
    <Routes>

      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Jobs */}
      <Route path="/jobs" element={<Jobs />} />

      <Route path="/jobs/:id" element={<JobDetails />} />

      {/* Candidate Dashboard */}
      <Route
        path="/candidate/dashboard"
        element={
          <ProtectedRoute>
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />

      {/* Recruiter Dashboard */}
      <Route
        path="/recruiter/dashboard"
        element={
          <ProtectedRoute>
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />

      {/* Upload Resume */}
      <Route
        path="/upload-resume"
        element={
          <ProtectedRoute>
            <UploadResume />
          </ProtectedRoute>
        }
      />

      {/* Resume Analysis */}
      <Route
        path="/resume-analysis"
        element={
          <ProtectedRoute>
            <ResumeAnalysis />
          </ProtectedRoute>
        }
      />

      {/* Create Job */}
      <Route
        path="/create-job"
        element={
          <ProtectedRoute>
            <CreateJob />
          </ProtectedRoute>
        }
      />

      {/* Applicants */}
      <Route
        path="/applicants"
        element={<Applicants />}
      />

      {/* 404 */}
      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default App;