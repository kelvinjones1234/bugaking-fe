"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";

// CHANGE THIS: Your backend URL
const API_BASE_URL = "http://localhost:8000"; 

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State to hold the full user object
  const [user, setUser] = useState<any | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    // 1. Check Local Storage for User Data
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser); // Set user state to trigger "Logged In" view

        // 2. Parse Profile Picture if it exists
        const rawPath = parsedUser?.profile?.profile_picture;
        if (rawPath) {
          const fullPath = rawPath.startsWith("http") 
            ? rawPath 
            : `${API_BASE_URL}${rawPath}`;
          setProfileImage(fullPath);
        }
      } catch (error) {
        console.error("Error parsing user data", error);
        setUser(null);
      }
    }
  }, []);

  return (
    <header className="sticky top-0 z-[999] bg-white/90 w-full">
      <div className="container-width flex items-center justify-between h-20">
        {/* --- LEFT SECTION --- */}
        <div className="flex items-center gap-6">
          <Link href="/">
            <Image src="/bugakingLogo.png" alt="Logo" width={80} height={50} />
          </Link>
          <DesktopNavbar />
        </div>

        {/* --- RIGHT SECTION --- */}
        <div className="flex items-center gap-4">
          
          {/* CONDITIONAL RENDERING START */}
          {user ? (
            // === LOGGED IN STATE ===
            <>
              {/* 1. Dashboard Button */}
              <Link href="/dashboard">
                <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold border-2 border-primary rounded-lg text-primary hover:bg-primary hover:text-[var(--foreground)] transition-all duration-300">
                  Dashboard
                </button>
              </Link>

              {/* 2. Profile Image */}
              <Link href="/dashboard">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30 text-primary hover:bg-primary hover:text-charcoal transition-colors cursor-pointer overflow-hidden relative">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    // Default Icon
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </Link>
            </>
          ) : (
            // === GUEST STATE (NOT LOGGED IN) ===
            // Only show Invest Now button
            <Link href="/authentication/signin">
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold border-2 border-primary rounded-lg text-primary hover:bg-primary hover:text-[var(--foreground)] transition-all duration-300">
                Invest Now
              </button>
            </Link>
          )}
          {/* CONDITIONAL RENDERING END */}

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <MobileNavbar
              isOpen={isMobileMenuOpen}
              setIsOpen={setIsMobileMenuOpen}
            />
          </div>
        </div>
      </div>
    </header>
  );
}