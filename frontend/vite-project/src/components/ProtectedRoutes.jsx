import { Navigate } from "react-router-dom";

function protectedRoute({ children }) {

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default protectedRoute;