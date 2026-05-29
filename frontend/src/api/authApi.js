import axiosInstance from "./axiosInstance";

// ========================================
// AUTH API SERVICE
// ========================================

// ---------------- LOGIN ----------------

export const loginUser = async (
  loginData
) => {
  const response =
    await axiosInstance.post(
      "/api/users/login",
      loginData
    );

  return response.data;
};

// -------------- REGISTER ---------------

export const registerUser =
  async (registerData) => {
    const response =
      await axiosInstance.post(
        "/api/users/register",
        registerData
      );

    return response.data;
  };

// -------------- VERIFY OTP -------------

export const verifyOtp = async (
  otpData
) => {
  const response =
    await axiosInstance.post(
      "/api/users/verify-otp",
      otpData
    );

  return response.data;
};

// -------------- RESEND OTP -------------

export const resendOtp = async (
  emailData
) => {
  const response =
    await axiosInstance.post(
      "/api/users/resend-otp",
      emailData
    );

  return response.data;
};

// ----------- FORGOT PASSWORD -----------

export const forgotPassword =
  async (emailData) => {
    const response =
      await axiosInstance.post(
        "/api/users/forgot-password",
        emailData
      );

    return response.data;
  };

// ------------ RESET PASSWORD -----------

export const resetPassword =
  async (resetData) => {
    const response =
      await axiosInstance.post(
        "/api/users/reset-password",
        resetData
      );

    return response.data;
  };

// ========================================
// TOKEN HELPERS
// ========================================

export const saveAuthData = (
  token,
  user
) => {
  localStorage.setItem(
    "token",
    token
  );

  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );
};

export const getAuthToken = () => {
  return localStorage.getItem(
    "token"
  );
};

export const getCurrentUser = () => {
  const user =
    localStorage.getItem("user");

  return user
    ? JSON.parse(user)
    : null;
};

export const logoutUser = () => {
  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "user"
  );

  window.location.href =
    "/login";
};

// ========================================
// AUTH STATUS CHECK
// ========================================

export const isAuthenticated =
  () => {
    return !!localStorage.getItem(
      "token"
    );
  };