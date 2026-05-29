import axios from "axios";
import toast from "react-hot-toast";

// ========================================
// BASE URL
// ========================================

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080";

// ========================================
// AXIOS INSTANCE
// ========================================

const axiosInstance = axios.create({
  baseURL: BASE_URL,

  timeout: 15000,

  headers: {
    "Content-Type": "application/json",
  },
});

// ========================================
// REQUEST INTERCEPTOR
// ========================================

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// ========================================
// RESPONSE INTERCEPTOR
// ========================================

axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    const status =
      error?.response?.status;

    const message =
      error?.response?.data?.message ||
      error?.response?.data ||
      error.message ||
      "Something went wrong";

    // ========================================
    // AUTO LOGOUT ON 401
    // ========================================

    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.error(
        "Session expired. Please login again."
      );

      setTimeout(() => {
        window.location.href =
          "/login";
      }, 1200);
    }

    // ========================================
    // HANDLE SERVER ERRORS
    // ========================================

    if (status === 500) {
      toast.error(
        "Internal server error"
      );
    }

    // ========================================
    // HANDLE NETWORK ERRORS
    // ========================================

    if (
      error.code === "ECONNABORTED" ||
      error.message === "Network Error"
    ) {
      toast.error(
        "Network error. Please check your connection."
      );
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;