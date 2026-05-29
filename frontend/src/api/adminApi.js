import axiosInstance from "./axiosInstance";
import { getQuestionsMock } from "./mockApi";

// ========================================
// ADMIN DASHBOARD
// ========================================

export const getAdminStats =
  async () => {
    const response =
      await axiosInstance.get(
        "/api/admin/stats"
      );

    return response.data;
  };

// ========================================
// USERS MANAGEMENT
// ========================================

export const getAllUsers =
  async (params = {}) => {
    const response =
      await axiosInstance.get(
        "/api/admin/users",
        {
          params,
        }
      );

    const data = response.data;
    if (Array.isArray(data)) {
      return data;
    }

    return data.items || data.users || data.results || data || [];
  };

export const getUserDetails =
  async (userId) => {
    const response =
      await axiosInstance.get(
        `/api/admin/users/${userId}`
      );

    return response.data;
  };

export const getUserInterviews =
  async (
    userId,
    params = {}
  ) => {
    const response =
      await axiosInstance.get(
        `/api/admin/users/${userId}/interviews`,
        {
          params,
        }
      );

    return response.data;
  };

export const blockUser =
  async (userId) => {
    const response =
      await axiosInstance.post(
        `/api/admin/users/${userId}/block`
      );

    return response.data;
  };

export const unblockUser =
  async (userId) => {
    const response =
      await axiosInstance.post(
        `/api/admin/users/${userId}/unblock`
      );

    return response.data;
  };

// ========================================
// QUESTIONS MANAGEMENT
// ========================================

export const getAllQuestions =
  async (params = {}) => {
    try {
      const response = await axiosInstance.get(
        "/api/admin/questions",
        {
          params,
        }
      );

      return response.data;
    } catch (error) {
      console.warn("getAllQuestions failed, using mock:", error?.message || error);
      // return mock questions for the requested role if provided
      const role = params.role || params.category || "frontend";
      return getQuestionsMock(role);
    }
  };

export const createQuestion =
  async (payload) => {
    const response =
      await axiosInstance.post(
        "/api/admin/questions",
        payload
      );

    return response.data;
  };

export const updateQuestion =
  async (
    id,
    payload
  ) => {
    const response =
      await axiosInstance.put(
        `/api/admin/questions/${id}`,
        payload
      );

    return response.data;
  };

export const deleteQuestion =
  async (id) => {
    const response =
      await axiosInstance.delete(
        `/api/admin/questions/${id}`
      );

    return response.data;
  };

// ========================================
// INTERVIEW RESULTS
// ========================================

export const getInterviewResults =
  async (params = {}) => {
    const response =
      await axiosInstance.get(
        "/api/admin/interviews",
        {
          params,
        }
      );

    const data = response.data;
    if (Array.isArray(data)) {
      return data;
    }

    return data.items || data.interviews || data.results || data || [];
  };

export const getInterviewAnalytics =
  async () => {
    const response =
      await axiosInstance.get(
        "/api/admin/interviews/analytics"
      );

    return response.data;
  };

// ========================================
// AI INSIGHTS
// ========================================

export const getAIInsights =
  async (params = {}) => {
    const response =
      await axiosInstance.get(
        "/api/admin/insights",
        {
          params,
        }
      );

    return response.data;
  };

// ========================================
// ROLE MAPPINGS
// ========================================

export const getRoleMappings =
  async () => {
    const response =
      await axiosInstance.get(
        "/api/admin/role-mapping"
      );

    return response.data;
  };

export const updateRoleMapping =
  async (mapping) => {
    const response =
      await axiosInstance.post(
        "/api/admin/role-mapping",
        mapping
      );

    return response.data;
  };

// ========================================
// EXPORT CSV / REPORTS
// ========================================

export const exportCsv =
  async (
    endpoint,
    params = {}
  ) => {
    const response =
      await axiosInstance.get(
        endpoint,
        {
          params,
          responseType: "blob",
        }
      );

    return response.data;
  };

// ========================================
// ADMIN HELPERS
// ========================================

export const downloadBlobFile = (
  blobData,
  fileName
) => {
  const url =
    window.URL.createObjectURL(
      new Blob([blobData])
    );

  const link =
    document.createElement("a");

  link.href = url;

  link.setAttribute(
    "download",
    fileName
  );

  document.body.appendChild(
    link
  );

  link.click();

  link.remove();

  window.URL.revokeObjectURL(
    url
  );
};