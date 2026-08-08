import { Routes, Route } from "react-router-dom";

import home from "./pages/home";
import login from "./pages/login";
import register from "./pages/register";
import jobs from "./pages/jobs";
import jobdetails from "./pages/jobdetails";
import candidatedashboard from "./pages/candidatedashboard";
import recruiterdashboard from "./pages/recruiterdashboard";
import uploadresume from "./pages/uploadresume";
import resumeanalysis from "./pages/resumeanalysis";
import createjob from "./pages/createjob";
import applicants from "./pages/applicants";
import notfound from "./pages/notfound";

import protectedroutes from "./components/protectedroutes";
function App() {
  return (
    <Routes>
      <Route path="/" element={<home />} />

      <Route path="/login" element={<login />} />

      <Route path="/register" element={<register />} />

      <Route path="/jobs" element={<jobs />} />

      <Route path="/jobs/:id" element={<jobdetails />} />
<Route
    path="/candidate/dashboard"
    element={
        <ProtectedRoute>
            <candidatedashboard />
        </ProtectedRoute>
    }
/>

      <Route
        path="/recruiter/dashboard"
        element={<ProtectedRoute>
          <recruiterdashboard />
        </ProtectedRoute>}
      />

      <Route
        path="/upload-resume"
        element={
        <ProtectedRoute><uploadresume />
        </ProtectedRoute>
        
        }
      />

      <Route
        path="/resume-analysis"
        element={<ProtectedRoute>
          <resumeanalysis />
        </ProtectedRoute>}
      />

      <Route
        path="/create-job"
        element={
        <ProtectedRoute>
          <createjob />
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