export type QuestionType =
  | "text"
  | "email"
  | "single"
  | "multi"
  | "longtext";

export type Option = { value: string; label: string };

export type Question = {
  id: string;
  type: QuestionType;
  title: string;
  subtitle?: string;
  microcopy?: string;
  placeholder?: string;
  options?: Option[];
  maxSelect?: number;
  required?: boolean;
  optional?: boolean;
  // condición de visibilidad basada en respuestas previas
  showIf?: (answers: Record<string, any>) => boolean;
};

export const questions: Question[] = [
  // A) Contacto
  {
    id: "name",
    type: "text",
    title: "¿Cuál es tu nombre?",
    placeholder: "Tu nombre",
    required: true,
  },
  {
    id: "email",
    type: "email",
    title: "¿A qué email te respondemos?",
    placeholder: "tu@email.com",
    required: true,
  },

  // B) Perfil editorial
  {
    id: "books_range",
    type: "single",
    title: "¿Cuántos libros publicados tienes actualmente?",
    required: true,
    options: [
      { value: "0", label: "0" },
      { value: "1-9", label: "1–9" },
      { value: "10-30", label: "10–30" },
      { value: "31-100", label: "31–100" },
      { value: "100+", label: "100+" },
    ],
  },
  {
    id: "team_range",
    type: "single",
    title: "¿Publicas solo o con equipo?",
    required: true,
    options: [
      { value: "solo", label: "Solo" },
      { value: "2-3", label: "2–3 personas" },
      { value: "4-10", label: "4–10 personas" },
      { value: "10+", label: "10+ personas" },
    ],
  },
  {
    id: "situation_description",
    type: "single",
    title: "¿Qué describe mejor tu situación actual?",
    required: true,
    options: [
      { value: "catalogo_estable", label: "Tengo catálogo estable y quiero orden/ROI para escalar" },
      { value: "construyendo_procesos", label: "Estoy construyendo procesos y quiero un sistema antes de crecer" },
      { value: "caos", label: "Estoy en caos operativo (info dispersa, retrabajo, errores)" },
      { value: "explorando", label: "Solo estoy explorando opciones" },
    ],
  },

  // C) Dolor
  {
    id: "pain_points",
    type: "multi",
    title: "¿Qué te está costando más ahora mismo?",
    subtitle: "Elige hasta 2",
    maxSelect: 2,
    required: true,
    options: [
      { value: "centralizar", label: "Centralizar info (Drive/Sheets/Notas)" },
      { value: "roi", label: "Control de rentabilidad/ROI por libro" },
      { value: "retrabajo", label: "Retrabajo y errores operativos" },
      { value: "priorizar", label: "No saber qué priorizar / fatiga de decisión" },
      { value: "sops", label: "Estandarizar procesos (SOPs / equipo)" },
      { value: "escalar", label: "Escalar catálogo sin perder control" },
      { value: "otro", label: "Otro" },
    ],
  },
  {
    id: "pain_text",
    type: "longtext",
    title: "Descríbeme tu fricción principal en 1–2 frases",
    placeholder: "Lo que más te está bloqueando ahora mismo…",
    required: true,
  },

  // D) Autodiagnóstico
  {
    id: "needs_system",
    type: "single",
    title: "¿Sientes que tu editorial KDP necesita un sistema de gestión?",
    microcopy:
      "Cuando la info vive en varias herramientas, suele haber más retrabajo, menos visión clara y más fatiga de decisión. Queremos entender tu situación real.",
    required: true,
    options: [
      { value: "si_ya", label: "Sí, lo necesito ya (estoy perdiendo demasiado tiempo/claridad)" },
      { value: "creo_si", label: "Creo que sí, pero no sé por dónde empezar" },
      { value: "confirmar", label: "Puede que sí, pero quiero confirmarlo" },
      { value: "no", label: "No lo creo (de momento estoy bien con mi sistema actual)" },
    ],
  },
  {
    id: "impact_without_system",
    type: "multi",
    title: "¿Qué impacto te está generando hoy la falta de un sistema?",
    subtitle: "Elige hasta 2 (opcional)",
    optional: true,
    maxSelect: 2,
    options: [
      { value: "tiempo", label: "Pierdo tiempo buscando info entre herramientas" },
      { value: "retrabajo_errores", label: "Repito tareas / retrabajo / errores" },
      { value: "vision_roi", label: "No tengo visión clara de rentabilidad/ROI por libro" },
      { value: "priorizar", label: "Me cuesta priorizar (fatiga de decisión)" },
      { value: "delegar", label: "Me cuesta delegar / estandarizar procesos (SOPs)" },
      { value: "escalar", label: "No puedo escalar el catálogo con control" },
    ],
  },

  // E) Intención
  {
    id: "timing",
    type: "single",
    title: "¿Cuándo te gustaría implementar un sistema de gestión editorial?",
    required: true,
    options: [
      { value: "ya", label: "Ya / esta semana" },
      { value: "2-4_sem", label: "2–4 semanas" },
      { value: "1-3_meses", label: "1–3 meses" },
      { value: "explorando", label: "Solo explorando" },
    ],
  },
  {
    id: "next_step_preference",
    type: "single",
    title: "¿Qué prefieres ahora?",
    required: true,
    options: [
      { value: "reunion", label: "Quiero una reunión para ver si encaja" },
      { value: "diagnostico_email", label: "Prefiero que me respondas por email con un diagnóstico" },
      { value: "solo_entender", label: "Solo quiero entender si esto aplica a mi caso" },
    ],
  },

  // F) Branching — reunión
  {
    id: "configure_first",
    type: "single",
    title: "¿Qué te gustaría ordenar/configurar primero?",
    required: true,
    showIf: (a) => a.next_step_preference === "reunion",
    options: [
      { value: "un_libro", label: "Un libro concreto" },
      { value: "una_serie", label: "Una serie" },
      { value: "estructura_completa", label: "La estructura completa (catálogo + finanzas + procesos)" },
    ],
  },
  {
    id: "preferred_schedule",
    type: "single",
    title: "¿Qué horario te viene mejor?",
    required: true,
    showIf: (a) => a.next_step_preference === "reunion",
    options: [
      { value: "mananas", label: "Mañanas (Europe/Madrid)" },
      { value: "tardes", label: "Tardes (Europe/Madrid)" },
      { value: "indiferente", label: "Indiferente" },
    ],
  },

  // F) Branching — diagnóstico email
  {
    id: "objections_text",
    type: "longtext",
    title: "¿Qué te frena para probar/contratar algo así ahora mismo?",
    placeholder: "Cuéntamelo en pocas frases…",
    required: true,
    showIf: (a) => a.next_step_preference === "diagnostico_email",
  },

  // F) Branching — solo entender
  {
    id: "main_question_text",
    type: "longtext",
    title: "¿Cuál es tu duda principal en una frase?",
    placeholder: "Tu duda…",
    required: true,
    showIf: (a) => a.next_step_preference === "solo_entender",
  },
];
