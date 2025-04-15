
import { supabaseCore } from "./core";

export const profileService = {
  get: async (userId: string) => {
    return supabaseCore.getById('profiles', userId);
  },
  
  update: async (userId: string, data: any) => {
    return supabaseCore.update('profiles', userId, data);
  },
  
  updateAvatar: async (userId: string, avatarUrl: string) => {
    return supabaseCore.update('profiles', userId, { avatar_url: avatarUrl });
  }
};
