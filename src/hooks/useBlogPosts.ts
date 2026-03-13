import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@/pages/Blog/blogData";

const BASE_URL = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/notion-blog`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const headers = {
  Authorization: `Bearer ${ANON_KEY}`,
  apikey: ANON_KEY,
};

async function fetchBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch(BASE_URL, { headers });
  if (!res.ok) throw new Error("Failed to fetch blog posts");
  return res.json();
}

async function fetchBlogPost(slug: string): Promise<BlogPost> {
  const res = await fetch(`${BASE_URL}?slug=${encodeURIComponent(slug)}&content=true`, { headers });
  if (!res.ok) throw new Error("Failed to fetch blog post");
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
