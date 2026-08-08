import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import navbar from "../components/navbar";

function recruiterDashboard() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axiosInstance.get(
        "/applications/recruiter/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(response.data.applications);

    } catch (err) {
      console.log(err);
    }

  };

  const updateStatus = async (id, status) => {
  try {

    const token = localStorage.getItem("token");

    const response = await axiosInstance.put(
      `/applications/status/${id}`,
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(response.data.message);

    fetchApplicants();

  } catch (err) {
    console.log(err);
  }
};

return (
  <>
    <navbar />

    <div className="recruiter-container">

      <h1>Recruiter Dashboard</h1>

      <p className="recruiter-subtitle">
        Manage job applicants and update their application status.
      </p>

      <div className="recruiter-grid">

        {applications.map((application) => (

          <div
            className="recruiter-card"
            key={application._id}
          >

            <div className="candidate-avatar">
              👨‍💼
            </div>

            <h2>{application.candidate.name}</h2>

            <p>
              <strong>Email</strong>

              <span>{application.candidate.email}</span>
            </p>

            <p>
              <strong>Applied For</strong>

              <span>{application.job.title}</span>
            </p>

            <p>
              <strong>Status</strong>

              <span className={`status ${application.status.toLowerCase()}`}>
                {application.status}
              </span>
            </p>

            <div className="action-buttons">

              <button
                className="accept-btn"
                onClick={() =>
                  updateStatus(application._id,"Accepted")
                }
              >
                ✅ Accept
              </button>

              <button
                className="reject-btn"
                onClick={() =>
                  updateStatus(application._id,"Rejected")
                }
              >
                ❌ Reject
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  </>
);
}

export default recruiterdashboard;