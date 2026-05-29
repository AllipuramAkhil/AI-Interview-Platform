import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/authApi";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await API.post(
        "/login",
        formData
      );

      const data = response.data;

      if (data.token) {

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "userEmail",
          data.email
        );

        localStorage.setItem(
          "userRole",
          data.role
        );

        setMessage("Login Successful");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);

      } else {

        setMessage(data.message);
      }

    } catch (error) {

      if (error.response?.data?.message) {

        setMessage(error.response.data.message);

      } else {

        setMessage("Login Failed");
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
        onSubmit={handleLogin}
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
          Welcome Back
        </h1>

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
          {loading
            ? "Signing In..."
            : "Login"}
        </button>

        <p
          onClick={() => navigate("/forgot-password")}
          style={{
            color: "#38bdf8",
            textAlign: "center",
            cursor: "pointer",
            marginTop: "-10px",
          }}
        >
          Forgot Password?
        </p>

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

export default Login;