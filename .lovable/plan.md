

## Plan: Mockup de PC/laptop alrededor de la imagen del dashboard

### Objetivo
Darle más protagonismo a la imagen del dashboard simulando que está dentro de la pantalla de un portátil/monitor, con un marco realista hecho con CSS puro.

### Cambios en `Hero.tsx` (líneas 147-174)

Reemplazar el contenedor actual de la imagen por un **mockup de laptop** construido con divs CSS:

1. **Marco del monitor**: Un div con bordes redondeados arriba, fondo oscuro (`bg-neutral-900`), padding fino simulando el bisel de un monitor.
2. **Barra superior del navegador**: Una franja con 3 puntos de colores (rojo, amarillo, verde) simulando los botones de ventana, más una barra de URL falsa con "app.publify.io".
3. **Pantalla**: La imagen del dashboard ocupa todo el interior.
4. **Base del portátil**: Un div trapezoidal debajo simulando la base/teclado del laptop, usando `clip-path` o bordes.
5. **Efecto glow**: Mantener el blur de fondo con `bg-primary/15` para dar profundidad.
6. **Animación**: Conservar la entrada con `rotateX` y `perspective` para el efecto 3D.

### Estructura visual

```text
  ╭──────────────────────────────╮
  │  ● ● ●   ▬▬▬▬▬▬▬▬▬▬▬▬▬▬   │  ← barra navegador
  │┌────────────────────────────┐│
  ││                            ││
  ││     dashboard image        ││
  ││                            ││
  │└────────────────────────────┘│
  ╰──────────────────────────────╯
      ╲________________________╱   ← base laptop
```

### Detalles técnicos
- Todo con CSS/Tailwind, sin imágenes extra
- La barra del navegador usa `flex items-center gap-1.5` con círculos de 10px
- La base usa `clip-path: polygon(10% 0, 90% 0, 100% 100%, 0% 100%)` con altura de ~12px
- Se aumenta ligeramente el tamaño general del bloque derecho para darle más peso visual

