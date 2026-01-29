import React from "react";
import { Bell } from "lucide-react";
import { IMAGE_URL } from "@/utils/axios";

interface NotificationComponentProps {
  userImage?: string | null;
  hasNotifications?: boolean;
}

const NotificationComponent = ({ 
  userImage,
  hasNotifications = true,
}: NotificationComponentProps) => {
  // Determine final image path
  // If userImage is missing, fallback to the default placeholder
  const finalImage = userImage 

  return (
    <div className="flex items-center gap-4 w-full md:w-auto justify-end">
      {/* Notification Bell */}
      <button className="p-2 text-[#171512]/40 hover:text-[#d0a539] transition-colors relative">
        <Bell size={24} strokeWidth={2} />
        {hasNotifications && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#d0a539] rounded-full border-2 border-[#f8f7f6]"></span>
        )}
      </button>

      {/* Profile Image */}
      <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full border-2 border-[#d0a539] p-0.5">
        <div
          className="h-full w-full rounded-full bg-cover bg-center bg-gray-200"
          style={{
            backgroundImage: `url('${IMAGE_URL}${finalImage}')`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default NotificationComponent;