// import axios from "axios";

// // ==========================================
// // 1. CONFIGURATION CONSTANTS
// // ==========================================

// // --- Development Server ---
// export const API_URL = "http://localhost:8000/api";
// export const IMAGE_URL = "http://localhost:8000";
// // export const IMAGE_API_BASE = "http://localhost:8000/";

// // --- Production Server (Uncomment when deploying) ---
// // export const API_BASE = "https://sellexplore.pythonanywhere.com/api";
// // export const IMAGE_API_BASE = "https://sellexplore.pythonanywhere.com/";

// // --- Third Party ---
// export const CLOUDINARY_BASE =
//   "https://339f56ac9c8c40e58b119c93af69401e.r2.cloudflarestorage.com/sellexplore/media/";


// // ==========================================
// // 2. AXIOS INSTANCE
// // ==========================================



// // This instance starts "empty" (no tokens).
// // AuthContext will inject the token via interceptors.
// export const api = axios.create({
//   // Prioritize environment variable, fallback to your hardcoded constant logic
//   baseURL: process.env.NEXT_PUBLIC_API_URL || API_URL || "http://localhost:8000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });












import axios from "axios";

// ==========================================
// 1. ENVIRONMENT CONFIGURATION
// ==========================================

// 🟢 STEP 1: Choose your mode ('development' or 'production')
// If you leave this as null, it automatically detects based on where it's running.
// Change to "production" to force production URLs locally.
// Options: "development", "production", null

// const MANUAL_ENV = "development"; 
const MANUAL_ENV = "production"; 

// 🟢 STEP 2: Define your URLs here
const CONFIG = {
  development: {
    API_URL: "http://localhost:8000/api",
    IMAGE_URL: "http://localhost:8000",
  },
  production: {
    API_URL: "https://bugaking.pythonanywhere.com/api",
    IMAGE_URL: "https://bugaking.pythonanywhere.com",
  },
};

// ==========================================
// 2. AUTOMATIC SELECTION LOGIC
// ==========================================

// Determines current environment (Priority: Manual Override > Node Env > Default to Dev)
const CURRENT_ENV =
  MANUAL_ENV || (process.env.NODE_ENV === "production" ? "production" : "development");

// Export constants based on the selection
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || CONFIG[CURRENT_ENV].API_URL;

export const IMAGE_URL =
  process.env.NEXT_PUBLIC_IMAGE_URL || CONFIG[CURRENT_ENV].IMAGE_URL;

export const CLOUDINARY_BASE =
  "https://339f56ac9c8c40e58b119c93af69401e.r2.cloudflarestorage.com/sellexplore/media/";

// ==========================================
// 3. AXIOS INSTANCE
// ==========================================

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Optional: Allow cookies to be sent with requests if needed
  // withCredentials: true, 
});

// Helper for debugging (prints to console so you know which API you are hitting)
console.log(`🚀 API Client initialized in ${CURRENT_ENV} mode: ${API_URL}`);