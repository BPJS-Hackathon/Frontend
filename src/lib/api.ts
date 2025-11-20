const API_BASE_URL = "http://localhost:8080/api";

export const api = {
  auth: {
    login: () => `${API_BASE_URL}/login`,
    register: () => `${API_BASE_URL}/register`
  },
  
  user: () => `${API_BASE_URL}/peserta`
}