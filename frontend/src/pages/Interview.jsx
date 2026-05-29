import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  Brain,
  Mic,
  MicOff,
  Video,
  Shield,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Loader2,
  Terminal,
  Upload,
} from "lucide-react";

import axiosInstance from "../api/axiosInstance";
import { getQuestionsMock } from "../api/mockApi";

import {
  evaluateInterview,
  saveInterviewResult,
  uploadInterviewVideo,
  uploadResume,
  logInterviewViolation,
  retryPendingSaves,
  storePendingInterview,
} from "../api/interviewApi";

import { useInterviewAntiCheat } from "../utils/antiCheatEngine";

import AnimatedBackground from "../components/AnimatedBackground";

function Interview() {
  const navigate =
    useNavigate();

  const videoRef =
    useRef(null);

  const recognitionRef =
    useRef(null);

  const mediaRecorderRef =
    useRef(null);

  const recordedChunksRef =
    useRef([]);

  const roleOptions = [
    "frontend",
    "backend",
    "ai",
    "java",
    "python",
  ];

  const [selectedRole, setSelectedRole] =
    useState(() =>
      localStorage.getItem(
        "selectedRole"
      ) || "frontend"
    );

  const [questions, setQuestions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answer, setAnswer] =
    useState("");

  const [allAnswers, setAllAnswers] =
    useState([]);

  const [listening, setListening] =
    useState(false);

  const [cameraError, setCameraError] =
    useState("");

  const [evaluationLoading, setEvaluationLoading] =
    useState(false);

  const [feedback, setFeedback] =
    useState("");

  const [liveCode, setLiveCode] =
    useState("// Write your solution here\n");

  const [showCodeEditor, setShowCodeEditor] =
    useState(false);

  const [resumeStatus, setResumeStatus] =
    useState("");

  const [resumeUploaded, setResumeUploaded] =
    useState(false);

  const [uploadStatus, setUploadStatus] =
    useState("");

  const {
    violationCounts,
    antiCheatStatus,
    enforceFullscreen,
  } = useInterviewAntiCheat({
    sessionId: `session-${Date.now()}`,
    backendLogger:
      logInterviewViolation,
    config: {
      enableFullscreen: resumeUploaded,
    },
  });

  // ========================================
  // FETCH QUESTIONS
  // ========================================

  const fetchQuestions =
    useCallback(async () => {
      try {
        setLoading(true);
        try {
          const response = await axiosInstance.get(
            `/api/questions/category/${selectedRole}`
          );

          const questionData = Array.isArray(response.data)
            ? response.data
            : Array.isArray(response.data?.questions)
            ? response.data.questions
            : [];

          if (questionData.length === 0) {
            toast.error(`No questions available for ${selectedRole} role`);
          }

          setQuestions(questionData);
        } catch (errFetch) {
          console.warn("Question fetch failed, using mock:", errFetch?.message || errFetch);
          const mock = await getQuestionsMock(selectedRole);
          setQuestions(mock || []);
        }
      } catch (error) {
        console.error(
          "Question fetch error:",
          error
        );

        toast.error(
          `Failed to load questions: ${error?.response?.data?.message || error.message}`
        );

        setQuestions([]);
      } finally {
        setLoading(false);
      }
    }, [selectedRole]);

  useEffect(() => {
    localStorage.setItem(
      "selectedRole",
      selectedRole
    );
    
    // Reset answers and questions when role changes
    setCurrentQuestion(0);
    setAnswer("");
    setAllAnswers([]);
    setResumeUploaded(false);
    
    // Fetch questions for the new role
    void fetchQuestions();
  }, [selectedRole, fetchQuestions]);

  useEffect(() => {
    setCurrentQuestion(0);
    setAllAnswers([]);
    setAnswer("");
  }, [selectedRole]);

  // ========================================
  // CAMERA SETUP
  // ========================================

  const setupCamera =
    useCallback(async () => {
      try {
        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });

        if (videoRef.current) {
          videoRef.current.srcObject =
            stream;
        }

        const recorder =
          new MediaRecorder(stream);

        mediaRecorderRef.current =
          recorder;

        recorder.ondataavailable =
          (event) => {
            if (event.data.size > 0) {
              recordedChunksRef.current.push(
                event.data
              );
            }
          };

        recorder.start();
      } catch (error) {
        console.error(error);

        setCameraError(
          "Camera access denied"
        );
      }
    }, []);

  // ========================================
  // INITIAL LOAD
  // ========================================

  useEffect(() => {
    void setupCamera();
    void retryPendingSaves();
  }, [setupCamera]);

  // ========================================
  // SPEECH RECOGNITION
  // ========================================

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition)
      return;

    const recognition =
      new SpeechRecognition();

    recognition.continuous =
      true;

    recognition.interimResults =
      true;

    recognition.lang =
      "en-US";

    recognition.onresult =
      (event) => {
        const transcript =
          event.results[
            event.results.length - 1
          ][0].transcript;

        setAnswer(
          (prev) =>
            prev + " " + transcript
        );
      };

    recognitionRef.current =
      recognition;
  }, []);

  const startListening = () => {
    try {
      recognitionRef.current?.start();
      setListening(true);
    } catch {
      console.log("already started");
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  // ========================================
  // NEXT QUESTION
  // ========================================

  const nextQuestion = () => {
    const current =
      questions[currentQuestion];

    setAllAnswers((prev) => [
      ...prev,
      {
        question:
          current?.title ||
          "Question",

        answer,
      },
    ]);

    setAnswer("");

    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        (prev) => prev + 1
      );
    } else {
      finishInterview();
    }
  };

  // ========================================
  // FINISH INTERVIEW
  // ========================================

  const finishInterview =
    async () => {
      try {
        setEvaluationLoading(true);

        // Validate we have answers
        if (
          allAnswers.length === 0 &&
          answer.trim() === ""
        ) {
          toast.error(
            "Please provide at least one answer"
          );
          setEvaluationLoading(
            false
          );
          return;
        }

        const finalAnswers = [
          ...allAnswers,
          {
            question:
              questions[
                currentQuestion
              ]?.title ||
              "Final Question",
            answer,
          },
        ];

        const payload = {
          category:
            selectedRole,
          answers:
            finalAnswers,
          code:
            liveCode,
          resumeUploaded:
            resumeUploaded,
        };

        const evaluation =
          await evaluateInterview(
            payload
          );

        setFeedback(
          evaluation.feedback ||
            "Interview completed successfully"
        );

        // Calculate score if not provided
        const score =
          evaluation.score ||
          Math.round(
            (finalAnswers.length /
              questions.length) *
              100
          ) ||
          75;

        let savedResult;

        try {
          const resultPayload = {
            ...evaluation,
            category:
              selectedRole,
            score: score,
            status: "COMPLETED",
            totalQuestions:
              questions.length,
            answeredQuestions:
              finalAnswers.length,
            resumeUploaded:
              resumeUploaded,
            completedAt:
              new Date().toISOString(),
          };

          savedResult =
            await saveInterviewResult(
              resultPayload
            );
        } catch (saveError) {
          console.error(
            "Save interview failed:",
            saveError
          );

          const fallbackResult = {
            ...evaluation,
            category:
              selectedRole,
            status: "COMPLETED",
            score: score,
            summary:
              evaluation.feedback ||
              "Interview completed",
            totalQuestions:
              questions.length,
            answeredQuestions:
              finalAnswers.length,
            resumeUploaded:
              resumeUploaded,
            createdAt:
              new Date().toISOString(),
          };

          storePendingInterview(
            fallbackResult
          );

          savedResult =
            fallbackResult;
        }

        // Get all interview results for average calculation
        const storedResults = JSON.parse(
          localStorage.getItem(
            "interviewResults"
          ) || "[]"
        );

        const allResults = [
          ...storedResults,
          savedResult,
        ];

        // Calculate average score
        const averageScore =
          allResults.length > 0
            ? (
                allResults.reduce(
                  (sum, r) =>
                    sum +
                    (r?.score || 0),
                  0
                ) /
                allResults.length
              ).toFixed(1)
            : 0;

        localStorage.setItem(
          "interviewResults",
          JSON.stringify(
            allResults
          )
        );

        localStorage.setItem(
          "averageScore",
          averageScore
        );

        // Stop recording if in progress
        if (
          mediaRecorderRef.current &&
          mediaRecorderRef.current
            .state !== "inactive"
        ) {
          mediaRecorderRef.current.stop();
        }

        // Upload video recording
        const recordedBlob = new Blob(
          recordedChunksRef.current,
          {
            type: "video/webm",
          }
        );

        if (
          recordedBlob.size > 0
        ) {
          try {
            setUploadStatus(
              "Uploading recording..."
            );

            await uploadInterviewVideo(
              recordedBlob,
              savedResult?.id
            );

            setUploadStatus(
              "Video uploaded successfully"
            );
          } catch (error) {
            console.error(
              "Video upload error:",
              error
            );

            setUploadStatus(
              "Video upload skipped (connection issue)"
            );
          }
        }

        toast.success(
          "Interview completed successfully!"
        );

        navigate(
          "/result",
          {
            state: {
              result:
                savedResult ||
                evaluation,
              averageScore:
                averageScore,
            },
          }
        );
      } catch (error) {
        console.error(
          "Evaluation error:",
          error
        );

        toast.error(
          `Evaluation failed: ${error?.response?.data?.message || error.message}`
        );
      } finally {
        setEvaluationLoading(
          false
        );
      }
    };

  // ========================================
  // RESUME UPLOAD
  // ========================================

  const handleResumeUpload =
    async (event) => {
      const file =
        event.target.files[0];

      if (!file) return;

      // Validate file size (max 5MB)
      if (
        file.size >
        5 * 1024 * 1024
      ) {
        toast.error(
          "Resume file too large (max 5MB)"
        );
        return;
      }

      // Validate file type
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (
        !validTypes.includes(
          file.type
        )
      ) {
        toast.error(
          "Invalid file type. Please upload PDF or Word document."
        );
        return;
      }

      try {
        setResumeStatus(
          "Uploading resume..."
        );

        const result =
          await uploadResume(file);

        setResumeStatus(
          "Resume uploaded successfully"
        );
        setResumeUploaded(true);

        // Store resume info in localStorage
        localStorage.setItem(
          "resumeUploaded",
          JSON.stringify({
            filename: file.name,
            timestamp:
              new Date().toISOString(),
            id: result?.id || null,
          })
        );

        toast.success(
          "Resume uploaded! You can now proceed with the interview."
        );
      } catch (error) {
        console.error(
          "Resume upload error:",
          error
        );

        setResumeStatus(
          `Upload failed: ${error?.response?.data?.message || error.message}`
        );

        toast.error(
          "Failed to upload resume"
        );
      }
    };

  // ========================================
  // PROGRESS
  // ========================================

  const progress = useMemo(() => {
    if (!questions.length)
      return 0;

    return (
      ((currentQuestion + 1) /
        questions.length) *
      100
    );
  }, [
    currentQuestion,
    questions.length,
  ]);

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] p-10">
        <div className="h-[600px] animate-pulse rounded-3xl bg-white/5" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-7xl p-6 md:p-10">
        {/* Header */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
              <Sparkles size={15} />
              AI Interview Session
            </div>

            <h1 className="mt-5 text-5xl font-black tracking-tight">
              Live Interview
            </h1>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <p className="text-gray-400">
                Role:
              </p>
              <select
                value={selectedRole}
                onChange={(e) =>
                  setSelectedRole(
                    e.target.value
                  )
                }
                className="rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none"
              >
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Shield size={18} className="text-cyan-400" />
                {antiCheatStatus || "Protected"}
              </div>
            </div>

            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
              Violations: {violationCounts?.total || 0}
            </div>
          </div>
        </div>

        {/* Progress */}

        <div className="mb-10">
          <div className="mb-3 flex items-center justify-between text-sm text-gray-400">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>

            <span>
              {Math.round(progress)}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-600"
            />
          </div>
        </div>

        {/* Main Grid */}

        <div className="grid gap-8 xl:grid-cols-3">
          {/* Question Panel */}

          <div className="space-y-8 xl:col-span-2">
            <motion.div
              layout
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-400">
                  <Brain size={30} />
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Technical Question
                  </p>

                  <h2 className="text-2xl font-bold">
                    Question {currentQuestion + 1}
                  </h2>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h3 className="text-3xl font-bold leading-relaxed">
                    {questions[currentQuestion]?.title ||
                      "Question not found"}
                  </h3>
                </motion.div>
              </AnimatePresence>

              <textarea
                value={answer}
                onChange={(e) =>
                  setAnswer(e.target.value)
                }
                placeholder="Type your answer here..."
                className="mt-8 h-56 w-full rounded-3xl border border-white/10 bg-[#111827] p-6 text-white outline-none transition-all focus:border-cyan-400"
              />

              {/* Controls */}

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={
                    listening
                      ? stopListening
                      : startListening
                  }
                  className={`flex items-center gap-3 rounded-2xl px-6 py-4 font-semibold transition-all ${
                    listening
                      ? "bg-red-500 text-white"
                      : "bg-cyan-500 text-black"
                  }`}
                >
                  {listening ? (
                    <MicOff size={20} />
                  ) : (
                    <Mic size={20} />
                  )}

                  {listening
                    ? "Stop Recording"
                    : "Voice Answer"}
                </button>

                <button
                  onClick={() =>
                    setShowCodeEditor(
                      (prev) => !prev
                    )
                  }
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4"
                >
                  <Terminal size={20} />
                  Code Editor
                </button>

                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
                  <Upload size={20} />
                  Upload Resume

                  <input
                    type="file"
                    hidden
                    onChange={handleResumeUpload}
                  />
                </label>
              </div>

              {resumeStatus && (
                <p className="mt-4 text-sm text-cyan-300">
                  {resumeStatus}
                </p>
              )}

              {resumeUploaded && (
                <p className="mt-2 text-sm text-emerald-300">
                  Resume is uploaded and ready.
                </p>
              )}
            </motion.div>

            {/* Code Editor */}

            {showCodeEditor && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
              >
                <h3 className="mb-5 text-2xl font-bold">
                  Live Coding
                </h3>

                <textarea
                  value={liveCode}
                  onChange={(e) =>
                    setLiveCode(e.target.value)
                  }
                  className="h-[400px] w-full rounded-3xl border border-white/10 bg-[#111827] p-6 font-mono text-sm outline-none focus:border-cyan-400"
                />
              </motion.div>
            )}
          </div>

          {/* Side Panel */}

          <div className="space-y-8">
            {/* Camera */}

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-3">
                <Video className="text-cyan-400" />

                <h3 className="text-xl font-bold">
                  Live Camera
                </h3>
              </div>

              {cameraError ? (
                <div className="rounded-2xl bg-red-500/10 p-5 text-red-300">
                  {cameraError}
                </div>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="aspect-video w-full rounded-3xl border border-white/10 object-cover"
                />
              )}
            </div>

            {/* Status */}

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h3 className="mb-5 text-xl font-bold">
                Interview Status
              </h3>

              <div className="space-y-4">
                <StatusItem
                  label="Voice Recognition"
                  active={listening}
                />

                <StatusItem
                  label="Camera Monitoring"
                  active={!cameraError}
                />

                <StatusItem
                  label="AI Evaluation"
                  active
                />
              </div>
            </div>

            {/* Submit */}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={nextQuestion}
              disabled={evaluationLoading || questions.length === 0 || !resumeUploaded}
              className="flex w-full items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-5 text-lg font-bold shadow-lg shadow-cyan-500/20"
            >
              {evaluationLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Evaluating...
                </>
              ) : currentQuestion ===
                questions.length - 1 ? (
                <>
                  Finish Interview
                  <CheckCircle2 size={22} />
                </>
              ) : questions.length === 0 ? (
                <>No questions available</>
              ) : (
                <>
                  Next Question
                  <ArrowRight size={22} />
                </>
              )}
            </motion.button>

            {uploadStatus && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-cyan-300">
                {uploadStatus}
              </div>
            )}

            {feedback && (
              <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-6">
                <div className="mb-3 flex items-center gap-3">
                  <Sparkles className="text-cyan-400" />

                  <h4 className="font-bold">
                    AI Feedback
                  </h4>
                </div>

                <p className="text-sm leading-relaxed text-cyan-100">
                  {feedback}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// STATUS ITEM
// ========================================

function StatusItem({
  label,
  active,
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#111827] px-5 py-4">
      <span className="text-sm text-gray-300">
        {label}
      </span>

      <div
        className={`h-3 w-3 rounded-full ${
          active
            ? "bg-green-400"
            : "bg-red-400"
        }`}
      />
    </div>
  );
}

export default Interview;

