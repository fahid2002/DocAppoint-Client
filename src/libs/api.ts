import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add JWT token to every request if present
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("da_jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Appointment API calls
export const appointmentsApi = {
  getByUser: (email: string) => api.get(`/appointments?email=${email}`),
  create: (data: object) => api.post("/appointments", data),
  update: (id: string, data: object) => api.patch(`/appointments/${id}`, data),
  delete: (id: string) => api.delete(`/appointments/${id}`),
};

// Auth token exchange
export const authApi = {
  getJwt: (email: string) => api.post("/auth/jwt", { email }),
};
