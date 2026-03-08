

## Plan: Reemplazar partículas por elementos editoriales flotantes

### Idea

Sustituir el fondo de partículas genéricas (`tsparticles`) por **iconos SVG flotantes del mundo editorial**: libros abiertos, páginas, plumas, marcapáginas, letras tipográficas, y símbolos de párrafo — todos animados con `framer-motion` de forma sutil y elegante.

### Cambios

#### 1. Reemplazar `ParticlesBackground.tsx`
Eliminar `tsparticles` y crear un nuevo componente con ~20 elementos SVG editoriales flotantes:
- **Iconos**: libro abierto, página/hoja, pluma/nib, marcapáginas, símbolo ¶, comillas «», letra A tipográfica
- **Animación**: cada elemento flota con `framer-motion` (translate Y + rotación suave + fade in/out), velocidades y posiciones aleatorias
- **Estilo**: siluetas en `primary` y `accent` con opacidad baja (0.06–0.15 light, 0.1–0.25 dark), tamaños variados (16px–40px)
- Mantiene `pointer-events-auto` y la misma interfaz para que `Hero.tsx` no necesite cambios

#### 2. Sin cambios en otros archivos
`Hero.tsx` ya importa `ParticlesBackground` — sigue funcionando igual.

### Resultado
El hero tendrá un fondo temático editorial coherente con Publify en vez de partículas genéricas tech.

