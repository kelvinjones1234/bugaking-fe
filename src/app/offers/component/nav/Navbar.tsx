"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DesktopNavbar } from "@/components/nav/DesktopNavbar"; // Ensure this path matches your file structure
import { MobileNavbar } from "@/components/nav/MobileNavbar"; // Ensure this path matches your file structure
import { useAuth } from "@/context/AuthContext";

import { IMAGE_URL } from "@/utils/axios";

// CHANGE THIS: Your backend URL

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State to hold the full user object
  const [user, setUser] = useState<any | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const { logout } = useAuth();

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
            : `${IMAGE_URL}${rawPath}`;
          setProfileImage(fullPath);
        }
      } catch (error) {
        console.error("Error parsing user data", error);
        setUser(null);
      }
    }
  }, []);

  return (
    <header className="">
      {/* USING CSS GRID:
         grid-cols-3 creates three equal columns.
         1. Left Column: Logo
         2. Center Column: Navigation Links (Perfectly Centered)
         3. Right Column: User/Auth Buttons
      */}
      <div className="container-width grid grid-cols-3 items-center h-20 px-4 md:px-0">
        {/* --- LEFT SECTION (Logo) --- */}
        <div className="flex justify-start">
          <Link href="/">
            <Image
              src="/bugakingLogo.png"
              alt="Logo"
              width={80}
              height={50}
              className="object-contain"
            />
          </Link>
        </div>

        {/* --- CENTER SECTION (Nav Links) --- */}
        {/* Only show DesktopNavbar on medium screens and up */}
        <div className="flex justify-center">
          <div className="hidden md:block">
            <DesktopNavbar />
          </div>
        </div>

        {/* --- RIGHT SECTION (Buttons) --- */}
        <div className="flex items-center justify-end gap-4">
          {/* CONDITIONAL RENDERING START */}
          {user ? (
            // === LOGGED IN STATE ===
            <>
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

              {/* 1. Dashboard Button */}
              <Link href="/dashboard">
                <button
                  onClick={logout}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold border-2 border-primary rounded-lg text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Logout
                </button>
              </Link>
            </>
          ) : (
            // === GUEST STATE (NOT LOGGED IN) ===
            <Link href="/authentication/signin">
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold border-2 border-primary rounded-lg text-primary hover:bg-primary hover:text-white transition-all duration-300">
                Invest Now
              </button>
            </Link>
          )}
          {/* CONDITIONAL RENDERING END */}

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center">
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
