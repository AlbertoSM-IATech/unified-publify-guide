
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Placeholder mock client that doesn't connect to any real Supabase instance
const mockClient = {
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
        data: [],
        error: null
      }),
      data: [],
      error: null
    }),
    insert: () => ({
      select: () => ({
        single: async () => ({ data: null, error: null })
      })
    }),
    update: () => ({
      eq: () => ({
        select: () => ({
          single: async () => ({ data: null, error: null })
        })
      })
    }),
    delete: () => ({
      eq: () => ({
        match: () => ({ error: null }),
        error: null
      }),
      match: () => ({ error: null }),
      error: null
    })
  }),
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    signOut: async () => ({ error: null })
  },
  storage: {
    from: () => ({
      upload: async () => ({ data: { path: 'mock-path' }, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: 'https://edit.org/images/cat/portadas-libros-big-2019101610.jpg' } })
    })
  }
} as unknown as SupabaseClient;

// Export the mock client as supabase
export const supabase = mockClient;

// This now always returns false to prevent any Supabase connection attempts
export const canConnectToSupabase = (): boolean => false;
