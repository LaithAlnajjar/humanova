import {
  CreateInternshipRequest,
  InternshipResponse,
} from "../types/api/internships";

const API_URL = "http://localhost:5022/api/opportunities"; // Note: Different endpoint from volunteering

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const internshipService = {
  // A) Create Draft
  createDraft: async (
    data: CreateInternshipRequest
  ): Promise<{ id: number; status: number }> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create internship");
    }

    return response.json();
  },

  // B) Publish
  publish: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}/publish`, {
      method: "POST",
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error("Failed to publish internship");
  },

  // C) Get My Internships
  getMyInternships: async (): Promise<InternshipResponse[]> => {
    const response = await fetch(`${API_URL}/mine`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error("Failed to fetch internships");
    return response.json();
  },

  // D) Get All Published (For Students)
  getAllPublished: async (): Promise<InternshipResponse[]> => {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error("Failed to fetch internships");
    return response.json();
  },

  // E) Get Single Detail (Needed because List doesn't have description/skills)
  getById: async (id: number): Promise<any> => {
    // Returns full object
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error("Failed to fetch details");
    return response.json();
  },

  // F) Apply
  apply: async (
    id: number,
    data: { cvUrl: string; linkedInUrl: string; coverLetter: string }
  ) => {
    const response = await fetch(`${API_URL}/${id}/apply`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }
    return response.json();
  },
};
