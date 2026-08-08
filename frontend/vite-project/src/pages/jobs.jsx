import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import jobcards from "../components/jobCards";
import navbar from "../components/navbar";
import searchbar from "../components/searchbar";

function jobs() {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchJobs();
  }, [page, search, location]);

  const fetchJobs = async () => {

    try {

      const response = await axiosInstance.get(
        `/jobs/getJobs?page=${page}&limit=5&search=${search}&location=${location}`
      );

      setJobs(response.data.jobs);

    } catch (err) {

      console.log(err);

    }

  };

  return (
    <>
      <navbar />

      <div className="jobs-container">

        <h1>Discover Your Next Career Opportunity 🚀</h1>

        <searchbar onSearch={setSearch} />

        <select
          className="location-filter"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="Chennai">Chennai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Mumbai">Mumbai</option>
        </select>

        <div className="jobs-grid">

          {jobs.length === 0 ? (
            <h2>No Jobs Found</h2>
          ) : (
            jobs.map((job) => (
              <jobcards key={job._id} job={job} />
            ))
          )}

        </div>

        <div className="pagination">

          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>

          <span>Page {page}</span>

          <button
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>

        </div>

      </div>
    </>
  );
}

export default jobs;