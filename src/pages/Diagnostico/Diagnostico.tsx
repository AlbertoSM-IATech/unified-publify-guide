import { useEffect } from "react";
import DiagnosticoForm from "@/pages/LandingPage/components/diagnostico/DiagnosticoForm";

export default function Diagnostico() {
  useEffect(() => {
    document.title = "Diagnóstico Publify | Sistema de gestión editorial KDP";
    const meta = document.querySelector('meta[name="description"]') ?? document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.setAttribute(
      "content",
      "Diagnóstico gratuito en 2–3 minutos para publishers KDP. Descubre si necesitas un sistema y por dónde empezar."
    );
    if (!meta.parentElement) document.head.appendChild(meta);
    const robots = document.querySelector('meta[name="robots"]') ?? document.createElement("meta");
    robots.setAttribute("name", "robots");
    robots.setAttribute("content", "noindex, nofollow");
    if (!robots.parentElement) document.head.appendChild(robots);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
            Diagnóstico Publify
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Cuéntame tu situación. Te respondo personalmente con un diagnóstico claro.
          </p>
        </div>
        <div className="bg-card border border-border rounded-2xl shadow-lg max-w-3xl mx-auto">
          <DiagnosticoForm />
        </div>
      </div>
    </main>
  );
}
