import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function jobdetails() {

  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {

    try {

      const response = await axiosInstance.get(`/jobs/${id}`);

      setJob(response.data.job);

      
console.log(response.data);


    } catch (err) {

      console.log(err);

    }

  };


  const applyJob = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await axiosInstance.post(
            "/applications/apply",
            {
                job: job._id
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert(response.data.message);
        

    }
    catch(err){

        if(err.response){
            alert(err.response.data.message);
        }
        else{
            alert("Something went wrong");
        }

    }

}

  if (!job) {
    return <h2>Loading...</h2>;
  }

 return (
  <div className="details-container">

    <div className="details-card">

      <h1>{job.title}</h1>

      <div className="job-meta">

        <div className="meta-card">
          <h4>Company</h4>
          <p>{job.company}</p>
        </div>

        <div className="meta-card">
          <h4>Location</h4>
          <p>{job.location}</p>
        </div>

        <div className="meta-card">
          <h4>Salary</h4>
          <p>₹{job.salary}</p>
        </div>

        <div className="meta-card">
          <h4>Experience</h4>
          <p>{job.experience}</p>
        </div>

        <div className="meta-card">
          <h4>Job Type</h4>
          <p>{job.jobType}</p>
        </div>

      </div>

      <div className="description-box">

        <h2>Job Description</h2>

        <p>{job.description}</p>

      </div>

      <button
        className="apply-btn"
        onClick={applyJob}
      >
        🚀 Apply Now
      </button>

    </div>

  </div>
);
}

export default jobdetails;