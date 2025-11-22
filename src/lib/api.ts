const API_BASE_URL = "http://localhost:8080";

export const api = {
  auth: {
    login: () => `${API_BASE_URL}/auth/login`,
    register: () => `${API_BASE_URL}/register`,
    me: () => `${API_BASE_URL}/me`
  },
  
  faskes1: {
    rekamMedis: () => `${API_BASE_URL}/faskes1/rekam-medis`,
    getAllDiagnosis: () => `${API_BASE_URL}/faskes1`,
    peserta: () => `${API_BASE_URL}/faskes1/peserta`
  },

  faskes2: {
    rekamMedisClaim: () => `${API_BASE_URL}/faskes2/rekam-medis-claim`,
    getAllDiagnosis: () => `${API_BASE_URL}/faskes2`,
  },

  admin: {
    getAllClaims: () => `${API_BASE_URL}/admin/claims`,
    getClaimById: (id: string) => `${API_BASE_URL}/admin/claims/${id}`,
    putClaimById: (id: string) => `${API_BASE_URL}/admin/claims/${id}/status`,
  }
}