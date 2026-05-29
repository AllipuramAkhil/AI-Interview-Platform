import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/authApi";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post(
        "/register",
        formData
      );

      setMessage("Registration Successful");

      localStorage.setItem(
        "email",
        formData.email
      );

      setTimeout(() => {
        navigate("/verify-otp");
      }, 1500);

    } catch (error) {

      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Registration Failed");
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
          "linear-gradient(to right, #0f172a, #020617)",
      }}
    >
      <form
        onSubmit={handleRegister}
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
            marginBottom: "10px",
          }}
        >
          Create Account
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? "Creating..." : "Register"}
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

export default Register;