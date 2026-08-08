import { Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import CandidateDashboard from "./pages/CandidateDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import UploadResume from "./pages/UploadResume";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import CreateJob from "./pages/CreateJob";
import Applicants from "./pages/Applicants";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/jobs" element={<Jobs />} />

      <Route path="/jobs/:id" element={<JobDetails />} />
<Route
    path="/candidate/dashboard"
    element={
        <ProtectedRoute>
            <CandidateDashboard />
        </ProtectedRoute>
    }
/>

      <Route
        path="/recruiter/dashboard"
        element={<ProtectedRoute>
          <RecruiterDashboard />
        </ProtectedRoute>}
      />

      <Route
        path="/upload-resume"
        element={
        <ProtectedRoute><UploadResume />
        </ProtectedRoute>
        
        }
      />

      <Route
        path="/resume-analysis"
        element={<ProtectedRoute>
          <ResumeAnalysis />
        </ProtectedRoute>}
      />

      <Route
        path="/create-job"
        element={
        <ProtectedRoute>
          <CreateJob />
        </ProtectedRoute>}
      />

      <Route
        path="/applicants"
        element={<Applicants />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;