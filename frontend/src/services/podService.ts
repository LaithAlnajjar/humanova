import { AssistanceType, DisabilityType } from "@/types/enums";
import {
  CreateAssistanceRequest,
  AssistanceRequestResponse,
  DisabledProfileInfo,
  DisabledStudentProfileCreateRequest,
} from "../types/api/pod";

const API_URL = "http://localhost:5022/api/assistance-requests";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const podService = {
  // 0. Get Profile Info (Pre-fill form)
  getProfileInfo: async (): Promise<DisabledProfileInfo> => {
    const response = await fetch(`${API_URL}/profile-info`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch profile info");
    return response.json();
  },

  // 1. Create Draft
  createDraft: async (
    data: CreateAssistanceRequest
  ): Promise<{ id: number; status: number }> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Failed to create request");
    }
    return response.json();
  },

  // 3. Submit (Draft -> Submitted)
  submit: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}/submit`, {
      method: "POST",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to submit request");
  },

  // 5. Get My Requests
  getMyRequests: async (): Promise<AssistanceRequestResponse[]> => {
    const response = await fetch(`${API_URL}/mine`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch requests");
    return response.json();
  },
};

const MOCK_POD_PROFILE: DisabledStudentProfileCreateRequest = {
  universityId: 1, // Example ID
  major: "Computer Science",
  phoneNumber: "0791234567",
  email: "student@university.edu.jo",
  disabilityType: DisabilityType.Mobility,
  conditionSummary:
    "Uses a wheelchair for mobility. Requires accessible routes.",
  preferredTime: "Mornings (9 AM - 12 PM)",
  preferredPlace: "Building A, Ground Floor",
  assistanceNeeds: [AssistanceType.Transportation, AssistanceType.CampusEscort],
  photoUrl: "https://via.placeholder.com/150",
  additionalNotes: "Please ensure elevators are working.",
};

export const getPODProfile = async (
  userId: string
): Promise<DisabledStudentProfileCreateRequest> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_POD_PROFILE);
    }, 500);
  });
};

export const updatePODProfile = async (
  data: DisabledStudentProfileCreateRequest
): Promise<DisabledStudentProfileCreateRequest> => {
  // Simulate API update
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Profile Updated:", data);
      resolve(data);
    }, 500);
  });
};
