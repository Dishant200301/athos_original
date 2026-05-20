// API URL configuration - All values come from .env file
export const getApiBaseUrl = () => {
  // Use VITE_API_URL from .env (required)
  if (!import.meta.env.VITE_API_URL) {
    throw new Error('VITE_API_URL is not defined in .env file');
  }
  return import.meta.env.VITE_API_URL;
};

// Get base URL without /api for Socket.IO connections and uploads
export const getBaseUrl = () => {
  // Use VITE_BACKEND_URL from .env (required)
  if (!import.meta.env.VITE_BACKEND_URL) {
    throw new Error('VITE_BACKEND_URL is not defined in .env file');
  }
  return import.meta.env.VITE_BACKEND_URL;
};

export const API_BASE_URL = getApiBaseUrl();
export const BASE_URL = getBaseUrl();
