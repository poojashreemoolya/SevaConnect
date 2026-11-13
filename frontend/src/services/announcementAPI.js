
const API_BASE_URL = "http://127.0.0.1:5000/api";

// Fetch government announcements
export async function getAnnouncements({ status = "" } = {}) {
  try {
    const params = new URLSearchParams();

    if (status) {
      params.append("status", status);
    }

    const queryString = params.toString();

    const url = `${API_BASE_URL}/announcements${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message || "Unable to fetch announcements"
      );
    }

    return result.data;
  } catch (error) {
    console.error("Announcement API Error:", error);
    throw error;
  }
}
