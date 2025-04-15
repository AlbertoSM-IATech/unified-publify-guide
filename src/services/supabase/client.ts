
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// This URL and key are placeholders that will be replaced with actual values when connected
// to Supabase through the Lovable Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

// Create the Supabase client
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// Helper to determine if we can connect to Supabase
export const canConnectToSupabase = (): boolean => {
  return supabaseUrl !== 'https://your-supabase-url.supabase.co' && 
         supabaseKey !== 'your-supabase-anon-key';
}
