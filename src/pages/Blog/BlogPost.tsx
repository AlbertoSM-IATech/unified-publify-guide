import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Loader2 } from "lucide-react";
import React from "react";
import { Header } from "@/pages/LandingPage/components/Header";
import { Footer } from "@/pages/LandingPage/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBlogPost, useBlogPosts } from "@/hooks/useBlogPosts";

function parseInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|~~(.+?)~~|<u>(.+?)<\/u>/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1] && match[2]) {
      nodes.push(<a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{match[1]}</a>);
    } else if (match[3]) {
      nodes.push(<strong key={match.index}>{match[3]}</strong>);
    } else if (match[4]) {
      nodes.push(<em key={match.index}>{match[4]}</em>);
    } else if (match[5]) {
      nodes.push(<code key={match.index} className="rounded bg-muted px-1.5 py-0.5 text-sm">{match[5]}</code>);
    } else if (match[6]) {
      nodes.push(<s key={match.index}>{match[6]}</s>);
    } else if (match[7]) {
      nodes.push(<u key={match.index}>{match[7]}</u>);
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderMarkdown(md: string): React.ReactNode[] {
  const lines = md.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let keyIdx = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      elements.push(<h3 key={keyIdx++} className="text-xl md:text-2xl font-bold font-[Poppins] mt-8 mb-3">{parseInline(trimmed.slice(4))}</h3>);
      i++;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      elements.push(<h2 key={keyIdx++} className="text-2xl md:text-3xl font-bold font-[Poppins] mt-10 mb-4">{parseInline(trimmed.slice(3))}</h2>);
      i++;
      continue;
    }
    if (trimmed.startsWith("# ")) {
      elements.push(<h1 key={keyIdx++} className="text-3xl md:text-4xl font-bold font-[Poppins] mt-12 mb-5">{parseInline(trimmed.slice(2))}</h1>);
      i++;
      continue;
    }

    if (trimmed.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <blockquote key={keyIdx++} className="border-l-4 border-accent pl-4 my-4 italic text-muted-foreground">
          {quoteLines.map((q, qi) => <p key={qi}>{parseInline(q)}</p>)}
        </blockquote>,
      );
      continue;
    }

    if (trimmed.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      elements.push(<pre key={keyIdx++} className="rounded-lg bg-muted p-4 overflow-x-auto text-sm my-4"><code>{codeLines.join("\n")}</code></pre>);
      continue;
    }

    if (trimmed === "---") {
      elements.push(<hr key={keyIdx++} className="my-8 border-border" />);
      i++;
      continue;
    }

    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      elements.push(<img key={keyIdx++} src={imgMatch[2]} alt={imgMatch[1]} className="rounded-lg my-4 max-w-full" loading="lazy" />);
      i++;
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(<li key={keyIdx++}>{parseInline(lines[i].trim().replace(/^\d+\.\s/, ""))}</li>);
        i++;
      }
      elements.push(<ol key={keyIdx++} className="list-decimal pl-6 my-4 space-y-1 text-muted-foreground">{items}</ol>);
      continue;
    }

    if (trimmed.startsWith("- ")) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        const itemText = lines[i].trim().slice(2);
        const todoMatch = itemText.match(/^\[([x ])\]\s*(.*)/);
        if (todoMatch) {
          items.push(<li key={keyIdx++} className="flex items-start gap-2 list-none"><input type="checkbox" checked={todoMatch[1] === "x"} readOnly className="mt-1" /><span>{parseInline(todoMatch[2])}</span></li>);
        } else {
          items.push(<li key={keyIdx++}>{parseInline(itemText)}</li>);
        }
        i++;
      }
      elements.push(<ul key={keyIdx++} className="list-disc pl-6 my-4 space-y-1 text-muted-foreground">{items}</ul>);
      continue;
    }

    // Markdown table
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const tableRows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
        const row = lines[i].trim();
        // Skip separator row (| --- | --- |)
        if (/^\|[\s\-:|]+\|$/.test(row)) { i++; continue; }
        const cells = row.slice(1, -1).split("|").map(c => c.trim());
        tableRows.push(cells);
        i++;
      }
      if (tableRows.length > 0) {
        const headerRow = tableRows[0];
        const bodyRows = tableRows.slice(1);
        elements.push(
          <div key={keyIdx++} className="my-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-accent/30">
                  {headerRow.map((cell, ci) => (
                    <th key={ci} className="px-4 py-2.5 text-left font-semibold text-foreground bg-accent/5">{parseInline(cell)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr key={ri} className="border-b border-border hover:bg-muted/50 transition-colors">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-2 text-muted-foreground">{parseInline(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    elements.push(<p key={keyIdx++} className="my-4 leading-relaxed text-muted-foreground">{parseInline(trimmed)}</p>);
    i++;
  }

  return elements;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: notionPost, isLoading: isLoadingPost } = useBlogPost(slug || "");
  const { data: allPostsData } = useBlogPosts();

  const post = notionPost;
  const blogPosts = allPostsData?.posts ?? [];

  if (isLoadingPost) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="flex items-center justify-center py-40">
          <Loader2 className="h-10 w-10 animate-spin text-accent" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="flex flex-col items-center justify-center py-40">
          <h1 className="text-3xl font-bold">Artículo no encontrado</h1>
          <Link to="/blog" className="mt-4 text-accent hover:underline">Volver al blog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const content = post.content?.trim() ?? "";
  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {post.coverImage && (
        <div className="relative w-full h-[280px] md:h-[420px] mt-16 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
      )}

      <article className={`mx-auto max-w-3xl px-4 pb-16 ${post.coverImage ? "pt-8 -mt-20 relative z-10" : "pt-28 md:pt-36"}`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors mb-8">
            <ArrowLeft size={16} /> Volver al blog
          </Link>

          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">{post.category}</Badge>
          <h1 className="text-3xl md:text-5xl font-bold font-[Poppins] leading-tight">
            {post.number ? <span className="text-accent/60 mr-2">#{post.number}</span> : null}{post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b border-border pb-6">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                {post.author.name[0]}
              </div>
              <div>
                <p className="font-medium text-foreground">{post.author.name}</p>
                <p className="text-xs">{post.author.role}</p>
              </div>
            </div>
            <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {post.readingTime} min de lectura</span>
          </div>
        </motion.div>

        <motion.div
          className="prose prose-lg dark:prose-invert max-w-none mt-10
            prose-headings:font-[Poppins] prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-li:text-muted-foreground
            prose-strong:text-foreground
            prose-blockquote:border-l-accent prose-blockquote:text-muted-foreground prose-blockquote:italic
            prose-a:text-accent hover:prose-a:underline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {content ? (
            renderMarkdown(content)
          ) : (
            <p className="my-4 leading-relaxed text-muted-foreground">Este artículo todavía no tiene contenido sincronizado desde Notion.</p>
          )}
        </motion.div>

        <motion.div
          className="mt-16 rounded-2xl bg-accent/10 border border-accent/20 p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold font-[Poppins]">¿Listo para publicar tu próximo libro?</h3>
          <p className="mt-2 text-sm text-muted-foreground">Publify te da todas las herramientas para gestionar tu editorial desde un solo lugar.</p>
          <Link to="/#waitlist">
            <Button className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              Registrarme ahora
            </Button>
          </Link>
        </motion.div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20">
          <h3 className="text-2xl font-bold font-[Poppins] mb-6">Artículos relacionados</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} to={`/blog/${r.slug}`} className="group block">
                <article className="rounded-xl border border-border bg-card p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <Badge className="mb-2 bg-accent/10 text-accent border-accent/20 text-xs">{r.category}</Badge>
                  <h4 className="font-bold font-[Poppins] group-hover:text-accent transition-colors">{r.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{r.excerpt}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{r.author.name}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {r.readingTime} min</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
