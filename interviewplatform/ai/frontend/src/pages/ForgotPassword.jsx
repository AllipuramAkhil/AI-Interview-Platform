import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/forgot-password",
        { email }
      );

      setMessage(response.data);
    } catch (error) {
      setMessage("Something went wrong");
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
        onSubmit={handleForgotPassword}
        style={{
          width: "400px",
          background: "#0f172a",
          padding: "40px",
          borderRadius: "20px",
          color: "white",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            marginBottom: "20px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Send Reset OTP
        </button>

        <p style={{ marginTop: "20px" }}>{message}</p>
      </form>
    </div>
  );
}

export default ForgotPassword;