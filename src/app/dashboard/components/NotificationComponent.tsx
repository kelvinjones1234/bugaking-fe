// import React from "react";
// import { Bell } from "lucide-react";
// import { IMAGE_URL } from "@/utils/axios";

// interface NotificationComponentProps {
//   userImage?: string | null;
//   hasNotifications?: boolean;
// }

// const NotificationComponent = ({ 
//   userImage,
//   hasNotifications = true,
// }: NotificationComponentProps) => {
//   // Determine final image path
//   // If userImage is missing, fallback to the default placeholder
//   const finalImage = userImage 

//   console.log("image", finalImage);
  

//   return (
//     <div className="flex items-center gap-4 w-full md:w-auto justify-end">
//       {/* Notification Bell */}
//       <button className="p-2 text-[#171512]/40 hover:text-[#d0a539] transition-colors relative">
//         <Bell size={24} strokeWidth={2} />
//         {hasNotifications && (
//           <span className="absolute top-2 right-2 w-2 h-2 bg-[#d0a539] rounded-full border-2 border-[#f8f7f6]"></span>
//         )}
//       </button>

//       {/* Profile Image */}
//       <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full border-2 border-[#d0a539] p-0.5">
//         <div
//           className="h-full w-full rounded-full bg-cover bg-center bg-gray-200"
//           style={{
//             backgroundImage: `url('${IMAGE_URL}${finalImage}')`,
//           }}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default NotificationComponent;

















"use client";

import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { apiClient, HeaderData } from "../api/profileApi";

const NotificationComponent = () => {
  const [data, setData] = useState<HeaderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headerData = await apiClient.getHeaderData();
        setData(headerData);
      } catch (error) {
        console.error("Error fetching header data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Determine image source
  // The backend sends a full absolute URL, so we use it directly.
  // Fallback to placeholder if null.
  const finalImage = data?.profile_image || "/leadership2.jpg"; 

  if (loading) {
    return <div className="animate-pulse w-10 h-10 bg-gray-200 rounded-full"></div>;
  }

  return (
    <div className="flex items-center gap-4 w-full md:w-auto justify-end">
      {/* Notification Bell */}
      <button className="p-2 text-[#171512]/40 hover:text-[#d0a539] transition-colors relative">
        <Bell size={24} strokeWidth={2} />
        
        {/* Red Dot Indicator */}
        {data?.has_notifications && (
          <span className="absolute top-2 right-2 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d0a539] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d0a539]"></span>
          </span>
        )}
      </button>

      {/* Profile Image */}
      <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full border-2 border-[#d0a539] p-0.5">
        <div
          className="h-full w-full rounded-full bg-cover bg-center bg-gray-200"
          style={{
            backgroundImage: `url('${finalImage}')`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default NotificationComponent;