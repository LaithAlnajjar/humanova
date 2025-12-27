import {
  CreateOrUpdateOpportunityRequest,
  OpportunityResponse,
} from "../types/api/opportunities";
import { VolunteerActivityType, VolunteeringPlaceType } from "../types/enums";

const API_URL = "http://localhost:5022/api/volunteering-opportunities";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const opportunityService = {
  // A) Charity: Create Draft
  createDraft: async (
    data: CreateOrUpdateOpportunityRequest
  ): Promise<{ id: number; status: number }> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create opportunity");
    }

    return response.json();
  },

  // B) Charity: Update Draft
  updateDraft: async (
    id: number,
    data: CreateOrUpdateOpportunityRequest
  ): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to update opportunity");
  },

  // C) Charity: Publish
  publish: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}/publish`, {
      method: "POST",
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error("Failed to publish opportunity");
  },

  // E) Charity: Mine (List own drafts/published)
  getMyOpportunities: async (): Promise<OpportunityResponse[]> => {
    const response = await fetch(`${API_URL}/mine`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error("Failed to fetch my opportunities");
    return response.json();
  },

  // F) Public/Volunteer: List Published
  getAllPublished: async (filters?: {
    activityType?: VolunteerActivityType;
    placeType?: VolunteeringPlaceType;
    city?: string;
    suitableForDisabled?: boolean;
  }): Promise<OpportunityResponse[]> => {
    const params = new URLSearchParams();
    if (filters?.activityType !== undefined)
      params.append("activityType", filters.activityType.toString());
    if (filters?.placeType !== undefined)
      params.append("placeType", filters.placeType.toString());
    if (filters?.city) params.append("city", filters.city);
    if (filters?.suitableForDisabled !== undefined)
      params.append(
        "suitableForDisabled",
        filters.suitableForDisabled.toString()
      );

    const response = await fetch(`${API_URL}?${params.toString()}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok)
      throw new Error("Failed to fetch published opportunities");
    return response.json();
  },

  // G) Get Details
  getDetails: async (id: number): Promise<OpportunityResponse> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error("Failed to fetch opportunity details");
    return response.json();
  },

  // H) Apply
  apply: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}/apply`, {
      method: "POST",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to apply");
    }
  },
};
