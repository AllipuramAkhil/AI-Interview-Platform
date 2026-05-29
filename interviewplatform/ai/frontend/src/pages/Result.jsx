import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Result() {

  const navigate = useNavigate();

  const [result, setResult] =
    useState(null);

  useEffect(() => {

    const storedResult =
      localStorage.getItem(
        "interviewResult"
      );

    if (storedResult) {

      setResult(
        JSON.parse(storedResult)
      );

    } else {

      navigate("/dashboard");
    }

  }, [navigate]);

  if (!result) {

    return (
      <h1
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Loading Result...
      </h1>
    );
  }

  // ================= STRENGTH / WEAKNESS =================

  let strengths = [];
  let weaknesses = [];

  if (result.score >= 80) {

    strengths.push(
      "Strong technical knowledge"
    );

    strengths.push(
      "Excellent communication"
    );

  } else if (result.score >= 60) {

    strengths.push(
      "Good understanding of concepts"
    );

    weaknesses.push(
      "Need deeper technical explanations"
    );

  } else {

    weaknesses.push(
      "Technical answers are weak"
    );

    weaknesses.push(
      "Improve communication skills"
    );
  }

  // ================= STATUS =================

  const status =
    result.score >= 60
      ? "PASS"
      : "FAIL";

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "40px",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Interview Result
      </h1>

      {/* SCORE CARD */}

      <div
        style={{
          background: "#0f172a",
          padding: "30px",
          borderRadius: "20px",
          marginBottom: "30px",
        }}
      >

        <h2>
          Final Score:
          {result.score}%
        </h2>

        <h2>
          Status:
          <span
            style={{
              color:
                status === "PASS"
                  ? "#22c55e"
                  : "#ef4444",
            }}
          >
            {" "}
            {status}
          </span>
        </h2>

        <p>
          Communication:
          {result.communication}
        </p>

        <p>
          Technical:
          {result.technical}
        </p>

        <p>
          Feedback:
          {result.feedback}
        </p>

      </div>

      {/* ANALYTICS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "20px",
          marginBottom: "30px",
        }}
      >

        {/* STRENGTHS */}

        <div
          style={{
            background: "#0f172a",
            padding: "20px",
            borderRadius: "15px",
          }}
        >

          <h2>
            Strengths
          </h2>

          <ul>

            {strengths.map(
              (item, index) => (

                <li key={index}>
                  {item}
                </li>
              )
            )}

          </ul>

        </div>

        {/* WEAKNESSES */}

        <div
          style={{
            background: "#0f172a",
            padding: "20px",
            borderRadius: "15px",
          }}
        >

          <h2>
            Weaknesses
          </h2>

          <ul>

            {weaknesses.map(
              (item, index) => (

                <li key={index}>
                  {item}
                </li>
              )
            )}

          </ul>

        </div>

      </div>

      {/* QUESTION REVIEW */}

      <div
        style={{
          background: "#0f172a",
          padding: "20px",
          borderRadius: "15px",
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Question Analysis
        </h2>

        {result.details?.map(
          (item, index) => (

            <div
              key={index}
              style={{
                background:
                  "#1e293b",
                padding: "15px",
                borderRadius:
                  "10px",
                marginBottom:
                  "15px",
              }}
            >

              <h3>
                Q{index + 1}:
                {item.question}
              </h3>

              <p>
                <strong>
                  Your Answer:
                </strong>
                {" "}
                {item.answer}
              </p>

              <p>
                <strong>
                  Score:
                </strong>
                {" "}
                {item.score}%
              </p>

              {/* SCORE BAR */}

              <div
                style={{
                  width: "100%",
                  height: "10px",
                  background:
                    "#334155",
                  borderRadius:
                    "10px",
                  marginTop:
                    "10px",
                }}
              >

                <div
                  style={{
                    width:
                      `${item.score}%`,
                    height:
                      "10px",
                    background:
                      item.score >= 60
                        ? "#22c55e"
                        : "#ef4444",
                    borderRadius:
                      "10px",
                  }}
                />

              </div>

            </div>
          )
        )}

      </div>

      {/* BUTTONS */}

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          gap: "20px",
        }}
      >

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          style={{
            padding: "12px 25px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
          }}
        >
          Back to Dashboard
        </button>

        <button
          onClick={() => {

            localStorage.removeItem(
              "interviewResult"
            );

            navigate("/interview");
          }}
          style={{
            padding: "12px 25px",
            border: "none",
            borderRadius: "10px",
            background: "#16a34a",
            color: "white",
            cursor: "pointer",
          }}
        >
          Retake Interview
        </button>

      </div>

    </div>
  );
}

export default Result;