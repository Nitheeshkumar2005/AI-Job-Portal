import { Routes, Route } from "react-router-dom";


import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Jobs from "./pages/jobs";
import JobDetails from "./pages/jobDetails";
import CandidateDashboard from "./pages/candidateDashboard";
import RecruiterDashboard from "./pages/recruiterDashboard";
import UploadResume from "./pages/uploadResume";
import ResumeAnalysis from "./pages/resumeAnalysis";
import CreateJob from "./pages/createJob";
import Applicants from "./pages/applicants";
import NotFound from "./pages/notFound";
import ProtectedRoute from "./components/protectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<home />} />

      <Route path="/login" element={<login />} />

      <Route path="/register" element={<register />} />

      <Route path="/jobs" element={<jobs />} />

      <Route path="/jobs/:id" element={<jobDetails />} />
<Route
    path="/candidate/dashboard"
    element={
        <ProtectedRoute>
            <candidateDashboard />
        </ProtectedRoute>
    }
/>

      <Route
        path="/recruiter/dashboard"
        element={<ProtectedRoute>
          <recruiterDashboard />
        </ProtectedRoute>}
      />

      <Route
        path="/upload-resume"
        element={
        <ProtectedRoute><uploadResume />
        </ProtectedRoute>
        
        }
      />

      <Route
        path="/resume-analysis"
        element={<ProtectedRoute>
          <resumeAnalysis />
        </ProtectedRoute>}
      />

      <Route
        path="/create-job"
        element={
        <ProtectedRoute>
          <createJob />
        </ProtectedRoute>}
      />

      <Route
        path="/applicants"
        element={<applicants />}
      />

      <Route path="*" element={<notfound />} />
    </Routes>
  );
}

export default App;