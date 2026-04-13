

## Plan: Reestructurar secciones de la Landing Page

### Resumen
Añadir tres nuevas secciones y modificar dos existentes para reforzar el mensaje de validación, el dolor de la fragmentación y la propuesta de valor de Publify. No se borra ninguna sección existente.

### Cambios

**1. Nueva sección: "Pilares de Publify" (4 cuadros)**
- Archivo: `src/pages/LandingPage/components/PillarCardsSection.tsx`
- Grid 2x2 responsive (1 col mobile, 2 col desktop) con 4 tarjetas:
  - Gestión centralizada de activos digitales
  - Workspace por libro
  - Control de producción
  - Visión financiera
- Cada tarjeta con icono, título en negrita y descripción. Estilo consistente con las tarjetas existentes (border, bg-card, hover). Sin emojis.
- Se inserta en `LandingPage.tsx` justo después de `WhatIsPublifySection`.

**2. Modificar ControlSection — Añadir "Segmentación"**
- Archivo: `src/pages/LandingPage/components/ControlSection.tsx`
- Añadir un nuevo item al array `controls`:
  - icon: `Users` (lucide), title: "Segmentación", desc: "Define y documenta a quién va dirigido cada libro, su avatar de lector y su propuesta de valor única. Todo dentro de la ficha del libro."

**3. Nueva sección: "¿Por qué Publify?" (6 bloques)**
- Archivo: `src/pages/LandingPage/components/WhyPublifySection.tsx`
- 6 bloques independientes en grid (1 col mobile, 2 col md, 3 col lg)
- Cada bloque: icono (lucide, sin emojis), título corto en negrita, subtítulo de una línea, párrafo descriptivo
- Los 6 puntos del briefing (Fin a la dispersión, Visibilidad financiera, Menos retrabajo, Adiós fatiga de decisión, Escala sin caos, Opera como CEO editorial)
- Se inserta después de `TargetAudienceSection`.

**4. Modificar EarlyAdoptersSection — Mensaje de validación**
- Archivo: `src/pages/LandingPage/components/EarlyAdoptersSection.tsx`
- Añadir un párrafo debajo del subtítulo existente que explique la fase de validación: "Publify está en fase de validación. Necesitamos a los primeros publishers que quieran dar forma al sistema desde dentro. A cambio, ofrecemos condiciones que no se repetirán."
- Añadir un segundo párrafo reforzando el dolor: "Tu stack actual está fragmentado: archivos en Drive, datos en Excel, tareas en Notion, finanzas a ojo. Publify nace para unificarlo todo en un solo sistema."

**5. Integrar en LandingPage.tsx**
- Importar `PillarCardsSection` y `WhyPublifySection`
- Orden final de secciones (sin borrar ninguna):
  ```
  Header → Hero → TaglineSection → ControlSection → ComparisonSection
  → WhatIsPublifySection → PillarCardsSection (NUEVA)
  → NewHowItWorksSection → TargetAudienceSection
  → WhyPublifySection (NUEVA) → EarlyAdoptersSection (MODIFICADA)
  → PreventaSection → FaqSection → FinalCtaSection → Footer → StickyMobileCTA
  ```

### Diseño
- Mismo patrón visual que las secciones existentes: alternancia `bg-background` / `bg-muted dark:bg-secondary/40`, gradientes sutiles, bordes `border-border/50`, animaciones `motion` con `whileInView`.
- Sin emojis. Tipografía `font-heading` para títulos. Tarjetas con `bg-card border border-border rounded-xl`.
- Los 6 bloques de "¿Por qué Publify?" usan iconos de lucide-react apropiados al concepto de cada bloque.

