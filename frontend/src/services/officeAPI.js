
const API_BASE_URL = "http://127.0.0.1:5000/api";

// Fetch government offices with optional filters
export async function getOffices({ taluk = "", search = "" } = {}) {
  try {
    const params = new URLSearchParams();

    if (taluk) {
      params.append("taluk", taluk);
    }

    if (search) {
      params.append("search", search);
    }

    const queryString = params.toString();

    const url = `${API_BASE_URL}/offices${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message || "Unable to fetch government offices"
      );
    }

    return result.data;
  } catch (error) {
    console.error("Office API Error:", error);
    throw error;
  }
}
