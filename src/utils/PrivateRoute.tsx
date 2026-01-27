// "use client";

// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import Image from "next/image";

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const { isAuthenticated, isInitialized } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (isInitialized && !isAuthenticated) {
//       router.replace("/authentication/signin");
//     }
//   }, [isInitialized, isAuthenticated, router]);

//   if (!isInitialized)
//     return (
//       <div className="p-10 text-center">
//         <div>
//           <Image src="/bugakingLogo.png" alt="Logo" width={80} height={50} />
//           <div>Loading...</div>
//         </div>
//       </div>
//     );
//   if (!isAuthenticated) return null;

//   return <>{children}</>;
// };

// export default ProtectedRoute;






"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if auth is done initializing and user is NOT authenticated
    if (isInitialized && !isAuthenticated) {
      router.replace("/authentication/signin");
    }
  }, [isInitialized, isAuthenticated, router]);

  // Loading State
  if (!isInitialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#f8f7f6]">
        <div className="flex flex-col items-center gap-4">
          {/* Logo with Pulse Animation */}
          <div className="relative w-24 h-24 animate-pulse">
            <Image 
              src="/bugakingLogo.png" 
              alt="Loading..." 
              fill 
              className="object-contain"
              priority
            />
          </div>
          
          {/* Optional Loading Text */}
          <div className="text-[#171512]/40 text-xs font-black uppercase tracking-[0.3em] animate-pulse">
            Authenticating...
          </div>
        </div>
      </div>
    );
  }

  // If we are initialized but not authenticated, render nothing 
  // (the useEffect above will handle the redirect).
  if (!isAuthenticated) return null;

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;