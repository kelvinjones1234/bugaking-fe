// import { api } from "@/utils/axios";

// // Define the shape of your User Profile data
// export interface UserProfile {
//   id: number;
//   email: string;
//   first_name: string;
//   last_name: string; 
//   phone_number: string;
//   address: string;
//   profile_picture: string | null; // URL or null
//   is_approved: Boolean;
// }

// // Define the shape of data sent when updating (Partial allows updating just one field)
// export interface UpdateProfilePayload {
//   first_name?: string;
//   last_name?: string;
//   phone_number?: string;
//   address?: string;
//   profile_picture?: File; // Note: For upload, this must be a File object
// }

// class APIClient {
//   private static instance: APIClient;

//   private constructor() {}

//   static getInstance(): APIClient {
//     if (!APIClient.instance) {
//       APIClient.instance = new APIClient();
//     }
//     return APIClient.instance;
//   }

//   // --- Helper to extract data ---
//   private handleResponse<T>(response: any): T {
//     return response.data;
//   }

//   // --- Profile API Methods ---

//   /**
//    * Fetches the current logged-in user's profile
//    */
//   async getProfile(): Promise<UserProfile> {
//     const response = await api.get("/profile/");
//     return this.handleResponse<UserProfile>(response);
//   }

//   /**
//    * Updates the user profile.
//    * Handles both text fields and file uploads (profile_picture) automatically.
//    */
//   async updateProfile(data: UpdateProfilePayload): Promise<UserProfile> {
//     const formData = new FormData();

//     // Append text fields if they exist
//     if (data.first_name) formData.append("first_name", data.first_name);
//     if (data.last_name) formData.append("last_name", data.last_name);
//     if (data.phone_number) formData.append("phone_number", data.phone_number);
//     if (data.address) formData.append("address", data.address);

//     // Append file if it exists 
//     if (data.profile_picture) {
//       formData.append("profile_picture", data.profile_picture);
//     }

//     // Use PATCH for partial updates
//     const response = await api.patch("/profile/", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     return this.handleResponse<UserProfile>(response);
//   }
// }

// export const apiClient = APIClient.getInstance();









import { api } from "@/utils/axios";

// 1. Define the nested profile structure
export interface ProfileDetails {
  address: string;
  profile_picture: string | null;
}

// 2. Define the Main User Profile data
export interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string; 
  phone_number: string;
  is_approved: boolean; // Changed to lowercase 'boolean' (TS standard)
  profile: ProfileDetails; // ✅ This was the missing link
}

// 3. Update payload to match the nested structure for updates if necessary
export interface UpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  address?: string;
  profile_picture?: File;
}

class APIClient {
  private static instance: APIClient;
  private constructor() {}

  static getInstance(): APIClient {
    if (!APIClient.instance) {
      APIClient.instance = new APIClient();
    }
    return APIClient.instance;
  }

  private handleResponse<T>(response: any): T {
    return response.data;
  }

  async getProfile(): Promise<UserProfile> {
    const response = await api.get("/profile/");
    return this.handleResponse<UserProfile>(response);
  }

  async updateProfile(data: UpdateProfilePayload): Promise<UserProfile> {
    const formData = new FormData();

    if (data.first_name) formData.append("first_name", data.first_name);
    if (data.last_name) formData.append("last_name", data.last_name);
    if (data.phone_number) formData.append("phone_number", data.phone_number);
    
    // If your backend expects 'address' inside the nested profile, 
    // you might need to adjust these keys based on your Django Serializer
    if (data.address) formData.append("address", data.address);

    if (data.profile_picture) {
      formData.append("profile_picture", data.profile_picture);
    }

    const response = await api.patch("/profile/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return this.handleResponse<UserProfile>(response);
  }
}

export const apiClient = APIClient.getInstance();