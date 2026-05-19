import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ sends cookie automatically on every request
});

// ✅ Response interceptor — only redirect on 401 if not an auth call + not already on login page
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const is401 = error.response?.status === 401;
    const isAuthEndpoint = error.config?.url?.includes("/auth/");
    const isLoginPage = typeof window !== "undefined" && window.location.pathname.startsWith("/login");

    if (is401 && !isAuthEndpoint && !isLoginPage) {
      window.location.href = "/login";
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