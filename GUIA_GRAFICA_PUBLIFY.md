# GUÍA GRÁFICA PUBLIFY - DESIGN SYSTEM
**Versión 1.0 | Para diseñadores**

---

## 🎨 PALETA DE COLORES

### Colores Principales
- **Primary (Coral)**: `#FB923C` - HSL(24, 94%, 59%)
- **Accent (Azul)**: `#3B82F6` - HSL(217, 91%, 60%)

### Modo Claro (Light Mode)
```css
Background: #F7F7F7 (HSL 0, 0%, 97%)
Foreground: #1F1F1F (HSL 0, 0%, 12%)
Card: #FFFFFF (HSL 0, 0%, 100%)
Muted: #F0F0F0 (HSL 220, 14%, 94%)
Muted Foreground: #666666 (HSL 215, 25%, 40%)
Border: #D9D9D9 (HSL 0, 0%, 85%)
```

### Modo Oscuro (Dark Mode)
```css
Background: #1E1E1E (HSL 0, 0%, 12%)
Foreground: #F2F2F2 (HSL 0, 0%, 95%)
Card: #262626 (HSL 0, 0%, 15%)
Muted: #2E2E2E (HSL 0, 0%, 18%)
Muted Foreground: #A6A6A6 (HSL 0, 0%, 65%)
Border: #383838 (HSL 0, 0%, 22%)
```

### Sidebar (Siempre Oscuro)
```css
Background: #1E1E1E (HSL 0, 0%, 12%)
Foreground: #FFFFFF (HSL 0, 0%, 100%)
Accent: #2E2E2E (HSL 0, 0%, 18%)
Border: #2E2E2E (HSL 0, 0%, 18%)
```

### Colores Funcionales

#### Estados de Contenido
- **Alto Contenido**: `#3B82F6` (Azul)
- **Medio Contenido**: `#FB923C` (Coral/Naranja)
- **Bajo Contenido**: `#22C55E` (Verde)

#### Estados de Publicación
- **Publicado**: `#10B981` (Verde)
- **En Revisión**: `#F59E0B` (Ámbar)
- **Borrador**: `#6366F1` (Índigo)
- **Archivado**: `#EF4444` (Rojo)

#### Paleta de Neutrales
```css
neutral-100: #FFFFFF
neutral-200: #E5E5E5
neutral-300: #D5D5D5
neutral-400: #CACACA
neutral-500: #858585
neutral-600: #606060
neutral-700: #3E3E3E
neutral-800: #1E1E1E
```

---

## 📝 TIPOGRAFÍA

### Fuentes Principales
- **Sans (Cuerpo)**: `Inter, sans-serif`
  - Weights: 300, 400, 500, 600, 700
  - Uso: Texto general, interfaces, párrafos

- **Heading (Títulos)**: `Poppins, sans-serif`
  - Weights: 400, 500, 600, 700
  - Uso: Títulos, headers, navegación

### Jerarquía Tipográfica
```css
h1: font-heading, font-semibold, text-4xl (36px)
h2: font-heading, font-semibold, text-3xl (30px)
h3: font-heading, font-semibold, text-xl (20px)
h4: font-heading, font-semibold, text-lg (18px)
h5: font-heading, font-semibold, text-base (16px)
h6: font-heading, font-semibold, text-sm (14px)

Body: font-sans, text-base (16px)
Small: font-sans, text-sm (14px)
Caption: font-sans, text-xs (12px)
```

---

## 🔲 COMPONENTES Y ELEMENTOS

### Bordes y Radios
```css
Border Radius:
- lg: 8px (0.5rem)
- md: 6px (calc(0.5rem - 2px))
- sm: 4px (calc(0.5rem - 4px))
```

### Sombras
```css
Coral Shadow: 0 4px 14px -2px rgba(251, 146, 60, 0.35)
Blue Shadow: 0 4px 14px -2px rgba(59, 130, 246, 0.35)
Card Shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)
```

### Espaciado (Sistema 8px)
```css
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
```

---

## 🎯 COMPONENTES ESPECÍFICOS

### Botones
#### Primario
- **Background**: `#FB923C` (Coral)
- **Text**: Blanco
- **Hover**: `#FB923C` con 90% opacidad
- **Shadow**: Sutil

#### Secundario
- **Background**: `#3B82F6` (Azul)
- **Text**: Blanco
- **Hover**: `#3B82F6` con 90% opacidad

#### Outline
- **Border**: neutral-300 (light) / neutral-700 (dark)
- **Hover**: Border coral con fondo coral/10

### Cards
- **Background**: Blanco (light) / #262626 (dark)
- **Border**: neutral-200 (light) / neutral-700 (dark)
- **Hover**: Sombra coral/20, border coral/50, translate Y -4px

### Badges de Estado
#### Publicado
- **Background**: green-100 (light) / green-900/30 (dark)
- **Text**: green-800 (light) / green-300 (dark)
- **Border**: green-200 (light) / green-800 (dark)

#### Borrador
- **Background**: indigo-100 (light) / indigo-900/30 (dark)
- **Text**: indigo-800 (light) / indigo-300 (dark)

#### En Revisión
- **Background**: amber-100 (light) / amber-900/30 (dark)
- **Text**: amber-800 (light) / amber-300 (dark)

#### Archivado
- **Background**: red-100 (light) / red-900/30 (dark)
- **Text**: red-800 (light) / red-300 (dark)

---

## 🎬 ANIMACIONES

### Keyframes Principales
```css
Fade In: opacity 0→1 + translateY 10px→0 (0.3s ease-out)
Float: translateY 0→-5px→0 (3s infinite)
Pulse Soft: opacity 1→0.8→1 (2s infinite)
Glow: box-shadow con coral (2s infinite)
Scale In: scale 0.95→1 + opacity 0→1 (0.2s ease-out)
```

### Transiciones
- **Default**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- **Hover Effects**: 0.2s ease-out
- **Focus Ring**: 2px coral/60 con offset 2px

---

## 📱 RESPONSIVE BREAKPOINTS

```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1400px
```

### Container
- **Center**: true
- **Padding**: 2rem (32px)
- **Max Width**: 1400px en 2xl

---

## 🎨 GLASS EFFECTS

### Glass Card
```css
background: rgba(255, 255, 255, 0.8) (light) / rgba(38, 38, 38, 0.6) (dark)
backdrop-filter: blur(4px)
border: 1px solid rgba(255, 255, 255, 0.2) (light) / rgba(255, 255, 255, 0.1) (dark)
```

---

## 📋 SCROLLBARS

```css
Width: 8px
Track: transparent
Thumb: rgba(133, 133, 133, 0.3)
Thumb Hover: rgba(133, 133, 133, 0.5)
Border Radius: 4px
```

---

## 🔍 FOCUS STATES

- **Ring Color**: Coral (#FB923C) con 60% opacidad
- **Ring Width**: 2px
- **Ring Offset**: 2px
- **Outline**: none

---

## 📊 CHARTS Y GRÁFICOS (ApexCharts)

### Colores para Gráficos
- **Alto Contenido**: `#3B82F6`
- **Medio Contenido**: `#FB923C`
- **Bajo Contenido**: `#22C55E`

### Tema de Gráficos
- **Font Family**: Poppins, sans-serif
- **Grid Color**: rgba(150, 150, 150, 0.2) (dark) / rgba(96, 96, 96, 0.2) (light)
- **Text Color**: rgba(233, 233, 233, 0.9) (dark) / rgba(60, 60, 60, 0.9) (light)

---

## 💡 NOTAS PARA EL DISEÑADOR

1. **Sistema Consistente**: Todos los colores están definidos como variables HSL para máxima flexibilidad
2. **Dark Mode Nativo**: El sidebar siempre permanece oscuro, incluso en modo claro
3. **Accesibilidad**: Contrastes verificados para WCAG AA
4. **Escalabilidad**: Sistema de tokens semánticos (primary, secondary, etc.)
5. **Hover States**: Todos los elementos interactivos tienen estados hover definidos
6. **Shadows**: Sistema coherente de sombras basado en los colores principales
7. **Glass Morphism**: Efectos de cristal para elementos especiales
8. **Motion**: Animaciones sutiles y profesionales, sin distracciones