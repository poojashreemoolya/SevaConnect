
const API_BASE_URL = '/api';

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Something went wrong');
    }

    return result.data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
}

export const getServices = () => fetchData('/services');

export const getServiceById = (id) => fetchData(`/services/${id}`);

export const getOffices = (filters = {}) => {
  const params = new URLSearchParams(filters);
  const query = params.toString();
  return fetchData(`/offices${query ? `?${query}` : ''}`);
};

export const getAnnouncements = (status = '') => {
  const query = status
    ? `?status=${encodeURIComponent(status)}`
    : '';

  return fetchData(`/announcements${query}`);
};
