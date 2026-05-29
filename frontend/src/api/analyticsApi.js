import axiosInstance from "./axiosInstance";

// ========================================
// ANALYTICS DASHBOARD
// ========================================

export const getAnalyticsData =
  async () => {
    const response =
      await axiosInstance.get(
        "/api/interviews/analytics"
      );

    return response.data;
  };

// ========================================
// INTERVIEW HISTORY
// ========================================

export const getInterviewHistory =
  async () => {
    const response =
      await axiosInstance.get(
        "/api/interviews"
      );

    const data = response.data;
    if (Array.isArray(data)) {
      return data;
    }

    return data.items || data.interviews || data.results || data || [];
  };

// ========================================
// ANALYTICS HELPERS
// ========================================

export const calculateAverageScore =
  (interviews = []) => {
    if (!interviews.length)
      return 0;

    const total =
      interviews.reduce(
        (sum, interview) =>
          sum +
          (interview.score || 0),
        0
      );

    return (
      total / interviews.length
    ).toFixed(1);
  };

export const getHighestScore =
  (interviews = []) => {
    if (!interviews.length)
      return 0;

    return Math.max(
      ...interviews.map(
        (item) => item.score || 0
      )
    );
  };

export const getLowestScore =
  (interviews = []) => {
    if (!interviews.length)
      return 0;

    return Math.min(
      ...interviews.map(
        (item) => item.score || 0
      )
    );
  };

export const getCompletedInterviews =
  (interviews = []) => {
    return interviews.filter(
      (item) =>
        item.status ===
        "COMPLETED"
    ).length;
  };

export const formatChartData =
  (interviews = []) => {
    return interviews.map(
      (item, index) => ({
        name:
          item.role ||
          `Interview ${index + 1}`,

        score:
          item.score || 0,

        date:
          item.createdAt || "",
      })
    );
  };