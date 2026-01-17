"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";
import Image from "next/image";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // HTML Header: sticky top-0 z-50 bg-background-light/80... border-b...
    <header
      className={`sticky top-0 z-50 w-full ${
        isScrolled
          ? "bg-white/95"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* HTML Container: max-w-[1440px] mx-auto px-6 md:px-20 py-4 flex items-center justify-between */}
      <div className="container-width flex items-center justify-between h-20">
        {/* --- LEFT SECTION: LOGO --- */}
        <div>
          <Image src="/bugakingLogo.png" alt="Logo" width={80} height={50} />
        </div>

        {/* --- CENTER SECTION: DESKTOP NAV --- */}
        <DesktopNavbar />

        {/* --- RIGHT SECTION: ACTIONS --- */}
        <div className="flex items-center gap-4">
          {/* Investor Portal Button (from HTML) */}
          <button className="hidden md:flex items-center justify-center rounded-xl h-10 px-5 bg-primary text-white text-sm font-bold tracking-wide hover:brightness-110 transition-all">
            Investor Portal
          </button>

          {/* Mobile Menu Trigger */}
          {/* We wrap MobileNavbar in the style from the HTML's menu button container if needed, 
              but since MobileNavbar likely contains the button, we place it here. 
              The HTML used: p-2 rounded-full bg-white border... */}
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
