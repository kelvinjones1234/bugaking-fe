"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DesktopNavbar } from "./DesktopNavbar"; // Adjust path as needed
import { MobileNavbar } from "./MobileNavbar"; // Adjust path as needed

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add shadow when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full ${
        isScrolled
          ? "bg-white/95"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-width flex items-center justify-between h-20">
        {/* --- LEFT SECTION: LOGO --- */}
        <div className="flex items-center gap-6">
          {/* Logo Icon */}
          <div>
            <Image src="/bugakingLogo.png" alt="Logo" width={80} height={50} />
          </div>

          {/* Desktop Navigation Links */}
          <DesktopNavbar />
        </div>

        {/* --- RIGHT SECTION: ACTIONS --- */}
        <div className="flex items-center gap-4">
          {/* Invest Button (Hidden on mobile) */}
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold border-2 border-primary rounded-lg text-primary hover:bg-primary hover:text-charcoal transition-all duration-300">
            Invest Now
          </button>

          {/* Profile Icon */}
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30 text-primary hover:bg-primary hover:text-charcoal transition-colors cursor-pointer">
            {/* SVG Replacement for 'person' icon */}
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
          </div>

          {/* Mobile Menu Trigger (Hamburger) */}
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
