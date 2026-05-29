import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const email =
    localStorage.getItem("userEmail");

  const role =
    localStorage.getItem("userRole");

  const handleLogout = () => {

    localStorage.clear();

    navigate("/login");
  };

  const startInterview = (
    selectedRole
  ) => {

    localStorage.setItem(
      "selectedRole",
      selectedRole
    );

    navigate("/interview");
  };

  const cardStyle = {
    background:
      "rgba(255,255,255,0.08)",

    border:
      "1px solid rgba(255,255,255,0.1)",

    borderRadius: "20px",

    padding: "25px",

    backdropFilter: "blur(10px)",

    boxShadow:
      "0 8px 32px rgba(0,0,0,0.3)",

    transition: "0.3s",

    cursor: "pointer",
  };

  return (

    <div
      style={{
        minHeight: "100vh",

        display: "flex",

        background:
          "linear-gradient(to right, #020617, #0f172a)",

        color: "white",
      }}
    >

      {/* SIDEBAR */}

      <div
        style={{
          width: "260px",

          background:
            "rgba(255,255,255,0.05)",

          padding: "30px",

          backdropFilter: "blur(10px)",

          borderRight:
            "1px solid rgba(255,255,255,0.1)",
        }}
      >

        <h1
          style={{
            color: "#38bdf8",
            marginBottom: "40px",
          }}
        >
          AI Interview
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            fontSize: "18px",
          }}
        >

          <div>🏠 Dashboard</div>

          <div>🎤 Interviews</div>

          <div>📊 Results</div>

          <button
            onClick={handleLogout}
            style={{
              marginTop: "30px",

              padding: "12px",

              border: "none",

              borderRadius: "10px",

              background: "#ef4444",

              color: "white",

              cursor: "pointer",

              fontWeight: "bold",
            }}
          >
            Logout
          </button>

        </div>

      </div>

      {/* MAIN */}

      <div
        style={{
          flex: 1,
          padding: "40px",
        }}
      >

        {/* TOP */}

        <div
          style={{
            marginBottom: "40px",
          }}
        >

          <h1
            style={{
              fontSize: "42px",
              marginBottom: "10px",
            }}
          >
            Welcome 👋
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              fontSize: "18px",
            }}
          >
            {email}
          </p>

          <p
            style={{
              color: "#38bdf8",
            }}
          >
            Role: {role}
          </p>

        </div>

        {/* ANALYTICS */}

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(3, 1fr)",

            gap: "20px",

            marginBottom: "40px",
          }}
        >

          <div style={cardStyle}>

            <h2>Interviews</h2>

            <h1>12</h1>

          </div>

          <div style={cardStyle}>

            <h2>Average Score</h2>

            <h1>78%</h1>

          </div>

          <div style={cardStyle}>

            <h2>Best Score</h2>

            <h1>92%</h1>

          </div>

        </div>

        {/* INTERVIEW CARDS */}

        <h2
          style={{
            marginBottom: "25px",
            fontSize: "32px",
          }}
        >
          Start New Interview
        </h2>

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",

            gap: "25px",
          }}
        >

          {/* FRONTEND */}

          <div
            style={cardStyle}
            onClick={() =>
              startInterview(
                "frontend"
              )
            }
          >

            <h2>🎨 Frontend</h2>

            <p>
              React, HTML, CSS,
              JavaScript
            </p>

            <button
              style={{
                marginTop: "20px",

                width: "100%",

                padding: "12px",

                border: "none",

                borderRadius: "10px",

                background: "#2563eb",

                color: "white",

                cursor: "pointer",
              }}
            >
              Start Interview
            </button>

          </div>

          {/* BACKEND */}

          <div
            style={cardStyle}
            onClick={() =>
              startInterview(
                "backend"
              )
            }
          >

            <h2>⚙ Backend</h2>

            <p>
              APIs, Spring Boot,
              Database, JWT
            </p>

            <button
              style={{
                marginTop: "20px",

                width: "100%",

                padding: "12px",

                border: "none",

                borderRadius: "10px",

                background: "#16a34a",

                color: "white",

                cursor: "pointer",
              }}
            >
              Start Interview
            </button>

          </div>

          {/* JAVA */}

          <div
            style={cardStyle}
            onClick={() =>
              startInterview("java")
            }
          >

            <h2>☕ Java</h2>

            <p>
              OOP, Collections,
              Multithreading
            </p>

            <button
              style={{
                marginTop: "20px",

                width: "100%",

                padding: "12px",

                border: "none",

                borderRadius: "10px",

                background: "#f59e0b",

                color: "white",

                cursor: "pointer",
              }}
            >
              Start Interview
            </button>

          </div>

          {/* PYTHON */}

          <div
            style={cardStyle}
            onClick={() =>
              startInterview("python")
            }
          >

            <h2>🐍 Python</h2>

            <p>
              Python, APIs,
              scripting, OOP
            </p>

            <button
              style={{
                marginTop: "20px",

                width: "100%",

                padding: "12px",

                border: "none",

                borderRadius: "10px",

                background: "#14b8a6",

                color: "white",

                cursor: "pointer",
              }}
            >
              Start Interview
            </button>

          </div>

          {/* OS */}

          <div
            style={cardStyle}
            onClick={() =>
              startInterview("os")
            }
          >

            <h2>💻 OS</h2>

            <p>
              Processes, Threads,
              CPU Scheduling
            </p>

            <button
              style={{
                marginTop: "20px",

                width: "100%",

                padding: "12px",

                border: "none",

                borderRadius: "10px",

                background: "#8b5cf6",

                color: "white",

                cursor: "pointer",
              }}
            >
              Start Interview
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;