// ========================================
// MOCK API FOR TESTING
// ========================================
// This file provides mock API responses for testing
// when the backend is not available. 
// 
// To use this mock API:
// 1. Import this file in your component
// 2. Replace axiosInstance calls with mock API calls
// 3. Comment out or remove when backend is ready
// ========================================

const mockQuestions = {
  frontend: [
    {
      id: 1,
      title: "What are React hooks and why are they useful?",
      category: "frontend",
      role: "frontend",
      difficulty: "medium",
    },
    {
      id: 2,
      title: "Explain the difference between useState and useEffect hooks",
      category: "frontend",
      role: "frontend",
      difficulty: "medium",
    },
    {
      id: 3,
      title: "How does the virtual DOM work in React?",
      category: "frontend",
      role: "frontend",
      difficulty: "hard",
    },
  ],
  backend: [
    {
      id: 4,
      title: "What is REST API and how does it work?",
      category: "backend",
      role: "backend",
      difficulty: "medium",
    },
    {
      id: 5,
      title: "Explain the concept of database normalization",
      category: "backend",
      role: "backend",
      difficulty: "hard",
    },
    {
      id: 6,
      title: "What is the difference between SQL and NoSQL databases?",
      category: "backend",
      role: "backend",
      difficulty: "medium",
    },
  ],
  python: [
    {
      id: 7,
      title: "What is a decorator in Python?",
      category: "python",
      role: "python",
      difficulty: "medium",
    },
    {
      id: 8,
      title: "Explain list comprehension in Python",
      category: "python",
      role: "python",
      difficulty: "medium",
    },
    {
      id: 9,
      title: "What are generators in Python?",
      category: "python",
      role: "python",
      difficulty: "hard",
    },
  ],
  java: [
    {
      id: 10,
      title: "What is the difference between interface and abstract class?",
      category: "java",
      role: "java",
      difficulty: "medium",
    },
    {
      id: 11,
      title: "Explain the concept of inheritance in Java",
      category: "java",
      role: "java",
      difficulty: "medium",
    },
    {
      id: 12,
      title: "What are generics in Java?",
      category: "java",
      role: "java",
      difficulty: "hard",
    },
  ],
  ai: [
    {
      id: 13,
      title: "What is machine learning and its types?",
      category: "ai",
      role: "ai",
      difficulty: "medium",
    },
    {
      id: 14,
      title: "Explain the difference between supervised and unsupervised learning",
      category: "ai",
      role: "ai",
      difficulty: "medium",
    },
    {
      id: 15,
      title: "What is a neural network?",
      category: "ai",
      role: "ai",
      difficulty: "hard",
    },
  ],
};

// ========================================
// MOCK EVALUATION
// ========================================

export const evaluateInterviewMock = async (payload) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const score = Math.floor(Math.random() * 40) + 60; // Random score 60-100
      
      resolve({
        score: score,
        feedback: `Great performance! You demonstrated good understanding of the ${payload.category} concepts. 
Your communication was clear and responses showed technical depth. Keep practicing to improve edge case handling and optimization skills.`,
        communicationScore: Math.min(score + 5, 100),
        technicalScore: score,
        confidenceScore: Math.min(score - 5, 100),
        problemSolvingScore: Math.min(score + 10, 100),
      });
    }, 2000); // Simulate 2 second evaluation time
  });
};

// ========================================
// MOCK QUESTION FETCHING
// ========================================

export const getQuestionsMock = async (role = "frontend") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        mockQuestions[role] || mockQuestions.frontend
      );
    }, 500); // Simulate API delay
  });
};

// ========================================
// MOCK INTERVIEW RESULT SAVING
// ========================================

export const saveInterviewResultMock = async (result) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `interview-${Date.now()}`,
        ...result,
        status: "COMPLETED",
        savedAt: new Date().toISOString(),
      });
    }, 500);
  });
};

// ========================================
// MOCK RESUME UPLOAD
// ========================================

export const uploadResumeMock = async (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `resume-${Date.now()}`,
        filename: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
      });
    }, 1000);
  });
};

// ========================================
// MOCK VIDEO UPLOAD
// ========================================

export const uploadVideoMock = async (blob, interviewId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `video-${Date.now()}`,
        interviewId: interviewId,
        size: blob.size,
        duration: Math.random() * 60, // Random duration up to 60 min
        uploadedAt: new Date().toISOString(),
      });
    }, 2000);
  });
};

// ========================================
// MOCK VIOLATIONS LOGGING
// ========================================

export const logViolationMock = async (violation) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock violation logged:", violation);
      resolve({
        id: `violation-${Date.now()}`,
        ...violation,
        timestamp: new Date().toISOString(),
      });
    }, 100);
  });
};

// ========================================
// USAGE NOTE
// ========================================
// 
// To use these mock functions instead of the real API:
// 
// In your component, you can do:
// 
// import { evaluateInterviewMock, getQuestionsMock } from '../api/mockApi.js';
// 
// Then use them like:
// const evaluation = await evaluateInterviewMock(payload);
// const questions = await getQuestionsMock(selectedRole);
// 
// Or modify the axiosInstance interceptor to use mocks for specific endpoints
//
