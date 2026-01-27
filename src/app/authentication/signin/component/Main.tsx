// "use client";

// import React, { useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { apiClient } from "@/app/offers/api/projectApi";

// const Main = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { login, loading, error, clearError } = useAuth();
  
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [statusMessage, setStatusMessage] = useState("Log In"); // Dynamic button text

//   const returnUrl = searchParams.get("returnUrl");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     clearError();
//     setFormData({
//       ...formData,
//       [e.target.type === "email" ? "email" : "password"]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // 1. Perform Login
//     const success = await login(formData.email, formData.password);

//     if (success) {
//       const pendingData = localStorage.getItem("pending_investment");

//       // 2. Check for Pending Investment (Deferred Action Pattern)
//       if (pendingData) {
//         setStatusMessage("Securing Investment..."); // Update UI to show progress
//         try {
//           const { planId } = JSON.parse(pendingData);
          
//           // 3. Silent Submission using the new auth token
//           await apiClient.submitInvestment(Number(planId));
          
//           // 4. Cleanup & Redirect
//           localStorage.removeItem("pending_investment");
          
//           // Redirect to Dashboard (Investment will appear there)
//           router.push("/dashboard");
          
//         } catch (error) {
//           console.error("Auto-submission failed", error);
//           // If auto-submit fails, redirect to investments page so they can retry manually
//           router.push("/investments"); 
//         }
//       } else {
//         // 3. Normal Login Flow (No investment pending)
//         router.push(returnUrl || "/dashboard");
//       }
//     }
//   }; 

//   return (
//     // CHANGE 1: min-h-screen -> h-full to fit parent flex container
//     <div className="bg-white text-[#171512] font-sans h-full">
//       {/* CHANGE 2: h-screen -> h-full */}
//       <div className="flex flex-col lg:flex-row h-full">
//         {/* Left Side: Hero Image */}
//         <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden h-full">
//           <div className="absolute inset-0 z-10 bg-black/40"></div>
//           <div
//             className="absolute inset-0 z-0 bg-cover bg-center scale-105"
//             style={{
//               backgroundImage: 'url("/signin_img.jpg")',
//             }}
//           ></div>

//           <div className="relative z-20 flex flex-col justify-between px-16 pt-[8rem] w-full h-full">
//             <div className="max-w-md">
//               <h1 className="text-white text-5xl font-black leading-tight mb-6">
//                 Invest in Land. Earn Through Agriculture.
//               </h1>
//               <p className="text-white/80 text-lg font-light leading-relaxed">
//                 Purchase verified farmland and have it professionally leased to
//                 farmers, generating steady annual returns backed by real assets.
//               </p>
//             </div>

//             <div className="text-white/90 text-xs font-bold uppercase tracking-[0.3em]">
//               © 2026 BugaKing Group
//             </div>
//           </div>
//         </div>

//         {/* Right Side: Form */}
//         <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-20 bg-white h-full overflow-y-auto">
//           <div className="w-full max-w-md space-y-8">
//             <div className="space-y-2">
//               <h2 className="text-3xl font-black tracking-tight text-[#171512]">
//                 Welcome Back
//               </h2>
//               <p className="text-[#171512]/60 text-sm">
//                 Begin your journey with the world's premier investment group.
//               </p>
//             </div>

//             {/* Global Error Message */}
//             {error && (error.global || error.detail) && (
//               <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
//                 {String(error.global || error.detail)}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div className="space-y-1.5">
//                 <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
//                   Email Address
//                 </label>
//                 <input
//                   required
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50 
//                              focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none transition-colors"
//                   placeholder="j.doe@example.com"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     required
//                     type={showPassword ? "text" : "password"}
//                     value={formData.password}
//                     onChange={(e) =>
//                       setFormData({ ...formData, password: e.target.value })
//                     }
//                     className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50
//                                focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none transition-colors"
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-[#171512]/40 hover:text-[#d0a539] transition-colors"
//                   >
//                     <span className="text-xs font-bold">
//                       {showPassword ? "HIDE" : "SHOW"}
//                     </span>
//                   </button>
//                 </div>
//               </div>

//               <button
//                 disabled={loading}
//                 type="submit"
//                 className="w-full bg-[#d0a539] text-[#171512] font-black uppercase tracking-[0.2em] py-4 rounded-lg hover:bg-opacity-90 transition-all shadow-lg shadow-[#d0a539]/20 disabled:opacity-50"
//               >
//                 {/* Dynamic Loading Text */}
//                 {loading 
//                   ? (statusMessage === "Log In" ? "Signing In..." : statusMessage) 
//                   : "Log In"
//                 }
//               </button>
//             </form>

//             <p className="text-center text-sm text-[#171512]/60">
//               Don't have an account?{" "}
//               <Link
//                 // Ensure we pass the returnUrl to the Signup page too if it exists
//                 href={`/authentication/signup${returnUrl ? `?returnUrl=${returnUrl}` : ""}`}
//                 className="text-[#d0a539] font-black uppercase tracking-tighter hover:underline"
//               >
//                 Sign Up
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Main;













"use client";

import React, { useState, Suspense } from "react"; // 1. Import Suspense
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { apiClient } from "@/app/offers/api/projectApi";
import { Loader2 } from "lucide-react"; // Optional: for a nice loading spinner

// ==========================================
// 1. CREATE THE INNER COMPONENT (The Content)
// ==========================================
// This component holds all the logic that relies on searchParams
const SignInContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, loading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Log In");

  const returnUrl = searchParams.get("returnUrl");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError();
    setFormData({
      ...formData,
      [e.target.type === "email" ? "email" : "password"]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);

    if (success) {
      const pendingData = localStorage.getItem("pending_investment");

      if (pendingData) {
        setStatusMessage("Securing Investment...");
        try {
          const { planId } = JSON.parse(pendingData);
          await apiClient.submitInvestment(Number(planId));
          localStorage.removeItem("pending_investment");
          router.push("/dashboard");
        } catch (error) {
          console.error("Auto-submission failed", error);
          router.push("/investments");
        }
      } else {
        router.push(returnUrl || "/dashboard");
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Left Side: Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden h-full">
        <div className="absolute inset-0 z-10 bg-black/40"></div>
        <div
          className="absolute inset-0 z-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: 'url("/signin_img.jpg")',
          }}
        ></div>

        <div className="relative z-20 flex flex-col justify-between px-16 pt-[8rem] w-full h-full">
          <div className="max-w-md">
            <h1 className="text-white text-5xl font-black leading-tight mb-6">
              Invest in Land. Earn Through Agriculture.
            </h1>
            <p className="text-white/80 text-lg font-light leading-relaxed">
              Purchase verified farmland and have it professionally leased to
              farmers, generating steady annual returns backed by real assets.
            </p>
          </div>

          <div className="text-white/90 text-xs font-bold uppercase tracking-[0.3em] mb-12">
            © 2026 BugaKing Group
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-20 bg-white h-full overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight text-[#171512]">
              Welcome Back
            </h2>
            <p className="text-[#171512]/60 text-sm">
              Begin your journey with the world's premier investment group.
            </p>
          </div>

          {/* Global Error Message */}
          {error && (error.global || error.detail) && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {String(error.global || error.detail)}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
                Email Address
              </label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50 
                           focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none transition-colors"
                placeholder="j.doe@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
                Password
              </label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50
                             focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#171512]/40 hover:text-[#d0a539] transition-colors"
                >
                  <span className="text-xs font-bold">
                    {showPassword ? "HIDE" : "SHOW"}
                  </span>
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-[#d0a539] text-[#171512] font-black uppercase tracking-[0.2em] py-4 rounded-lg hover:bg-opacity-90 transition-all shadow-lg shadow-[#d0a539]/20 disabled:opacity-50"
            >
              {loading
                ? statusMessage === "Log In"
                  ? "Signing In..."
                  : statusMessage
                : "Log In"}
            </button>
          </form>

          <p className="text-center text-sm text-[#171512]/60">
            Don't have an account?{" "}
            <Link
              href={`/authentication/signup${
                returnUrl ? `?returnUrl=${returnUrl}` : ""
              }`}
              className="text-[#d0a539] font-black uppercase tracking-tighter hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. THE MAIN WRAPPER (Exports this)
// ==========================================
const Main = () => {
  return (
    <div className="bg-white text-[#171512] font-sans h-full">
      {/* The Suspense boundary allows Next.js to render a fallback (loading state)
         while it waits for searchParams to be available on the client.
      */}
      <Suspense
        fallback={
          <div className="h-full flex items-center justify-center bg-white">
             {/* Simple loading spinner while parameters load */}
            <Loader2 className="w-10 h-10 text-[#d0a539] animate-spin" />
          </div>
        }
      >
        <SignInContent />
      </Suspense>
    </div>
  );
};

export default Main;