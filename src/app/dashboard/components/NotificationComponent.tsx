"use client";

import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { apiClient, HeaderData, UserProfile } from "../api/profileApi";
import { EditProfileModal } from "./EditProfileModal"; // Adjust path if necessary

const NotificationComponent = () => {
  // Header specific data (counts, flags)
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  // Full profile data (needed for the Modal form fields)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both header stats and full profile data in parallel
        const [hData, pData] = await Promise.all([
          apiClient.getHeaderData(),
          apiClient.getProfile()
        ]);
        
        setHeaderData(hData);
        setUserProfile(pData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Callback when modal saves successfully
  const handleProfileUpdate = (updatedUser: UserProfile) => {
    // 1. Update the full profile state
    setUserProfile(updatedUser);
    
    // 2. Update the header image immediately so the user sees the change
    if (updatedUser.profile_picture) {
      setHeaderData((prev) => prev ? ({
        ...prev,
        profile_image: updatedUser.profile_picture || null
      }) : null);
    }
  };

  // Determine image source
  const finalImage = headerData?.profile_image || "/leadership2.jpg";

  if (loading) {
    return <div className="animate-pulse w-10 h-10 bg-gray-200 rounded-full"></div>;
  }

  return (
    <>
      <div className="flex items-center gap-4 w-full md:w-auto justify-end">
        {/* Notification Bell */}
        <button className="p-2 text-[#171512]/40 hover:text-[#d0a539] transition-colors relative">
          <Bell size={24} strokeWidth={2} />
          
          {/* Red Dot Indicator */}
          {headerData?.has_notifications && (
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d0a539] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d0a539]"></span>
            </span>
          )}
        </button>

        {/* Profile Image - Clickable */}
        <div 
          onClick={() => setIsModalOpen(true)}
          className="h-10 w-10 lg:h-12 lg:w-12 rounded-full border-2 border-[#d0a539] p-0.5 cursor-pointer hover:shadow-md hover:scale-105 transition-all"
          title="Edit Profile"
        >
          <div
            className="h-full w-full rounded-full bg-cover bg-center bg-gray-200"
            style={{
              backgroundImage: `url('${finalImage}')`,
            }}
          ></div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentUser={userProfile}
        onSuccess={handleProfileUpdate}
      />
    </>
  );
};

export default NotificationComponent;