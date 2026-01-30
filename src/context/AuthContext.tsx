// "use client";

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
//   useLayoutEffect,
//   ReactNode,
// } from "react"; 
// import { FormErrors } from "@/types/auth";
// import { useRouter } from "next/navigation";
// import { api, API_URL } from "@/utils/axios";
// import axios from "axios";
// import { UserProfile } from "@/app/dashboard/api/profileApi"; // Ensure this path is correct

// interface AuthContextType {
//   register: (data: any) => Promise<boolean>;
//   login: (email: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   error: FormErrors | null; 
//   loading: boolean;
//   isAuthenticated: boolean;
//   isInitialized: boolean;
//   clearError: () => void;
//   user: UserProfile | null;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const router = useRouter();

//   // State
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [error, setError] = useState<FormErrors | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [user, setUser] = useState<UserProfile | null>(null);

//   console.log("User data:", user)
//   // Refs
//   const accessTokenRef = useRef<string | null>(null);
//   const isRefreshingRef = useRef(false);
//   const failedQueueRef = useRef<any[]>([]);

//   const clearError = useCallback(() => setError(null), []);

//   const processQueue = (error: any, token: string | null = null) => {
//     failedQueueRef.current.forEach((prom) => {
//       if (error) prom.reject(error);
//       else prom.resolve(token);
//     });
//     failedQueueRef.current = [];
//   };

//   const saveTokens = useCallback((access: string, refresh: string) => {
//     localStorage.setItem("access", access);
//     localStorage.setItem("refresh", refresh);
//     setAccessToken(access);
//     accessTokenRef.current = access;
//   }, []);

//   const clearAuthData = useCallback(() => {
//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//     localStorage.removeItem("user"); 
    
//     setAccessToken(null);
//     accessTokenRef.current = null;
//     setUser(null);
//     setError(null);
//   }, []);

//   const logout = useCallback(() => {
//     clearAuthData();
//     router.push("/authentication/signin");
//   }, [clearAuthData, router]);

//   const refreshAccessToken = useCallback(async (): Promise<string> => {
//     const currentRefresh = localStorage.getItem("refresh");
//     if (!currentRefresh) throw new Error("No refresh token");

//     try {
//       const response = await axios.post(`${API_URL}/token/refresh/`, {
//         refresh: currentRefresh,
//       });
//       const { access, refresh } = response.data;
//       saveTokens(access, refresh || currentRefresh);
//       return access;
//     } catch (error) {
//       logout();
//       throw error;
//     }
//   }, [logout, saveTokens]);

//   // Interceptors
//   useLayoutEffect(() => {
//     const reqInterceptor = api.interceptors.request.use(
//       (config) => {
//         const isAuthRequest =
//           config.url?.includes("/signin") || config.url?.includes("/signup");
//         if (accessTokenRef.current && !isAuthRequest) {
//           config.headers.Authorization = `Bearer ${accessTokenRef.current}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     const resInterceptor = api.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const originalRequest = error.config;
//         const isAuthRequest =
//           originalRequest.url?.includes("/signin") ||
//           originalRequest.url?.includes("/signup");

//         if (
//           error.response?.status === 401 &&
//           !originalRequest._retry &&
//           !isAuthRequest
//         ) {
//           if (isRefreshingRef.current) {
//             return new Promise((resolve, reject) => {
//               failedQueueRef.current.push({ resolve, reject });
//             })
//               .then((token) => {
//                 originalRequest.headers.Authorization = `Bearer ${token}`;
//                 return api(originalRequest);
//               })
//               .catch((err) => Promise.reject(err));
//           }

//           originalRequest._retry = true;
//           isRefreshingRef.current = true;

//           try {
//             const newToken = await refreshAccessToken();
//             processQueue(null, newToken);
//             originalRequest.headers.Authorization = `Bearer ${newToken}`;
//             return api(originalRequest);
//           } catch (refreshError) {
//             processQueue(refreshError, null);
//             return Promise.reject(refreshError);
//           } finally {
//             isRefreshingRef.current = false;
//           }
//         }
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       api.interceptors.request.eject(reqInterceptor);
//       api.interceptors.response.eject(resInterceptor);
//     };
//   }, [refreshAccessToken]);

//   // REGISTER
//   const register = async (payload: any): Promise<boolean> => {
//     setLoading(true);
//     setError(null);
//     try {
//       await api.post("/signup/", payload);
//       router.push("/authentication/signin");
//       return true;
//     } catch (err: any) {
//       console.error("Signup failed", err);
//       if (err.response?.data) {
//         setError(err.response.data);
//       } else {
//         setError({ global: "Registration failed. Please try again." });
//       }
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // LOGIN
//   const login = async (email: string, password: string): Promise<boolean> => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await api.post("/signin/", { email, password });

//       const data = response.data.tokens || response.data;
//       const user_data = response.data.user;

//       if (data.access && data.refresh) {
//         saveTokens(data.access, data.refresh);
        
//         if (user_data) {
//           localStorage.setItem("user", JSON.stringify(user_data));
//           setUser(user_data);
//         }
        
//         // Removed automatic redirect here so individual components can handle logic (e.g. returnUrl)
//         // router.push("/dashboard"); 
//         return true;
//       }
//       throw new Error("Invalid token response");
//     } catch (err: any) {
//       console.error("Login failed", err);
//       const msg = err.response?.data?.detail || "Invalid credentials";
//       setError({ global: msg });
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initialize
//   useEffect(() => {
//     const storedAccess = localStorage.getItem("access");
//     const storedRefresh = localStorage.getItem("refresh");
//     const storedUser = localStorage.getItem("user");

//     if (storedAccess && storedRefresh) {
//       setAccessToken(storedAccess);
//       accessTokenRef.current = storedAccess;
//     }

//     if (storedUser) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch (e) {
//         console.error("Failed to parse stored user data");
//         localStorage.removeItem("user");
//       }
//     }

//     setIsInitialized(true);
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         register,
//         login,
//         logout,
//         error,
//         loading,
//         isAuthenticated: !!accessToken,
//         isInitialized,
//         clearError,
//         user, 
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
//   return ctx;
// };












"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
  useMemo, // Import useMemo
  ReactNode,
} from "react";
import { FormErrors } from "@/types/auth";
import { useRouter } from "next/navigation";
import { api, API_URL } from "@/utils/axios";
import axios from "axios"; // Keep for independent refresh call
import { UserProfile } from "@/app/dashboard/api/profileApi";

interface AuthContextType {
  register: (data: any) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: UserProfile) => void; // New method for manual updates
  error: FormErrors | null;
  loading: boolean;
  isAuthenticated: boolean;
  isInitialized: boolean;
  clearError: () => void;
  user: UserProfile | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  // State
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<FormErrors | null>(null);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  // Refs (Mutable containers that don't trigger re-renders)
  const accessTokenRef = useRef<string | null>(null);
  const isRefreshingRef = useRef(false);
  const failedQueueRef = useRef<any[]>([]);

  // --- 1. OPTIMIZATION: Stable Callbacks ---

  const clearError = useCallback(() => setError(null), []);

  const saveTokens = useCallback((access: string, refresh: string) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    // Update Ref immediately for synchronous access in interceptors
    accessTokenRef.current = access; 
    // Update State for UI reactivity
    setAccessToken(access);
  }, []);

  const clearAuthData = useCallback(() => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    
    accessTokenRef.current = null;
    setAccessToken(null);
    setUser(null);
    setError(null);
  }, []);

  // --- 2. OPTIMIZATION: User Synchronization ---
  // Allows components to update the user object without reloading
  const updateUser = useCallback((newData: UserProfile) => {
    setUser(newData);
    localStorage.setItem("user", JSON.stringify(newData));
  }, []);

  const logout = useCallback(() => {
    clearAuthData();
    router.push("/authentication/signin");
  }, [clearAuthData, router]);

  const processQueue = (error: any, token: string | null = null) => {
    failedQueueRef.current.forEach((prom) => {
      if (error) prom.reject(error);
      else prom.resolve(token);
    });
    failedQueueRef.current = [];
  };

  // Refresh Token Logic
  const refreshAccessToken = useCallback(async (): Promise<string> => {
    const currentRefresh = localStorage.getItem("refresh");
    if (!currentRefresh) throw new Error("No refresh token");

    try {
      // Use a fresh axios instance to avoid our own interceptors (infinite loop risk)
      const response = await axios.post(`${API_URL}/token/refresh/`, {
        refresh: currentRefresh,
      });
      const { access, refresh } = response.data;
      saveTokens(access, refresh || currentRefresh);
      return access;
    } catch (error) {
      logout();
      throw error;
    }
  }, [logout, saveTokens]);

  // --- 3. OPTIMIZATION: Interceptor Logic ---
  // We use useLayoutEffect to ensure interceptors are attached before any child components mount/fetch
  useLayoutEffect(() => {
    // Request Interceptor
    const reqInterceptor = api.interceptors.request.use(
      (config) => {
        // Skip auth headers for public endpoints
        const isAuthRequest =
          config.url?.includes("/signin") || config.url?.includes("/signup");
        
        if (accessTokenRef.current && !isAuthRequest) {
          config.headers.Authorization = `Bearer ${accessTokenRef.current}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    const resInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // Prevent infinite loops on auth endpoints
        const isAuthRequest =
          originalRequest.url?.includes("/signin") ||
          originalRequest.url?.includes("/signup") ||
          originalRequest.url?.includes("/token/refresh/");

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !isAuthRequest
        ) {
          if (isRefreshingRef.current) {
            // If already refreshing, queue this request
            return new Promise((resolve, reject) => {
              failedQueueRef.current.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return api(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          isRefreshingRef.current = true;

          try {
            const newToken = await refreshAccessToken();
            // Process queued requests with the new token
            processQueue(null, newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            processQueue(refreshError, null);
            return Promise.reject(refreshError);
          } finally {
            isRefreshingRef.current = false;
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(reqInterceptor);
      api.interceptors.response.eject(resInterceptor);
    };
  }, [refreshAccessToken]); // Dependencies minimized

  // API Actions
  const register = async (payload: any): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/signup/", payload);
      // Optional: Auto-login after register, otherwise redirect
      router.push("/authentication/signin");
      return true;
    } catch (err: any) {
      console.error("Signup failed", err);
      setError(err.response?.data || { global: "Registration failed." });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/signin/", { email, password });
      const data = response.data.tokens || response.data;
      const user_data = response.data.user;

      if (data.access && data.refresh) {
        saveTokens(data.access, data.refresh);
        if (user_data) updateUser(user_data);
        return true;
      }
      throw new Error("Invalid token response");
    } catch (err: any) {
      console.error("Login failed", err);
      setError({ global: err.response?.data?.detail || "Invalid credentials" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Initialization
  useEffect(() => {
    const storedAccess = localStorage.getItem("access");
    const storedRefresh = localStorage.getItem("refresh");
    const storedUser = localStorage.getItem("user");

    if (storedAccess && storedRefresh) {
      // Set Ref first for immediate interceptor availability
      accessTokenRef.current = storedAccess; 
      setAccessToken(storedAccess);
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }

    setIsInitialized(true);
  }, []);

  // --- 4. OPTIMIZATION: Context Memoization ---
  // This prevents consumers from re-rendering unless these specific values change
  const contextValue = useMemo(() => ({
    register,
    login,
    logout,
    updateUser, // Exposed here
    error,
    loading,
    isAuthenticated: !!accessToken,
    isInitialized,
    clearError,
    user,
  }), [
    // Dependencies: Only recreate object if these change
    accessToken, 
    error, 
    loading, 
    isInitialized, 
    user, 
    register, 
    login, 
    logout, 
    updateUser, 
    clearError
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};