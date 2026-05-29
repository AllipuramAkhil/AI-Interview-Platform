import axiosInstance from "./axiosInstance";

// ========================================
// GET ALL QUESTIONS
// ========================================

export const getAllQuestions =
  async () => {
    const response =
      await axiosInstance.get(
        "/api/questions"
      );

    return response.data;
  };

// ========================================
// ADD QUESTION
// ========================================

export const addQuestion =
  async (questionData) => {
    const response =
      await axiosInstance.post(
        "/api/questions",
        questionData
      );

    return response.data;
  };

// ========================================
// DELETE QUESTION
// ========================================

export const deleteQuestion =
  async (id) => {
    const response =
      await axiosInstance.delete(
        `/api/questions/${id}`
      );

    return response.data;
  };

// ========================================
// FILTER HELPERS
// ========================================

export const filterQuestions =
  (
    questions = [],
    searchTerm = ""
  ) => {
    return questions.filter(
      (question) =>
        question.question
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );
  };

// ========================================
// CATEGORY HELPERS
// ========================================

export const groupQuestionsByRole =
  (questions = []) => {
    return questions.reduce(
      (acc, question) => {
        const role =
          question.role ||
          "General";

        if (!acc[role]) {
          acc[role] = [];
        }

        acc[role].push(
          question
        );

        return acc;
      },
      {}
    );
  };

// ========================================
// QUESTION STATS
// ========================================

export const getQuestionStats =
  (questions = []) => {
    const totalQuestions =
      questions.length;

    const uniqueRoles =
      new Set(
        questions.map(
          (q) => q.role
        )
      ).size;

    return {
      totalQuestions,
      uniqueRoles,
    };
  };

// ========================================
// SORT HELPERS
// ========================================

export const sortQuestions =
  (
    questions = [],
    order = "latest"
  ) => {
    const sorted = [
      ...questions,
    ];

    if (order === "latest") {
      return sorted.reverse();
    }

    if (order === "alphabetical") {
      return sorted.sort(
        (a, b) =>
          (
            a.question || ""
          ).localeCompare(
            b.question || ""
          )
      );
    }

    return sorted;
  };