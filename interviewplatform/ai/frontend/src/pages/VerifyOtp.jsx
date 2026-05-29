import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/authApi";

function VerifyOtp() {

  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("email");

  const handleVerifyOtp = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await API.post(
        "/verify-otp",
        {
          email,
          otp,
        }
      );

      setMessage(response.data);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {

      if (error.response?.data?.message) {

        setMessage(error.response.data.message);

      } else {

        setMessage("OTP Verification Failed");
      }

    } finally {

      setLoading(false);
    }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right, #020617, #0f172a)",
      }}
    >

      <form
        onSubmit={handleVerifyOtp}
        style={{
          width: "400px",
          padding: "40px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >

        <h1
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Verify OTP
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          OTP sent to:
          <br />
          {email}
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value)
          }
          required
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={loading}
          style={buttonStyle}
        >
          {loading
            ? "Verifying..."
            : "Verify OTP"}
        </button>

        {message && (

          <p
            style={{
              color: "#38bdf8",
              textAlign: "center",
            }}
          >
            {message}
          </p>
        )}

      </form>

    </div>
  );
}

const inputStyle = {
  padding: "14px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "14px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#2563eb",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default VerifyOtp;