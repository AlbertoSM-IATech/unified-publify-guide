
import { supabaseCore } from "./core";
import { toast } from "@/hooks/use-toast";

// Default profile data for mock purposes
const DEFAULT_PROFILE = {
  id: "1",
  nombre: "Usuario Demo",
  email: "demo@publify.com",
  avatar_url: "https://i.pravatar.cc/150?img=5",
};

export const profileService = {
  get: async (userId: string) => {
    console.log(`[MOCK] Getting profile for user ${userId} from localStorage`);
    
    // Return from localStorage if available
    const storedProfile = localStorage.getItem('userData');
    if (storedProfile) {
      return JSON.parse(storedProfile);
    }
    
    // Use default profile as a fallback
    console.log("[MOCK] No profile in localStorage, using default");
    localStorage.setItem('userData', JSON.stringify(DEFAULT_PROFILE));
    return DEFAULT_PROFILE;
  },
  
  update: async (userId: string, data: any) => {
    console.log(`[MOCK] Updating profile for user ${userId} in localStorage`, data);
    
    // Get current profile
    const storedProfile = localStorage.getItem('userData');
    const profile = storedProfile ? JSON.parse(storedProfile) : DEFAULT_PROFILE;
    
    // Update profile
    const updatedProfile = { ...profile, ...data };
    
    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify(updatedProfile));
    
    // Notify with toast
    toast({
      title: "Perfil actualizado",
      description: "Tu perfil ha sido actualizado exitosamente",
    });
    
    return updatedProfile;
  },
  
  updateAvatar: async (userId: string, avatarUrl: string) => {
    console.log(`[MOCK] Updating avatar for user ${userId} in localStorage`);
    
    // Get current profile
    const storedProfile = localStorage.getItem('userData');
    const profile = storedProfile ? JSON.parse(storedProfile) : DEFAULT_PROFILE;
    
    // Update avatar_url
    const updatedProfile = { ...profile, avatar_url: avatarUrl };
    
    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify(updatedProfile));
    
    // Notify with toast
    toast({
      title: "Avatar actualizado",
      description: "Tu imagen de perfil ha sido actualizada exitosamente",
    });
    
    return updatedProfile;
  }
};
