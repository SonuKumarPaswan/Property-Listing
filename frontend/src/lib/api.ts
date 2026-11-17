import axios from "axios";

const api = axios.create({
  // baseURL: "https://mishti-backend-3.onrender.com/api",
  baseURL: "https://mishti-backend-2.onrender.com/api",
  // baseURL: "http://localhost:8085/api", 
});

// Automatically attach Bearer token if available in localStorage
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
    
    
        
