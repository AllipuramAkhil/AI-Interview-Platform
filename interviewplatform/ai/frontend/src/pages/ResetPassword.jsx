import { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/reset-password",
        {
          email,
          otp,
          newPassword,
        }
      );

      setMessage("Password Reset Successful");

setTimeout(() => {
  window.location.href = "/login";
}, 2000);
    } catch (error) {
      setMessage(
  error.response?.data || "Reset Failed"
);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleResetPassword}
        style={{
          width: "400px",
          background: "#0f172a",
          padding: "40px",
          borderRadius: "20px",
          color: "white",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Reset Password</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "93%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            marginBottom: "15px",
          }}
        />

        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          style={{
            width: "93%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{
            width: "93%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            marginBottom: "20px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "93%",
            padding: "14px",
            border: "none",
            borderRadius: "10px",
            background: "#16a34a",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Reset Password
        </button>

        <p style={{ marginTop: "20px" }}>{message}</p>
      </form>
    </div>
  );
}

export default ResetPassword;