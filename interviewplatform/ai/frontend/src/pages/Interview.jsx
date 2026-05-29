import { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { evaluateAnswer } from "../api/evaluateApi";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

function Interview() {
  const navigate = useNavigate();

  // ================= STATE =================
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [allResults, setAllResults] = useState([]);

  const [timeLeft, setTimeLeft] = useState(900); // 15 min
  const [listening, setListening] = useState(false);
  const [evaluating, setEvaluating] = useState(false);

  const recognitionRef = useRef(null);

  const currentQ = questions?.[currentQuestion];

  // ================= PREVENT PAGE REFRESH =================
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // ================= FETCH QUESTIONS =================
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);

        const category = localStorage.getItem("selectedRole");

        console.log("Selected Category:", category);

        // If no category found
        if (!category) {
          console.log("No category found in localStorage");
          setQuestions([]);
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/api/questions/category/${category}`
        );

        console.log("Questions:", response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
          setQuestions(response.data);
        } else {
          console.log("No questions returned from backend");
          setQuestions([]);
        }
      } catch (error) {
        console.error("Question Fetch Error:", error);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // ================= SPEECH RECOGNITION =================
  useEffect(() => {
    if (!SpeechRecognition) {
      console.log("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ");

      setAnswer(transcript);
    };

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch (error) {
        console.log("Speech cleanup error:", error);
      }
    };
  }, []);

  // ================= TIMER =================
  useEffect(() => {
    if (loading) return;

    if (timeLeft <= 0) {
      navigate("/result");
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, loading, navigate]);

  // ================= FORMAT TIME =================
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // ================= SPEECH CONTROL =================
  const startListening = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition is not supported in your browser.");
      return;
    }

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.log("Speech already running");
    }
  };

  const stopListening = () => {
    try {
      recognitionRef.current?.stop();
    } catch (error) {
      console.log("Speech already stopped");
    }
  };

  // ================= NEXT QUESTION =================
  const nextQuestion = async () => {
    if (evaluating || !currentQ) return;

    stopListening();

    if (!answer.trim() || answer.trim().length < 5) {
      alert("Please provide a proper answer.");
      return;
    }

    setEvaluating(true);

    let result;

    try {
      result = await evaluateAnswer(currentQ.title, answer);
    } catch (error) {
      console.error("Evaluation Error:", error);
      setEvaluating(false);
      alert("Evaluation failed.");
      return;
    }

    setEvaluating(false);

    const updatedResults = [
      ...allResults,
      {
        question: currentQ.title,
        answer,
        score: result?.score || 0,
      },
    ];

    setAllResults(updatedResults);

    // Move to next question
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setAnswer("");
      return;
    }

    // ================= FINAL RESULT =================
    let total = 0;

    updatedResults.forEach((item) => {
      total += Number(item.score || 0);
    });

    const averageScore = Math.round(total / updatedResults.length);

    const finalResult = {
      score: averageScore,
      communication:
        averageScore >= 80
          ? "Excellent"
          : averageScore >= 60
          ? "Good"
          : "Average",
      technical:
        averageScore >= 80
          ? "Strong"
          : averageScore >= 60
          ? "Moderate"
          : "Weak",
      feedback:
        averageScore >= 80
          ? "Excellent performance"
          : averageScore >= 60
          ? "Good but improve technical depth"
          : "Needs improvement",
      details: updatedResults,
    };

    localStorage.setItem(
      "interviewResult",
      JSON.stringify(finalResult)
    );

    // ================= SAVE RESULT TO BACKEND =================
    try {
      await axios.post("http://localhost:8080/api/results", {
        candidateName: localStorage.getItem("userEmail"),
        category: localStorage.getItem("selectedRole"),
        score: averageScore,
        feedback: finalResult.feedback,
        status: averageScore >= 60 ? "PASS" : "FAIL",
      });
    } catch (error) {
      console.error("Failed to save result:", error);
    }

    alert("Interview Completed Successfully!");
    navigate("/result");
  };

  // ================= LOADING UI =================
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#020617",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
        }}
      >
        Loading Questions...
      </div>
    );
  }

  // ================= NO QUESTIONS UI =================
  if (!loading && questions.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#020617",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          fontSize: "24px",
        }}
      >
        <p>No Questions Found</p>
        <p style={{ fontSize: "16px", marginTop: "10px" }}>
          Check if selectedRole matches your database category.
        </p>
      </div>
    );
  }

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  // ================= MAIN UI =================
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "40px",
      }}
    >
      <h1>AI Mock Interview</h1>

      <p>Role: {localStorage.getItem("selectedRole")}</p>

      <p>
        Question {currentQuestion + 1} of {questions.length}
      </p>

      {/* Progress Bar */}
      <div
        style={{
          width: "100%",
          height: "10px",
          background: "#334155",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "10px",
            background: "#38bdf8",
            borderRadius: "10px",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
        }}
      >
        {/* LEFT PANEL */}
        <div
          style={{
            background: "#0f172a",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <Webcam
            audio={false}
            mirrored
            onUserMediaError={() =>
              alert("Camera access denied.")
            }
            style={{
              width: "100%",
              borderRadius: "15px",
            }}
          />

          <p style={{ marginTop: "15px", fontSize: "20px" }}>
            ⏱ {formatTime(timeLeft)}
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div
          style={{
            background: "#0f172a",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h2>{currentQ?.title}</h2>

          <p>Difficulty: {currentQ?.difficulty}</p>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={8}
            placeholder="Type your answer here..."
            style={{
              width: "100%",
              marginTop: "15px",
              padding: "10px",
              borderRadius: "10px",
              resize: "none",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <button
              disabled={evaluating}
              onClick={
                listening ? stopListening : startListening
              }
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {listening ? "Stop" : "Speak"}
            </button>

            <button
              disabled={evaluating || !answer.trim()}
              onClick={nextQuestion}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {evaluating
                ? "Evaluating..."
                : currentQuestion < questions.length - 1
                ? "Next Question"
                : "Finish Interview"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;