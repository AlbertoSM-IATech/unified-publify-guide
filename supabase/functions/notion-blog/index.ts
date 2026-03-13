import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const NOTION_API_URL = 'https://api.notion.com/v1';
const DEFAULT_DATABASE_ID = 'bd8d89104b68447d8d99d1abd63f83bf';

interface NotionRichText {
  plain_text: string;
}

interface NotionApiError {
  status?: number;
  code?: string;
  message?: string;
}

interface NotionBlock {
  type: string;
  [key: string]: any;
}

function parseNotionError(raw: string): NotionApiError | null {
  try {
    return JSON.parse(raw) as NotionApiError;
  } catch {
    return null;
  }
}

function resolveDatabaseId(): string {
  const configured = Deno.env.get('NOTION_DATABASE_ID') || DEFAULT_DATABASE_ID;
  return configured.replace(/-/g, '');
}

function richTextToPlain(richText: NotionRichText[]): string {
  return richText?.map((t) => t.plain_text).join('') || '';
}

function blocksToMarkdown(blocks: NotionBlock[]): string {
  return blocks.map((block) => {
    const type = block.type;
    switch (type) {
      case 'heading_1':
        return `## ${richTextToPlain(block.heading_1.rich_text)}`;
      case 'heading_2':
        return `## ${richTextToPlain(block.heading_2.rich_text)}`;
      case 'heading_3':
        return `### ${richTextToPlain(block.heading_3.rich_text)}`;
      case 'paragraph':
        return richTextToPlain(block.paragraph.rich_text);
      case 'bulleted_list_item':
        return `- ${richTextToPlain(block.bulleted_list_item.rich_text)}`;
      case 'numbered_list_item':
        return `- ${richTextToPlain(block.numbered_list_item.rich_text)}`;
      case 'quote':
        return `> ${richTextToPlain(block.quote.rich_text)}`;
      case 'divider':
        return '---';
      default:
        return '';
    }
  }).filter(Boolean).join('\n\n');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const NOTION_API_KEY = Deno.env.get('NOTION_API_KEY');
  if (!NOTION_API_KEY) {
    return new Response(JSON.stringify({ error: 'NOTION_API_KEY not configured' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const headers = {
    'Authorization': `Bearer ${NOTION_API_KEY}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json',
  };

  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get('slug');
    const withContent = url.searchParams.get('content') === 'true';
    const databaseId = resolveDatabaseId();

    // Query the database — only published posts
    const queryBody: any = {
      filter: {
        property: 'Estado',
        status: { equals: 'Publicado' },
      },
      sorts: [{ property: 'Fecha publicación', direction: 'descending' }],
    };

    const dbRes = await fetch(`${NOTION_API_URL}/databases/${databaseId}/query`, {
      method: 'POST', headers, body: JSON.stringify(queryBody),
    });

    if (!dbRes.ok) {
      const rawError = await dbRes.text();
      const notionError = parseNotionError(rawError);

      if (dbRes.status === 404 && notionError?.code === 'object_not_found') {
        console.warn('Notion database not accessible. Verify database ID and sharing with the integration.');

        if (slug && withContent) {
          return new Response(JSON.stringify({ error: 'Post not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        return new Response(JSON.stringify([]), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      throw new Error(`Notion DB query failed [${dbRes.status}]: ${rawError}`);
    }

    const dbData = await dbRes.json();

    const posts = dbData.results.map((page: any) => {
      const props = page.properties;
      const palabras = props['Palabras']?.number || 0;

      // Extract cover image: Notion supports external URL or uploaded file
      let coverImage = '';
      if (page.cover) {
        if (page.cover.type === 'external') {
          coverImage = page.cover.external?.url || '';
        } else if (page.cover.type === 'file') {
          coverImage = page.cover.file?.url || '';
        }
      }
      // Fallback: check for a "Portada" Files & media property
      if (!coverImage) {
        const portadaFiles = props['Portada']?.files;
        if (portadaFiles && portadaFiles.length > 0) {
          const f = portadaFiles[0];
          coverImage = f.type === 'external' ? f.external?.url : f.file?.url || '';
        }
      }

      return {
        id: page.id,
        slug: richTextToPlain(props['Slug']?.rich_text) || page.id,
        title: richTextToPlain(props['Título']?.title) || 'Sin título',
        excerpt: richTextToPlain(props['Meta description']?.rich_text) || '',
        category: props['Pilar']?.select?.name || 'General',
        date: props['Fecha publicación']?.date?.start || '',
        readingTime: Math.max(1, Math.round(palabras / 250)),
        coverImage,
        author: {
          name: richTextToPlain(props['Autor']?.rich_text) || 'Equipo Publify',
          role: 'Autor',
        },
        featured: props['Destacado']?.checkbox || false,
      };
    });

    // If a specific slug is requested with content, fetch blocks
    if (slug && withContent) {
      const post = posts.find((p: any) => p.slug === slug);
      if (!post) {
        return new Response(JSON.stringify({ error: 'Post not found' }), {
          status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const blocksRes = await fetch(`${NOTION_API_URL}/blocks/${post.id}/children?page_size=100`, {
        method: 'GET', headers,
      });

      if (blocksRes.ok) {
        const blocksData = await blocksRes.json();
        post.content = blocksToMarkdown(blocksData.results);
      }

      return new Response(JSON.stringify(post), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(posts), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
