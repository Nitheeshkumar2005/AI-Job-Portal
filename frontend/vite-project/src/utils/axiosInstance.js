import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ai-job-portal-d5qc.onrender.com/api",
});

export default axiosInstance;

// backedn render url: https://ai-job-portal-d5qc.onrender.com