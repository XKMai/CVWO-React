import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Create an Axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Backend API URL
  withCredentials: true, // Ensures cookies are sent with requests (important for JWT stored in cookies)
});

// Request interceptor to include JWT token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the JWT access token from cookies (or localStorage, or any other method)
    const token = localStorage.getItem("authToken");

    if (token) {
      // Add Authorization header if token exists
      config.headers["Authorization"] = `Bearer ${token}`;

      // Decode the token to extract the userID (or any other claim you need)
      try {
        const decodedToken = jwtDecode(token);
        const userID = (decodedToken as { user_id: string }).user_id; // Assuming userID is a claim in the token
        console.log("User ID from token:", userID);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    return config;
  },
  (error) => {
    // Handle request errors globally here
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and refresh tokens if needed
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle unauthorized error (403)
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const response = await axiosInstance.post("/refresh-token");
        const { accessToken } = response.data;

        // Save the new access token (e.g., in a cookie)
        document.cookie = `accessToken=${accessToken}`;

        // Retry the original request with the new access token
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // If refreshing the token fails, log the user out
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
