// API URL configuration - All values come from .env file with safe defaults
export const getApiBaseUrl = () => {
  return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
};

// Get base URL without /api for Socket.IO connections and uploads
export const getBaseUrl = () => {
  return import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
};

export const API_BASE_URL = getApiBaseUrl();
export const BASE_URL = getBaseUrl();
