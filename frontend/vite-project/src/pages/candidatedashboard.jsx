import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Navbar from "../components/navbar";

function candidateDashboard() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axiosInstance.get("/applications/my", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

      setApplications(response.data.applications);

    } catch (err) {
      console.log(err);
    }

  };

  return (
  <>
    <Navbar />

    <div className="dashboard-container">

      <h1>My Applications</h1>

      <p className="dashboard-subtitle">
        Track every job you've applied for in one place.
      </p>

      <div className="dashboard-grid">

        {applications.map((application) => (

          <div className="application-card" key={application._id}>

            <h2>{application.job.title}</h2>

            <p>
              <strong>Company</strong>
              <span>{application.job.company}</span>
            </p>

            <p>
              <strong>Status</strong>

              <span className={`status ${application.status.toLowerCase()}`}>
                {application.status}
              </span>

            </p>

          </div>

        ))}

      </div>

    </div>

  </>
);
}

export default candidateDashboard;