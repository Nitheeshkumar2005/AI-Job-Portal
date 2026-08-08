import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

alert("Registration Successful! Please Login.");


navigate("/login");
      // Clear Form
      setName("");
      setEmail("");
      setPassword("");
      setRole("candidate");

    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Backend is not running");
      }
    }
  };

  return (
    <div className="register-container">

<div className="register-card">
      <h1>Create Account 🚀</h1>

<p className="register-subtitle">
    Join the AI Job Portal and start your career journey.
</p>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />


        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="candidate">Candidate</option>
          <option value="recruiter">Recruiter</option>
        </select>

        

        <button type="submit">
          Register
        </button>

      </form>
    </div>
    </div>
  );
}

export default Register;