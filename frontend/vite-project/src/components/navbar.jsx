import { Link } from "react-router-dom";

function navbar() {

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav>

      <h2>AI Job Portal</h2>

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        {role === "candidate" && (
          <>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>

            <li>
              <Link to="/upload-resume">Upload Resume</Link>
            </li>

            <li>
              <Link to="/resume-analysis">AI Analysis</Link>
            </li>

            <li>
              <Link to="/candidate/dashboard">Dashboard</Link>
            </li>
          </>
        )}

        {role === "recruiter" && (
          <>
            <li>
              <Link to="/create-job">Create Job</Link>
            </li>

            <li>
              <Link to="/recruiter/dashboard">Dashboard</Link>
            </li>
          </>
        )}

        <li>
          <button onClick={logout}>
            Logout
          </button>
        </li>

      </ul>

    </nav>
  );
}

export default navbar;