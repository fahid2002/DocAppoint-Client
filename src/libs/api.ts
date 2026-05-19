import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ sends cookie automatically on every request
});

// ✅ Response interceptor — handle 401 globally (token expired / not logged in)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      window.location.href = "/login"; // redirect to login on auth failure
    }
    return Promise.reject(error);
  }
);

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