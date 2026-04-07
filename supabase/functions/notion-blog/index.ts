import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const NOTION_API_URL = "https://api.notion.com/v1";
const DEFAULT_DATABASE_ID = "bd8d89104b68447d8d99d1abd63f83bf";

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
  const configured = Deno.env.get("NOTION_DATABASE_ID") || DEFAULT_DATABASE_ID;
  return configured.replace(/-/g, "");
}

function richTextToPlain(richText: NotionRichText[] = []): string {
  return richText.map((t) => t.plain_text).join("");
}

function resolveAuthorName(props: any): string {
  const author = props["Autor"];
  if (!author) return "Equipo Publify";

  const richTextName = richTextToPlain(author.rich_text);
  if (richTextName) return richTextName;

  const titleName = richTextToPlain(author.title);
  if (titleName) return titleName;

  const peopleNames = (author.people ?? []).map((p: any) => p?.name).filter(Boolean);
  if (peopleNames.length > 0) return peopleNames.join(", ");

  if (author.select?.name) return author.select.name;
  return "Equipo Publify";
}

function resolveSlug(props: any, pageId: string): string {
  return richTextToPlain(props["Slug"]?.rich_text) || richTextToPlain(props["Slug"]?.title) || pageId;
}

function resolveCoverImage(page: any, props: any): string {
  if (page.cover?.type === "external") return page.cover.external?.url || "";
  if (page.cover?.type === "file") return page.cover.file?.url || "";

  const portadaFiles = props["Portada"]?.files;
  if (Array.isArray(portadaFiles) && portadaFiles.length > 0) {
    const file = portadaFiles[0];
    return file.type === "external" ? file.external?.url || "" : file.file?.url || "";
  }

  return "";
}

function richTextToMarkdown(richText: any[]): string {
  if (!richText) return "";
  return richText
    .map((t) => {
      let text = t.plain_text || "";
      if (!text) return "";

      const a = t.annotations || {};
      if (a.code) text = `\`${text}\``;
      if (a.bold) text = `**${text}**`;
      if (a.italic) text = `*${text}*`;
      if (a.strikethrough) text = `~~${text}~~`;
      if (a.underline) text = `<u>${text}</u>`;

      if (t.href) text = `[${text}](${t.href})`;

      return text;
    })
    .join("");
}

function tableToMarkdown(tableBlock: NotionBlock): string {
  const rows: any[] = tableBlock._children || [];
  if (rows.length === 0) return "";

  const lines: string[] = [];
  for (let r = 0; r < rows.length; r++) {
    const cells: any[][] = rows[r].table_row?.cells || [];
    const cellTexts = cells.map((cell) => richTextToMarkdown(cell).replace(/\|/g, "\\|"));
    lines.push(`| ${cellTexts.join(" | ")} |`);
    if (r === 0) {
      lines.push(`| ${cellTexts.map(() => "---").join(" | ")} |`);
    }
  }
  return lines.join("\n");
}

function blocksToMarkdown(blocks: NotionBlock[]): string {
  const parts: { text: string; type: string }[] = [];
  let numberedIndex = 0;

  for (const block of blocks) {
    const type = block.type;

    if (type !== "numbered_list_item") numberedIndex = 0;

    let text = "";
    switch (type) {
      case "heading_1":
        text = `# ${richTextToMarkdown(block.heading_1.rich_text)}`;
        break;
      case "heading_2":
        text = `## ${richTextToMarkdown(block.heading_2.rich_text)}`;
        break;
      case "heading_3":
        text = `### ${richTextToMarkdown(block.heading_3.rich_text)}`;
        break;
      case "paragraph":
        text = richTextToMarkdown(block.paragraph.rich_text) || "";
        break;
      case "bulleted_list_item":
        text = `- ${richTextToMarkdown(block.bulleted_list_item.rich_text)}`;
        break;
      case "numbered_list_item":
        numberedIndex++;
        text = `${numberedIndex}. ${richTextToMarkdown(block.numbered_list_item.rich_text)}`;
        break;
      case "quote":
        text = `> ${richTextToMarkdown(block.quote.rich_text)}`;
        break;
      case "callout":
        text = `> 💡 ${richTextToMarkdown(block.callout.rich_text)}`;
        break;
      case "code":
        text = `\`\`\`${block.code.language || ""}\n${richTextToPlain(block.code.rich_text)}\n\`\`\``;
        break;
      case "image": {
        const imageUrl = block.image.type === "external" ? block.image.external?.url : block.image.file?.url;
        const caption = richTextToPlain(block.image.caption);
        if (imageUrl) text = `![${caption || "imagen"}](${imageUrl})`;
        break;
      }
      case "divider":
        text = "---";
        break;
      case "toggle":
        text = `**${richTextToMarkdown(block.toggle.rich_text)}**`;
        break;
      case "to_do": {
        const checked = block.to_do.checked ? "x" : " ";
        text = `- [${checked}] ${richTextToMarkdown(block.to_do.rich_text)}`;
        break;
      }
      default:
        continue;
    }

    parts.push({ text, type });
  }

  const listTypes = new Set(["bulleted_list_item", "numbered_list_item", "to_do"]);
  const result: string[] = [];
  for (let i = 0; i < parts.length; i++) {
    result.push(parts[i].text);
    if (i < parts.length - 1) {
      const currentIsList = listTypes.has(parts[i].type);
      const nextIsList = listTypes.has(parts[i + 1].type);
      result.push(currentIsList && nextIsList ? "\n" : "\n\n");
    }
  }

  return result.join("");
}

async function queryDatabasePages(
  headers: Record<string, string>,
  databaseId: string,
  queryBody: Record<string, unknown>,
  singlePage = false,
): Promise<any[]> {
  const pages: any[] = [];
  let nextCursor: string | undefined;
  let hasMore = true;

  while (hasMore) {
    const body = nextCursor ? { ...queryBody, start_cursor: nextCursor } : queryBody;

    const response = await fetch(`${NOTION_API_URL}/databases/${databaseId}/query`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const rawError = await response.text();
      const notionError = parseNotionError(rawError);
      const error = new Error(`Notion DB query failed [${response.status}]: ${rawError}`) as Error & {
        status?: number;
        code?: string;
      };
      error.status = response.status;
      error.code = notionError?.code;
      throw error;
    }

    const data = await response.json();
    pages.push(...(data.results ?? []));

    if (singlePage) break;

    hasMore = Boolean(data.has_more);
    nextCursor = data.next_cursor ?? undefined;
  }

  return pages;
}

async function fetchAllPostBlocks(headers: Record<string, string>, pageId: string): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = [];
  let nextCursor: string | undefined;
  let hasMore = true;

  while (hasMore) {
    const cursorParam = nextCursor ? `&start_cursor=${encodeURIComponent(nextCursor)}` : "";
    const response = await fetch(`${NOTION_API_URL}/blocks/${pageId}/children?page_size=100${cursorParam}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      console.warn(`Notion blocks query failed [${response.status}] for page ${pageId}`);
      return blocks;
    }

    const data = await response.json();
    blocks.push(...(data.results ?? []));
    hasMore = Boolean(data.has_more);
    nextCursor = data.next_cursor ?? undefined;
  }

  return blocks;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const NOTION_API_KEY = Deno.env.get("NOTION_API_KEY");
  if (!NOTION_API_KEY) {
    return new Response(JSON.stringify({ error: "NOTION_API_KEY not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const headers = {
    Authorization: `Bearer ${NOTION_API_KEY}`,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
  };

  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug")?.trim() || "";
    const withContent = url.searchParams.get("content") === "true";
    const databaseId = resolveDatabaseId();
    const isDetailRequest = Boolean(slug && withContent);

    const queryBody: Record<string, unknown> = isDetailRequest
      ? {
          filter: {
            and: [
              { property: "Estado", status: { equals: "Publicado" } },
              { property: "Slug", rich_text: { equals: slug } },
            ],
          },
          page_size: 1,
        }
      : {
          filter: {
            property: "Estado",
            status: { equals: "Publicado" },
          },
          sorts: [{ property: "Fecha publicación", direction: "descending" }],
          page_size: 100,
        };

    let pages: any[] = [];

    try {
      pages = await queryDatabasePages(headers, databaseId, queryBody, isDetailRequest);
    } catch (error: unknown) {
      const status = typeof error === "object" && error !== null ? (error as any).status : undefined;
      const code = typeof error === "object" && error !== null ? (error as any).code : undefined;

      if (status === 404 && code === "object_not_found") {
        if (isDetailRequest) {
          return new Response(JSON.stringify({ error: "Post not found" }), {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify([]), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      throw error;
    }

    const posts = pages.map((page: any) => {
      const props = page.properties;
      const palabras = props["Palabras"]?.number || 0;

      return {
        id: page.id,
        number: props["Nº"]?.number ?? 0,
        slug: resolveSlug(props, page.id),
        title: richTextToPlain(props["Título"]?.title) || "Sin título",
        excerpt: richTextToPlain(props["Meta description"]?.rich_text) || "",
        category: props["Pilar"]?.select?.name || "General",
        date: props["Fecha publicación"]?.date?.start || "",
        readingTime: Math.max(1, Math.round(palabras / 250)),
        coverImage: resolveCoverImage(page, props),
        author: {
          name: resolveAuthorName(props),
          role: "Autor",
        },
        featured: props["Destacado"]?.checkbox || false,
      };
    });

    if (isDetailRequest) {
      const post = posts[0];
      if (!post) {
        return new Response(JSON.stringify({ error: "Post not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const blocks = await fetchAllPostBlocks(headers, post.id);
      post.content = blocksToMarkdown(blocks).trim();

      return new Response(JSON.stringify(post), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    posts.sort((a: any, b: any) => (b.number ?? 0) - (a.number ?? 0));

    return new Response(JSON.stringify(posts), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
