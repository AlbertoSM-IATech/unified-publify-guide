import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Mail, Loader2, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/pages/LandingPage/components/Header";
import { Footer } from "@/pages/LandingPage/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const gradients = [
  "from-primary/80 to-accent/60",
  "from-accent/70 to-primary/50",
  "from-primary/60 to-accent/80",
  "from-accent/60 to-primary/70",
  "from-primary/70 to-accent/50",
  "from-accent/80 to-primary/60",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const POSTS_PER_PAGE = 6;

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useBlogPosts();

  const notionConnected = data?.notionConnected ?? false;
  const blogPosts = data?.posts ?? [];

  const featured = blogPosts.find((p) => p.featured);
  const filtered = blogPosts
    .filter((p) => !p.featured)
    .filter((p) => activeCategory === "Todos" || p.category === activeCategory);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const paginatedPosts = useMemo(
    () => filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE),
    [filtered, currentPage]
  );

  // Reset page when category changes
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  // Build dynamic categories from posts
  const dynamicCategories = ["Todos", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 hover:bg-accent/15">
              Blog de Publify
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-[Poppins]">
              Blog
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Estrategias, guías y recursos para autores independientes que quieren dominar Amazon KDP y vivir de sus libros.
            </p>
          </motion.div>
        </div>
      </section>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      )}

      {!isLoading && !notionConnected && (
        <div className="mx-auto max-w-7xl px-4 pb-6">
          <div className="flex items-center gap-3 rounded-lg border border-accent/30 bg-accent/10 p-4 text-sm text-muted-foreground">
            <AlertTriangle className="h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="font-medium text-foreground">Notion no está conectado</p>
              <p>
                Verifica que la base de datos esté compartida con tu integración y que el ID sea correcto. Hasta entonces, no se mostrarán artículos.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Featured post */}
      {featured && (
        <section className="mx-auto max-w-7xl px-4 pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <Link to={`/blog/${featured.slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl transition-shadow duration-300">
                {featured.coverImage ? (
                  <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
                    <img src={featured.coverImage} alt={featured.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                ) : (
                  <div className={`aspect-[16/10] md:aspect-auto bg-gradient-to-br ${gradients[0]} flex items-center justify-center`}>
                    <span className="text-6xl md:text-8xl opacity-30 select-none">📖</span>
                  </div>
                )}
                <div className="p-6 md:p-10 flex flex-col justify-center">
                  <Badge className="w-fit mb-3 bg-accent/10 text-accent border-accent/20">{featured.category}</Badge>
                  <h2 className="text-2xl md:text-3xl font-bold font-[Poppins] group-hover:text-accent transition-colors">
                    {featured.number ? <span className="text-accent/60 mr-2">#{featured.number}</span> : null}{featured.title}
                  </h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{featured.excerpt}</p>
                  <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{featured.author.name}</span>
                    <span>·</span>
                    <span>{featured.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {featured.readingTime} min</span>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
                    Leer artículo <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </section>
      )}

      {/* Category filter */}
      <section className="mx-auto max-w-7xl px-4 pb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {dynamicCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Posts grid */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {paginatedPosts.map((post, i) => (
            <motion.div key={post.slug} variants={cardVariants}>
              <Link to={`/blog/${post.slug}`} className="group block h-full">
                <article className="flex h-full flex-col rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {post.coverImage ? (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    </div>
                  ) : (
                    <div className={`aspect-[16/9] bg-gradient-to-br ${gradients[(i + 1) % gradients.length]} flex items-center justify-center`}>
                      <span className="text-4xl opacity-20 select-none">✍️</span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <Badge className="w-fit mb-2 bg-accent/10 text-accent border-accent/20 text-xs">{post.category}</Badge>
                    <h3 className="font-bold font-[Poppins] text-lg leading-snug group-hover:text-accent transition-colors">
                      {post.number ? <span className="text-accent/60 mr-1.5">#{post.number}</span> : null}{post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{post.author.name}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {post.readingTime} min</span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Página anterior"
            >
              <ChevronLeft size={20} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`min-w-[36px] rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Página siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <motion.div
          className="rounded-2xl bg-accent/10 border border-accent/20 p-8 md:p-12 text-center"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Mail className="mx-auto mb-4 text-accent" size={36} />
          <h3 className="text-2xl md:text-3xl font-bold font-[Poppins]">
            No te pierdas ningún artículo
          </h3>
          <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
            Recibe cada semana las mejores estrategias de self-publishing directamente en tu bandeja de entrada.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              Suscribirme
            </Button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
