import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axiosInstance.post("/auth/login", {
                email,
                password
            });

           localStorage.setItem("token", response.data.token);

localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

const role = response.data.user.role;



if (role === "candidate") {
  window.location.href = "/candidate/dashboard";
} else {
  window.location.href = "/recruiter/dashboard";
}

            console.log(response.data);

        }
        catch (err) {

            alert(err.response.data.message);

        }

    }

    return (

        <div className="login-container">

  <div className="login-card">

    <h1>Welcome Back 👋</h1>

    <p className="login-subtitle">
      Login to continue your AI Job Portal journey.
    </p>

    

      

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>

            </form>

            <p className="login-footer-text">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>

        </div>
        </div>

    );

}

export default login;