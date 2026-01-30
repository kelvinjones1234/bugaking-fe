// "use client";

// import React, { useState, useEffect } from "react";
// import { X, Camera } from "lucide-react";
// import {
//   apiClient,
//   UserProfile,
//   UpdateProfilePayload,
// } from "../api/profileApi";

// interface EditProfileModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   currentUser: UserProfile | null;
//   onSuccess: (updatedProfile: UserProfile) => void;
// }

// export const EditProfileModal: React.FC<EditProfileModalProps> = ({
//   isOpen,
//   onClose,
//   currentUser,
//   onSuccess,
// }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Form State
//   const [formData, setFormData] = useState<UpdateProfilePayload>({
//     first_name: "",
//     last_name: "",
//     phone_number: "",
//     address: "",
//   });

//   // File state for preview only
//   const [previewImage, setPreviewImage] = useState<string | null>(null);

//   // Sync form with user data when modal opens
//   useEffect(() => {
//     if (isOpen && currentUser) {
//       setFormData({
//         first_name: currentUser.first_name || "",
//         last_name: currentUser.last_name || "",
//         phone_number: currentUser.phone_number || "",
//         address: currentUser.address || "",
//       });
//       setPreviewImage(currentUser.profile_picture || null);
//       setError(null);
//     }
//   }, [isOpen, currentUser]);

//   // Handle Input Change
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle File Change
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];

//       // Update payload
//       setFormData({ ...formData, profile_picture: file });

//       // Create preview URL
//       const objectUrl = URL.createObjectURL(file);
//       setPreviewImage(objectUrl);
//     }
//   };

//   // Handle Submit
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     try {
//       const updated = await apiClient.updateProfile(formData);
//       onSuccess(updated);
//       onClose();
//     } catch (err) {
//       console.error("Failed to update profile", err);
//       setError("Failed to save changes. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Don't render if closed
//   if (!isOpen) return null;

//   return (
//     // Backdrop
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       {/* Overlay Background */}
//       <div
//         className="absolute inset-0 bg-[#171512]/80 backdrop-blur-sm transition-opacity"
//         onClick={onClose}
//       ></div>

//       {/* Modal Content */}
//       <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
//         {/* Header */}
//         <div className="bg-[#171512] px-6 py-5 flex justify-between items-center shrink-0">
//           <div>
//             <h3 className="text-xl font-serif font-bold text-white">
//               Edit Profile
//             </h3>
//             <p className="text-[#d0a539] text-[10px] uppercase tracking-[0.2em] font-bold mt-1">
//               Update your details
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-white/50 hover:text-[#d0a539] transition-colors p-1 rounded-full hover:bg-white/5"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         {/* Scrollable Form Body */}
//         <div className="overflow-y-auto p-6 lg:p-8 custom-scrollbar">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Error Message */}
//             {error && (
//               <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100">
//                 {error}
//               </div>
//             )}

//             {/* Photo Upload */}
//             <div className="flex items-center gap-5 pb-4 border-b border-[#171512]/5">
//               <div className="relative h-20 w-20 shrink-0">
//                 <div className="h-full w-full rounded-full bg-[#171512]/5 border-2 border-dashed border-[#171512]/20 flex items-center justify-center overflow-hidden">
//                   {previewImage ? (
//                     <img
//                       src={previewImage}
//                       alt="Preview"
//                       className="h-full w-full object-cover"
//                     />
//                   ) : (
//                     <Camera size={28} className="text-[#171512]/30" />
//                   )}
//                 </div>
//                 {/* Hidden File Input */}
//                 <input
//                   type="file"
//                   id="profile_pic"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="profile_pic"
//                   className="inline-block cursor-pointer bg-[#171512] text-[#d0a539] px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-[#d0a539] hover:text-[#171512] transition-colors"
//                 >
//                   Change Photo
//                 </label>
//                 <p className="text-[10px] text-gray-400 mt-2 font-medium">
//                   Supports JPG, PNG (Max 2MB)
//                 </p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//               {/* First Name */}
//               <div className="space-y-1">
//                 <label className="text-xs font-bold uppercase tracking-wider text-[#171512]/60">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   name="first_name"
//                   value={formData.first_name}
//                   onChange={handleChange}
//                   className="w-full bg-[#f8f7f6] border border-[#171512]/10 rounded-lg px-4 py-3 text-[#171512] focus:outline-none focus:border-[#d0a539] focus:ring-1 focus:ring-[#d0a539] transition-all font-medium text-sm"
//                 />
//               </div>

//               {/* Last Name */}
//               <div className="space-y-1">
//                 <label className="text-xs font-bold uppercase tracking-wider text-[#171512]/60">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   name="last_name"
//                   value={formData.last_name}
//                   onChange={handleChange}
//                   className="w-full bg-[#f8f7f6] border border-[#171512]/10 rounded-lg px-4 py-3 text-[#171512] focus:outline-none focus:border-[#d0a539] focus:ring-1 focus:ring-[#d0a539] transition-all font-medium text-sm"
//                 />
//               </div>
//             </div>

//             {/* Phone */}
//             <div className="space-y-1">
//               <label className="text-xs font-bold uppercase tracking-wider text-[#171512]/60">
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 name="phone_number"
//                 value={formData.phone_number}
//                 onChange={handleChange}
//                 placeholder="+234..."
//                 className="w-full bg-[#f8f7f6] border border-[#171512]/10 rounded-lg px-4 py-3 text-[#171512] focus:outline-none focus:border-[#d0a539] focus:ring-1 focus:ring-[#d0a539] transition-all font-medium text-sm"
//               />
//             </div>

//             {/* Address */}
//             <div className="space-y-1">
//               <label className="text-xs font-bold uppercase tracking-wider text-[#171512]/60">
//                 Residential Address
//               </label>
//               <textarea
//                 name="address"
//                 rows={3}
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="w-full bg-[#f8f7f6] border border-[#171512]/10 rounded-lg px-4 py-3 text-[#171512] focus:outline-none focus:border-[#d0a539] focus:ring-1 focus:ring-[#d0a539] transition-all font-medium resize-none text-sm"
//               />
//             </div>

//             {/* Action Buttons */}
//             <div className="pt-4 flex gap-3">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 px-4 py-3 border border-[#171512]/10 rounded-xl text-sm font-bold uppercase tracking-widest text-[#171512]/60 hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="flex-1 px-4 py-3 bg-[#171512] text-[#d0a539] rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#d0a539] hover:text-[#171512] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#d0a539]/10"
//               >
//                 {isLoading ? <>Updating...</> : <>Save Changes</>}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };



"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { X, Save, Loader2, Camera } from "lucide-react";
import {
  apiClient,
  UserProfile,
  UpdateProfilePayload,
} from "../api/profileApi";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onSuccess: (updatedProfile: UserProfile) => void;
}

const EditProfileModalComponent: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Separate file state from text data for cleaner logic
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
  });

  // 1. OPTIMIZATION: Memoize the default values to prevent effect loops
  const defaultValues = useMemo(
    () => ({
      first_name: currentUser?.first_name || "",
      last_name: currentUser?.last_name || "",
      phone_number: currentUser?.phone_number || "",
      address: currentUser?.address || "",
      profile_picture: currentUser?.profile_picture || null,
    }),
    [currentUser],
  );

  // Sync form with user data when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        first_name: defaultValues.first_name,
        last_name: defaultValues.last_name,
        phone_number: defaultValues.phone_number,
        address: defaultValues.address,
      });
      setPreviewImage(defaultValues.profile_picture);
      setSelectedFile(null);
      setError(null);
    }
  }, [isOpen, defaultValues]);

  // 2. OPTIMIZATION: Memory Leak Prevention
  // Cleanup object URLs when component unmounts or image changes
  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  // 3. UX: Close on Escape Key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create local preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    }
  };

  // 4. OPTIMIZATION: Dirty Checking (Only send changed fields)
  const getChangedFields = () => {
    const changes: UpdateProfilePayload = {};
    let hasChanges = false;

    if (formData.first_name !== defaultValues.first_name) {
      changes.first_name = formData.first_name;
      hasChanges = true;
    }
    if (formData.last_name !== defaultValues.last_name) {
      changes.last_name = formData.last_name;
      hasChanges = true;
    }
    if (formData.phone_number !== defaultValues.phone_number) {
      changes.phone_number = formData.phone_number;
      hasChanges = true;
    }
    if (formData.address !== defaultValues.address) {
      changes.address = formData.address;
      hasChanges = true;
    }
    if (selectedFile) {
      changes.profile_picture = selectedFile;
      hasChanges = true;
    }

    return { changes, hasChanges };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { changes, hasChanges } = getChangedFields();

    // 5. OPTIMIZATION: Early Return
    if (!hasChanges) {
      onClose(); // Close if nothing changed
      return;
    }

    setIsLoading(true);

    try {
      const updated = await apiClient.updateProfile(changes);
      onSuccess(updated);
      onClose();
    } catch (err) {
      console.error("Failed to update profile", err);
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#171512]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        <div className="bg-[#171512] px-6 py-5 flex justify-between items-center shrink-0">
          <div>
            <h3 className="text-xl font-serif font-bold text-white">
              Edit Profile
            </h3>
            <p className="text-[#d0a539] text-[10px] uppercase tracking-[0.2em] font-bold mt-1">
              Update your details
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-[#d0a539] transition-colors p-1 rounded-full hover:bg-white/5"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 lg:p-8 custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <div className="flex items-center gap-5 pb-4 border-b border-[#171512]/5">
              <div className="relative h-20 w-20 shrink-0">
                <div className="h-full w-full rounded-full bg-[#171512]/5 border-2 border-dashed border-[#171512]/20 flex items-center justify-center overflow-hidden">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Camera size={28} className="text-[#171512]/30" />
                  )}
                </div>
                <input
                  type="file"
                  id="profile_pic"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <div>
                <label
                  htmlFor="profile_pic"
                  className="inline-block cursor-pointer bg-[#171512] text-[#d0a539] px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-[#d0a539] hover:text-[#171512] transition-colors"
                >
                  Change Photo
                </label>
                <p className="text-[10px] text-gray-400 mt-2 font-medium">
                  Supports JPG, PNG (Max 2MB)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#171512]/60">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full bg-[#f8f7f6] border border-[#171512]/10 rounded-lg px-4 py-3 text-[#171512] focus:outline-none focus:border-[#d0a539] focus:ring-1 focus:ring-[#d0a539] transition-all font-medium text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#171512]/60">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full bg-[#f8f7f6] border border-[#171512]/10 rounded-lg px-4 py-3 text-[#171512] focus:outline-none focus:border-[#d0a539] focus:ring-1 focus:ring-[#d0a539] transition-all font-medium text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#171512]/60">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="+234..."
                className="w-full bg-[#f8f7f6] border border-[#171512]/10 rounded-lg px-4 py-3 text-[#171512] focus:outline-none focus:border-[#d0a539] focus:ring-1 focus:ring-[#d0a539] transition-all font-medium text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#171512]/60">
                Residential Address
              </label>
              <textarea
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-[#f8f7f6] border border-[#171512]/10 rounded-lg px-4 py-3 text-[#171512] focus:outline-none focus:border-[#d0a539] focus:ring-1 focus:ring-[#d0a539] transition-all font-medium resize-none text-sm"
              />
            </div>

            <div className="pt-4 flex gap-3">
              {" "}
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-[#171512]/10 rounded-xl text-sm font-bold uppercase tracking-widest text-[#171512]/60 hover:bg-gray-50 transition-colors"
              >
                {" "}
                Cancel{" "}
              </button>{" "}
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-[#171512] text-[#d0a539] rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#d0a539] hover:text-[#171512] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#d0a539]/10"
              >
                {isLoading ? <>Updating...</> : <>Save Changes</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// 6. OPTIMIZATION: Render Performance
// Prevents re-renders if the parent updates but the modal props haven't changed
export const EditProfileModal = React.memo(EditProfileModalComponent);
