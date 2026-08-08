import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

function CreateJob() {

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");

  const createJob = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const response = await axiosInstance.post(
        "/jobs/create-job",
        {
          title,
          company,
          location,
          salary,
          jobType,
          experience,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      setTitle("");
      setCompany("");
      setLocation("");
      setSalary("");
      setJobType("");
      setExperience("");
      setDescription("");

    } catch (err) {

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong");
      }

    }
  };

  return (
  <div className="create-job-container">

    <div className="create-job-card">

      <h1>Create New Job</h1>

      <p className="create-subtitle">
        Fill in the job details to publish a new opportunity.
      </p>

      <form onSubmit={createJob}>

        <div className="form-grid">

          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={(e)=>setCompany(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
          />

          <input
            type="number"
            placeholder="Salary"
            value={salary}
            onChange={(e)=>setSalary(e.target.value)}
          />

          <input
            type="text"
            placeholder="Job Type"
            value={jobType}
            onChange={(e)=>setJobType(e.target.value)}
          />

          <input
            type="text"
            placeholder="Experience"
            value={experience}
            onChange={(e)=>setExperience(e.target.value)}
          />

        </div>

        <textarea
          placeholder="Job Description..."
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <button className="create-btn" type="submit">
          🚀 Publish Job
        </button>

      </form>

    </div>

  </div>
);
}

export default CreateJob;