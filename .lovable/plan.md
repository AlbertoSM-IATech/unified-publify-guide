

# Plan de Optimización CRO — Landing Publify

## Estructura actual vs propuesta

```text
ACTUAL                          PROPUESTA
─────────────────────────────   ─────────────────────────────
Header                          Header
Hero                            Hero (copy optimizado)
TaglineSection                  TaglineSection (copy optimizado)
ProblemSolutionSection          ControlSection (NUEVA - "Qué controla Publify")
WhatIsPublifySection            ComparisonSection (NUEVA - "Sin sistema vs Con Publify")  
NewHowItWorksSection            WhatIsPublifySection (copy reforzado negocio)
TargetAudienceSection           NewHowItWorksSection (copy optimizado)
EarlyAdoptersSection            TargetAudienceSection (sin cambios)
PreventaSection                 EarlyAdoptersSection (sin cambios)
FaqSection                      PreventaSection (MVP reposicionado)
FinalCtaSection                 FaqSection (respuestas actualizadas)
Footer                          FinalCtaSection (copy optimizado)
                                Footer
```

## Cambios por sección

### 1. Hero — Copy optimizado
Mantener estructura visual, imagen dashboard, countdown y CTA. Cambiar:

- **H1**: "Deja de improvisar tu editorial." / "Opérala con sistema."
- **Subtítulo**: "Publify centraliza tu catálogo de libros, producción editorial y rentabilidad en un solo sistema. Para publishers de Amazon KDP que quieren tomar decisiones con datos, no con intuición."
- **Badges**: Cambiar "Información Centralizada" → "Catálogo centralizado", "Decisiones con datos reales" → "Rentabilidad por libro", "Visión clara de tu negocio" → "Control de producción", "Escalar sin caos" → "Decisiones con datos", "Recuperar horas cada semana" → "Todo en un sistema"

### 2. TaglineSection — Refuerzo de claridad
- **Subtítulo**: "Gestiona tu catálogo, controla la producción, analiza la rentabilidad de cada libro y toma decisiones con datos reales. Sin saltar entre Excel, Drive, Notion y KDP Reports."

### 3. NUEVA: ControlSection — "Qué controla Publify en tu editorial"
Crear `src/pages/LandingPage/components/ControlSection.tsx`. Grid visual con iconos mostrando las áreas que Publify cubre. Dos columnas en desktop, una en móvil. Cada item con icono, título y descripción corta:

1. **Catálogo completo** — Todos tus libros organizados por series y marketplaces
2. **Calendario editorial** — Planifica lanzamientos y producción
3. **Scoring de nichos y KW** — Evalúa viabilidad antes de producir
4. **Costes y viabilidad por libro** — Sabe si un libro es rentable antes de crearlo
5. **Espacio para pensar y planificar** — Notas, ideas, investigación en contexto
6. **Espacio para producir y guardar** — Assets, manuscritos, portadas centralizados
7. **Pipeline de producción** — Gestiona tareas, datos, audiencia, finanzas y assets
8. **Control de formatos** — Físico, ebook, cada formato con sus datos
9. **Rendimiento de KW y Ads** — Campañas, inversión y retorno por libro
10. **QRs personalizados** — Crea códigos QR para tus libros
11. **Rentabilidad real** — Ingresos y gastos a nivel micro (libro) y macro (negocio)

Sección con fondo sutil diferente, animaciones `whileInView` coherentes con el resto.

### 4. NUEVA: ComparisonSection — "Sin sistema vs Con Publify"
Crear `src/pages/LandingPage/components/ComparisonSection.tsx`. Layout dos columnas:

**Sin sistema (lado izquierdo, estilo "problema")**:
- Excel para cálculos de ingresos, gastos, rentabilidad y campañas
- WhatsApp/Notes/Notion/Trello para notas y tareas de producción
- Seguimiento manual del catálogo en Drive o carpetas
- Google Calendar para plazos y lanzamientos
- KDP Reports para ver ventas (sin contexto de costes)
- Amazon Ads sin visión de rentabilidad real

**Con Publify (lado derecho, estilo "solución")**:
- Todo el negocio editorial en un solo sistema
- Cada libro es una unidad operativa completa
- Datos financieros con contexto: costes, ingresos, ROI real
- Producción trazable de principio a fin
- Decisiones basadas en datos, no en intuición

### 5. WhatIsPublifySection — Reforzar narrativa de negocio
Cambiar pilares de "organización" a "negocio":
- Pilar 1: "Fuente de verdad por libro" → desc: "Costes, ingresos, assets, producción y rendimiento. Todo vinculado al libro como unidad de negocio."
- Pilar 2: "Control operativo" → desc: "Sabe qué toca hacer, qué está bloqueado y qué decisiones necesitan datos. Sin depender de memoria."
- Pilar 3: "Visión del negocio" → desc: "Rentabilidad por libro y global. De lo micro a lo macro. Las decisiones que escalan tu editorial."

Cambiar "SÍ es" items a lenguaje de rentabilidad y decisiones.

### 6. PreventaSection — MVP reposicionado
Cambiar copy del MVP box:
- **Título**: "La base del sistema operativo editorial"
- **Descripción**: "El MVP incluye Biblioteca editorial completa y control financiero por libro. Es el cimiento sobre el que se construyen todas las funcionalidades avanzadas. No es una demo: es la primera pieza funcional de tu sistema."

### 7. FaqSection — Actualizar respuestas
- Actualizar "¿Publify sustituye mis herramientas?" con respuesta clara: "Publify sustituye el Excel donde calculas rentabilidad, las notas dispersas en WhatsApp y Notion, el seguimiento manual de tu catálogo y la falta de visión financiera por libro. No sustituye Amazon Ads ni KDP, sino que te da el contexto que esas herramientas no tienen."
- Actualizar "¿Qué funcionalidades tiene ahora mismo?" con framing de "base del sistema operativo".

### 8. FinalCtaSection — Copy orientado a negocio
- **H2**: "Tu editorial merece un sistema. No más parches."
- Copy intermedio centrado en rentabilidad y decisiones, no solo organización.

## Secciones sin cambios
- Header, Footer, StickyMobileCTA, CountdownTimer, EarlyAdoptersSection, TargetAudienceSection

## Orden en LandingPage.tsx
Insertar `ControlSection` después de `TaglineSection` y `ComparisonSection` después de `ControlSection`. Eliminar `ProblemSolutionSection` (su contenido queda absorbido por ComparisonSection). El flujo narrativo queda:

Hero → Tagline → Qué controla → Comparativa → Qué es Publify → Cómo funciona → Para quién → Early Adopters → Preventa → FAQ → CTA final

## Archivos a crear
- `src/pages/LandingPage/components/ControlSection.tsx`
- `src/pages/LandingPage/components/ComparisonSection.tsx`

## Archivos a modificar
- `src/pages/LandingPage/LandingPage.tsx` (imports y orden)
- `src/pages/LandingPage/components/Hero.tsx` (copy)
- `src/pages/LandingPage/components/TaglineSection.tsx` (copy)
- `src/pages/LandingPage/components/WhatIsPublifySection.tsx` (copy pilares y listas)
- `src/pages/LandingPage/components/PreventaSection.tsx` (copy MVP)
- `src/pages/LandingPage/components/FaqSection.tsx` (respuestas)
- `src/pages/LandingPage/components/FinalCtaSection.tsx` (copy)

