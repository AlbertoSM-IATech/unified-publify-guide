

## Plan: Completar la landing con las secciones que faltan

### Diagnóstico

Actualmente la landing solo renderiza: **Hero → ProblemSolution → Testimonials → Preventa → Footer**.

Según los screenshots, faltan varias secciones y el formulario de reserva solo pide email (debería pedir **nombre + email**).

### Cambios propuestos

#### 1. Añadir campo "Nombre" al formulario de PreventaSection
**Archivo:** `PreventaSection.tsx`
- Añadir estado `name` + input de nombre antes del email
- Validar ambos campos en `handleSubmit`
- Actualizar texto de ayuda

#### 2. Añadir secciones faltantes al layout
**Archivo:** `LandingPage.tsx`

Nuevo orden de secciones:
```
Hero
ProblemSolutionSection
TargetAudienceSection    ← NUEVA (ya existe el componente)
EarlyAdoptersSection     ← NUEVA (ya existe el componente)
TestimonialsSection
PreventaSection (con form nombre+email)
FinalCtaSection          ← NUEVA (ya existe el componente)
Footer
```

#### 3. Actualizar WaitlistFormSection (nombre + email)
**Archivo:** `WaitlistFormSection.tsx` — ya tiene nombre y email, pero no se usa en el layout. Se mantiene como está por si se necesita más adelante; el formulario principal será el de PreventaSection actualizado.

### Resumen
- 1 archivo editado (PreventaSection: +campo nombre)
- 1 archivo editado (LandingPage: +3 imports y secciones)
- 0 archivos nuevos

