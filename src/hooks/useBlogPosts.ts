import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/pages/Blog/blogData";

async function fetchBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase.functions.invoke("notion-blog");
  if (error) throw error;
  return data as BlogPost[];
}

async function fetchBlogPost(slug: string): Promise<BlogPost> {
  const { data, error } = await supabase.functions.invoke("notion-blog", {
    body: null,
    headers: {},
  });
  // We need to pass query params — use fetch directly
  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
  const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  const res = await fetch(
    `https://${projectId}.supabase.co/functions/v1/notion-blog?slug=${encodeURIComponent(slug)}&content=true`,
    {
      headers: {
        Authorization: `Bearer ${anonKey}`,
        apikey: anonKey,
      },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ["blog-posts"],
    queryFn: fetchBlogPosts,
    staleTime: 5 * 60 * 1000,
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => fetchBlogPost(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}
