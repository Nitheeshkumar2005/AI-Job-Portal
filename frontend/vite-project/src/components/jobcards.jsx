import { useNavigate } from "react-router-dom";

function jobcards({ job }) {

  const navigate = useNavigate();

  return (

    <div className="job-card">

      <div className="company-logo">
        💼
      </div>

      <h2>{job.title}</h2>

      <p>
        <strong>Company</strong>
        <span>{job.company}</span>
      </p>

      <p>
        <strong>Location</strong>
        <span>{job.location}</span>
      </p>

      <p>
        <strong>Salary</strong>
        <span>₹{job.salary}</span>
      </p>

      <p>
        <strong>Experience</strong>
        <span>{job.experience}</span>
      </p>

      <button
      onClick={() => navigate(`/jobs/${job._id}`)}
      >
        View Details →
      </button>

    </div>

  );

}

export default jobcards;