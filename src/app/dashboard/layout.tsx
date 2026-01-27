"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sidebar } from "./components/Sidebar"; // Update import paths relative to layout
import MobileSidebar from "./components/MobileSidebar";
import Approval from "./components/Approval";
import { apiClient, UserProfile } from "./api/profileApi";
import ProtectedRoute from "@/utils/PrivateRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch Profile Logic (Moved from Page to Layout)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiClient.getProfile();
        setUser(data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 2. Helper for Approval Check
  const isApproved = user && (
    user.is_approved === true || 
    String(user.is_approved).toLowerCase() === "true"
  );

  // 3. Loading Screen (Global for the dashboard)
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#f8f7f6]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-24 h-24 animate-pulse">
            <Image
              src="/bugakingLogo.png" // Ensure path is correct
              alt="Loading..."
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="text-[#171512]/40 text-xs font-black uppercase tracking-[0.3em] animate-pulse">
            Loading Dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-[#f8f7f6]">
        {/* GLOBAL SIDEBARS */}
        <MobileSidebar />
        <Sidebar />

        {/* MAIN CONTENT WRAPPER */}
        <div className="w-full lg:ml-64 transition-all duration-300">
          
          {/* THE APPROVAL GATE 
            If user is NOT approved, we hijack the view and show the Approval component 
            instead of the requested page (children).
          */}
          {isApproved ? (
            children
          ) : (
            <Approval user={user} onProfileUpdate={setUser} />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}