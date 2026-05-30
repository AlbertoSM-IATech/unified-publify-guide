import DiagnosticoForm from "./DiagnosticoForm";

export default function DiagnosticoSection() {
  return (
    <section id="diagnostico" className="py-20 md:py-28 bg-muted/20 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Diagnóstico gratuito para tu editorial KDP
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            En 2–3 minutos te ayudo a entender si te falta un sistema y qué deberías ordenar primero.
          </p>
        </div>
        <div className="bg-card border border-border rounded-2xl shadow-lg">
          <DiagnosticoForm />
        </div>
      </div>
    </section>
  );
}
