

## Plan: Animaciones Profesionales para la Landing Page

Se implementarán 3 sistemas de animación de forma progresiva: **tsParticles**, **GSAP ScrollTrigger** y **fondo 3D con React Three Fiber**.

---

### 1. Instalar dependencias

- `@tsparticles/react` + `@tsparticles/slim` — sistema de partículas
- `gsap` — animaciones y ScrollTrigger
- `@react-three/fiber@^8.18` + `@react-three/drei@^9.122.0` + `three@^0.133` — escena 3D

### 2. tsParticles — Reemplazar partículas manuales del Hero

- Crear `src/components/motion/ParticlesBackground.tsx` con configuración de red de nodos conectados (links entre partículas) usando colores de la marca.
- En `Hero.tsx`, eliminar todas las partículas/triángulos/hexágonos/líneas manuales (el bloque `absolute inset-0 pointer-events-none`) y sustituir por `<ParticlesBackground />`.
- Configuración: ~40 partículas, interactividad al hover (repel), links semi-transparentes, movimiento suave.

### 3. GSAP ScrollTrigger — Animaciones al scroll

- Crear hook `src/hooks/useScrollAnimations.ts` que registre ScrollTrigger.
- En `ProblemSolutionSection.tsx`: animar las tarjetas de problemas con reveal lateral (izquierda) y soluciones desde la derecha, con stagger.
- En `PreventaSection.tsx`: parallax sutil en el fondo + scale-in de la tarjeta de pricing.
- En `Hero.tsx`: parallax en la imagen del dashboard (se mueve más lento que el scroll).
- Reemplazar algunas animaciones de Framer Motion por GSAP donde el trigger sea scroll (más eficiente).

### 4. Fondo 3D — React Three Fiber

- Crear `src/components/motion/Scene3D.tsx` con un Canvas que renderice esferas/icosaedros flotantes semi-transparentes con colores de la marca.
- Usar `Float` y `MeshDistortMaterial` de drei para movimiento orgánico.
- Posicionar como fondo del `TechBackground.tsx` o como capa alternativa, con `pointer-events-none`.
- Implementar lazy loading (`React.lazy` + `Suspense`) para no bloquear la carga inicial.

### 5. Orden de implementación

1. tsParticles (reemplazo directo, impacto inmediato)
2. GSAP ScrollTrigger (mejora progresiva al scroll)
3. Fondo 3D (capa final de impacto visual)

---

### Detalles técnicos

- Las partículas de tsParticles son más performantes que las actuales de Framer Motion (usa Canvas/WebGL).
- GSAP ScrollTrigger se limpiará en `useEffect` return para evitar memory leaks.
- El Canvas 3D usará `dpr={[1, 1.5]}` y `frameloop="demand"` para optimizar rendimiento.
- Se mantendrá Framer Motion para animaciones de entrada (fade, stagger) que no dependen del scroll.

