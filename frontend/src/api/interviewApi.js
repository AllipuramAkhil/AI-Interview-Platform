import axiosInstance from "./axiosInstance";
import {
  evaluateInterviewMock,
  saveInterviewResultMock,
  uploadResumeMock,
  uploadVideoMock,
} from "./mockApi";

// ========================================
// GET ALL INTERVIEWS
// ========================================

export const getAllInterviews = async () => {
  const response = await axiosInstance.get("/api/interviews");
  return response.data;
};

// ========================================
// EVALUATE INTERVIEW
// ========================================

export const evaluateInterview = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/interviews/evaluate",
      payload
    );

    return response.data;
  } catch (error) {
    console.warn(
      "evaluateInterview failed, using mock:",
      error?.message || error
    );
    return evaluateInterviewMock(payload);
  }
};

// ========================================
// SAVE INTERVIEW RESULT
// ========================================

export const saveInterviewResult = async (result) => {
  try {
    const response = await axiosInstance.post("/api/interviews", result);
    return response.data;
  } catch (error) {
    console.warn(
      "saveInterviewResult failed, using mock:",
      error?.message || error
    );
    return saveInterviewResultMock(result);
  }
};

// ========================================
// RETRY PENDING SAVES
// ========================================

export const retryPendingSaves = async () => {
  try {
    const raw = localStorage.getItem("pendingInterviewSaves");
    if (!raw) return { processed: 0 };

    const queue = JSON.parse(raw || "[]");
    if (!Array.isArray(queue) || queue.length === 0) return { processed: 0 };

    let processed = 0;
    const remaining = [];

    for (const item of queue) {
      try {
        await axiosInstance.post("/api/interviews", item);
        processed += 1;
      } catch (error) {
        remaining.push(item);
      }
    }

    if (remaining.length > 0) {
      localStorage.setItem("pendingInterviewSaves", JSON.stringify(remaining));
    } else {
      localStorage.removeItem("pendingInterviewSaves");
    }

    return { processed, remaining: remaining.length };
  } catch (error) {
    return { processed: 0, error: error.message };
  }
};

// ========================================
// UPLOAD INTERVIEW VIDEO
// ========================================

export const uploadInterviewVideo = async (videoBlob, interviewId) => {
  const formData = new FormData();
  formData.append("video", videoBlob, "interview.webm");
  if (interviewId) formData.append("interviewId", interviewId);

  try {
    const response = await axiosInstance.post("/api/interviews/upload-video", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.warn("uploadInterviewVideo failed, using mock:", error?.message || error);
    return uploadVideoMock(videoBlob, interviewId);
  }
};

// ========================================
// UPLOAD RESUME
// ========================================

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("timestamp", new Date().toISOString());

  try {
    const response = await axiosInstance.post("/api/resume/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 30000,
    });

    return response.data;
  } catch (error) {
    console.error("Resume upload failed:", error?.message || error);
    try {
      return await uploadResumeMock(file);
    } catch (mockErr) {
      throw error;
    }
  }
};

// ========================================
// INTERVIEW VIOLATIONS
// ========================================

export const logInterviewViolation = async (violation) => {
  const response = await axiosInstance.post("/api/interviews/violations", violation);
  return response.data;
};

// ========================================
// LOCAL STORAGE HELPERS
// ========================================

export const storePendingInterview = (payload) => {
  const existing = JSON.parse(localStorage.getItem("pendingInterviewSaves") || "[]");
  existing.push(payload);
  localStorage.setItem("pendingInterviewSaves", JSON.stringify(existing));
};

// ========================================
// ANALYTICS HELPERS
// ========================================

export const getInterviewStats = (interviews = []) => {
  const total = interviews.length;
  const completed = interviews.filter((item) => item.status === "COMPLETED").length;
  const averageScore =
    total > 0
      ? (
          interviews.reduce((acc, curr) => acc + (curr.score || 0), 0) / total
        ).toFixed(1)
      : 0;

  return { total, completed, averageScore };
};

// ========================================
// FORMAT INTERVIEW DATA
// ========================================

export const formatInterviewCardData = (interviews = []) => {
  return interviews.map((item, index) => ({
    id: item.id || index,
    role: item.role || "AI Interview",
    score: item.score || 0,
    status: item.status || "PENDING",
    createdAt: item.createdAt || "",
    feedback: item.feedback || "No feedback available",
  }));
};
