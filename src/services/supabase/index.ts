
import { supabase, canConnectToSupabase } from './client';
import { supabaseCore } from './core';
import { booksService } from './books';
import { collectionsService } from './collections';
import { profileService } from './profile';

// Export full Supabase client for direct access when needed
export { supabase, canConnectToSupabase };

// Export the complete service object with all modules
export const supabaseService = {
  // Re-export core CRUD functionality
  ...supabaseCore,
  
  // Domain-specific services
  books: booksService,
  collections: collectionsService,
  profile: profileService
};
