import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@/pages/Blog/blogData";

const BASE_URL = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/notion-blog`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const headers = {
  Authorization: `Bearer ${ANON_KEY}`,
  apikey: ANON_KEY,
};

export interface BlogFetchResult {
  posts: BlogPost[];
  notionConnected: boolean;
}

async function fetchBlogPosts(): Promise<BlogFetchResult> {
  try {
    const res = await fetch(BASE_URL, { headers });
    if (!res.ok) return { posts: [], notionConnected: false };

    const data = await res.json();
    const posts = Array.isArray(data) ? data : [];
    return { posts, notionConnected: posts.length > 0 };
  } catch {
    return { posts: [], notionConnected: false };
  }
}

async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${BASE_URL}?slug=${encodeURIComponent(slug)}&content=true`, { headers });
    if (!res.ok) return null;

    const data = await res.json();
    return data && typeof data === "object" && "slug" in data ? (data as BlogPost) : null;
  } catch {
    return null;
  }
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
