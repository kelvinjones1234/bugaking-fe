"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";
import Image from "next/image";
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
        {/* --- LOGO SECTION --- */}
        <div>
          <Image src="/bugakingLogo.png" alt="Logo" width={80} height={50} />
        </div>
        {/* --- DESKTOP NAVIGATION (Hidden on Mobile) --- */}
        <div className="hidden lg:block">
          <DesktopNavbar />
        </div>
        {/* Actions */}
        <div className="flex items-center gap-6">
          <button className="bg-primary text-charcoal px-6 py-2 rounded-brand text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            Inquire
          </button>
        </div>
        {/* --- MOBILE NAVIGATION (Hidden on Desktop) --- */}
        <div className="lg:hidden">
          <MobileNavbar isOpen={isMobileOpen} setIsOpen={setIsMobileOpen} />
        </div>
      </div>
    </header>
  );
}
