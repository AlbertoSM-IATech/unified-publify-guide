# PUBLIFY - Documentación Completa del SaaS

## 📋 DEFINICIÓN GENERAL

**Publify** es una plataforma SaaS (Software as a Service) diseñada específicamente para **autores, editores y profesionales de la publicación de libros digitales**. La plataforma centraliza y automatiza todo el proceso de gestión editorial, desde la creación hasta la comercialización de libros.

### 🎯 PROPÓSITO PRINCIPAL
Publify soluciona el problema de la **dispersión de herramientas** que enfrentan los autores modernos, ofreciendo un ecosistema unificado para:
- Gestión de biblioteca de libros
- Seguimiento financiero de publicaciones
- Organización por colecciones e investigaciones
- Análisis de rendimiento y métricas
- Administración completa del negocio editorial

## 🏗️ ARQUITECTURA TÉCNICA

### **Stack Tecnológico**
```
Frontend: React 18 + TypeScript + Vite
Styling: Tailwind CSS + Radix UI + Framer Motion
State: Zustand + React Query + Local Storage
Routing: React Router DOM v6
Charts: ApexCharts + React ApexCharts
Backend: Supabase (integración nativa)
Build: Vite + Vercel deployment
```

### **Estructura de Carpetas**
```
src/
├── components/              # Componentes reutilizables
│   ├── admin/              # Panel de administración
│   ├── auth/               # Autenticación
│   ├── charts/             # Gráficos (ApexCharts)
│   ├── common/             # Componentes comunes
│   ├── dashboard/          # Dashboard principal
│   ├── form/               # Componentes de formulario
│   ├── layout/             # Layout y navegación
│   ├── motion/             # Animaciones Framer Motion
│   └── ui/                 # Sistema de diseño (shadcn/ui)
├── contexts/               # Context providers
├── hooks/                  # Custom hooks
├── pages/                  # Páginas principales
│   ├── Admin/              # Panel administrador
│   ├── Auth/               # Login/Register
│   ├── Biblioteca/         # Gestión de contenido
│   │   ├── Libros/         # Gestión de libros
│   │   ├── Colecciones/    # Gestión de colecciones
│   │   └── Investigaciones/ # Gestión de investigaciones
│   ├── Dashboard/          # Dashboard principal
│   ├── Finanzas/           # Módulo financiero
│   ├── Marketing/          # Herramientas de marketing
│   └── LandingPage/        # Página de aterrizaje
├── providers/              # Providers globales
├── routes/                 # Configuración de rutas
├── services/               # Servicios (Supabase)
├── store/                  # Estado global (Zustand)
├── styles/                 # Estilos globales
└── utils/                  # Utilidades
```

## 📚 FUNCIONALIDADES PRINCIPALES

### **1. GESTIÓN DE BIBLIOTECA**

#### **Libros**
- **Información básica**: Título, subtítulo, autor, descripción (HTML enriquecido)
- **Metadatos**: ISBN, ASIN, fechas de publicación y lanzamiento
- **Estados**: Borrador, En revisión, Publicado, Archivado
- **Contenido**: Alto/Medio/Bajo contenido
- **Formatos múltiples**: Hardcover, Paperback, eBook
- **Información por formato**:
  - Dimensiones, páginas, archivos
  - Precios, costos de impresión, porcentajes de regalías
  - Enlaces (Amazon, preventa, reseñas, etc.)
  - BSR (Best Seller Rank)
- **Sistema de notas**: Notas con fechas para seguimiento
- **Audiencia objetivo**: Edad, género, intereses, posicionamiento
- **Contenido A+**: Texto enriquecido y archivos multimedia

#### **Colecciones**
- Agrupación lógica de libros relacionados
- Metadatos de colección (nombre, descripción, fecha creación)
- Conteo automático de libros
- Relaciones muchos-a-muchos con libros

#### **Investigaciones**
- Proyectos de investigación independientes
- Vinculación con libros específicos
- Seguimiento de progreso y estado
- Metadatos detallados

### **2. MÓDULO FINANCIERO**
- **Transacciones**: Ingresos, gastos, beneficios calculados
- **Costos fijos**: Gastos recurrentes con frecuencias
- **Ingresos fijos**: Ingresos recurrentes predecibles
- **Análisis temporal**: Vistas diarias, semanales, mensuales, anuales
- **Gráficos financieros**: Evolución temporal y distribuciones
- **Calculadora de rentabilidad**: Por formato de libro
- **Resúmenes automáticos**: Estadísticas del mes actual

### **3. DASHBOARD PRINCIPAL**
- **KPIs principales**: Libros totales, ingresos, usuarios activos
- **Gráficos interactivos**: Evolución financiera y distribuciones
- **Libros recientes**: Vista rápida de últimas publicaciones
- **Categorías de contenido**: Distribución por tipos
- **Navegación rápida**: Acceso directo a todas las secciones

### **4. PANEL DE ADMINISTRACIÓN**
- **Gestión de usuarios**: CRUD completo, roles, estadísticas
- **Gestión de libros**: Moderación, análisis, aprobaciones
- **Analytics avanzado**: Métricas de uso, conversiones, retención
- **Configuración del sistema**: Parámetros globales
- **Logs de actividad**: Auditoría completa del sistema
- **Estado del sistema**: Salud, almacenamiento, rendimiento

## 🗃️ MODELOS DE DATOS

### **Book (Libro)**
```typescript
interface Book {
  id: number;
  titulo: string;
  subtitulo: string;
  descripcion?: string;
  descripcionHtml?: string;
  autor: string;
  isbn: string;
  asin: string;
  estado: "Borrador" | "En revisión" | "Publicado" | "Archivado";
  contenido: "Alto Contenido" | "Medio Contenido" | "Bajo Contenido";
  fechaPublicacion: string | null;
  fechaLanzamiento?: string | null;
  bsr?: number | null;
  landingPageUrl?: string;
  contenidoAPlus?: string;
  contenidoAPlusFiles?: FileData[];
  imageUrl: string;
  portadaUrl?: string;
  investigacionId?: number;
  coleccionesIds?: number[];
  hardcover?: BookFormat;
  paperback?: BookFormat;
  ebook?: BookFormat;
  notes?: BookNote[];
  // Audiencia
  targetAge?: string;
  targetGender?: string;
  targetInterests?: string;
  marketPosition?: string;
  competitorBooks?: string;
  uniqueValueProposition?: string;
  amazonUrl?: string;
  authorPageUrl?: string;
}
```

### **BookFormat (Formato de Libro)**
```typescript
interface BookFormat {
  dimensions?: string;
  isbn?: string;
  asin?: string;
  pages?: number;
  files?: FileData[];
  price?: number;
  royaltyPercentage?: number;
  printingCost?: number;
  links?: BookLinks;
  strategy?: string;
  bsr?: number;
}
```

### **Collection (Colección)**
```typescript
interface Collection {
  id: number;
  nombre: string;
  descripcion: string;
  cantidadLibros: number;
  fechaCreacion: string;
  libros: number[];
  estado?: string;
}
```

### **Financial Records**
```typescript
interface FinancialRecord {
  id: number;
  mes: string;
  ingresos: number;
  gastos: number;
  beneficio: number;
  concepto?: string;
  observaciones?: string;
  fecha?: Date;
}

interface FixedCost {
  id: number;
  concepto: string;
  coste: number;
  frecuencia: string;
  fechaInicio: string;
  notas?: string;
}
```

## 🔧 ESTADO Y GESTIÓN DE DATOS

### **Zustand Store Global**
```typescript
interface AppState {
  // Usuario autenticado
  user: User | null;
  isAuthenticated: boolean;
  
  // UI State
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';
  
  // Cache de datos
  books: Book[];
  collections: Collection[];
  investigations: Investigation[];
  
  // Estados de carga
  loadingStates: {
    books: boolean;
    collections: boolean;
    investigations: boolean;
    dashboard: boolean;
  };
  
  // Sistema de notificaciones
  notifications: Notification[];
}
```

### **Persistencia de Datos**
- **LocalStorage**: Datos principales, preferencias de usuario
- **Zustand Persist**: Estado de UI, configuraciones
- **React Query**: Cache de peticiones, sincronización
- **Supabase (futuro)**: Persistencia en base de datos

## 🎨 SISTEMA DE DISEÑO

### **Design Tokens**
```css
:root {
  /* Colores semánticos HSL */
  --primary: [hsl values];
  --secondary: [hsl values];
  --accent: [hsl values];
  --muted: [hsl values];
  
  /* Estados */
  --success: [hsl values];
  --warning: [hsl values];
  --destructive: [hsl values];
  
  /* Gradientes */
  --gradient-primary: linear-gradient(...);
  --gradient-secondary: linear-gradient(...);
}
```

### **Componentes UI**
- **Radix UI**: Primitivos accesibles
- **shadcn/ui**: Componentes customizados
- **Lucide Icons**: Iconografía consistente
- **Tailwind CSS**: Utilidades de estilo
- **Framer Motion**: Animaciones fluidas

## 🚀 FLUJOS DE TRABAJO PRINCIPALES

### **1. Gestión de Libros**
```
Creación → Edición → Formatos → Precios → Notas → Publicación
```

### **2. Gestión Financiera**
```
Transacciones → Categorización → Análisis → Reportes → Proyecciones
```

### **3. Administración**
```
Monitoreo → Gestión usuarios → Moderación → Analytics → Configuración
```

## 📊 CARACTERÍSTICAS TÉCNICAS AVANZADAS

### **Performance**
- **Lazy Loading**: Rutas y componentes cargados bajo demanda
- **Code Splitting**: Chunks optimizados por módulos
- **Error Boundaries**: Manejo robusto de errores
- **React.memo**: Optimización de renders
- **Virtualization**: Para listas grandes de datos

### **UX/UI**
- **Responsive Design**: Móvil-first approach
- **Dark/Light Mode**: Tema automático y manual
- **Animaciones**: Transiciones fluidas con Framer Motion
- **Accesibilidad**: Componentes Radix UI accesibles
- **Toast System**: Notificaciones no intrusivas

### **Arquitectura de Estado**
- **Zustand**: Estado global ligero y eficiente
- **React Query**: Cache inteligente y sincronización
- **LocalStorage**: Persistencia local robusta
- **Context API**: Estados específicos por funcionalidad

## 🔐 SEGURIDAD Y ADMINISTRACIÓN

### **Roles de Usuario**
```typescript
type UserRole = 'user' | 'admin' | 'super_admin';
```

### **Rutas Protegidas**
- Autenticación obligatoria para acceso a la aplicación
- Panel de administración restringido por roles
- Middleware de protección en todas las rutas sensibles

### **Panel de Administración**
- **Dashboard**: Métricas del sistema, acciones rápidas
- **Usuarios**: Gestión completa, estadísticas, moderación  
- **Libros**: Supervisión de contenido, aprobaciones
- **Analytics**: Métricas avanzadas, conversiones, retención
- **Configuración**: Parámetros del sistema, integraciones
- **Logs**: Auditoría completa de actividades

## 📈 ESTADO ACTUAL Y CAPACIDADES

### **Funcionalidades Implementadas**
✅ Gestión completa de libros con múltiples formatos  
✅ Sistema de colecciones e investigaciones  
✅ Módulo financiero completo con gráficos  
✅ Dashboard principal con KPIs  
✅ Panel de administración funcional  
✅ Sistema de autenticación (mock)  
✅ Temas claro/oscuro  
✅ Diseño responsive  
✅ Arquitectura optimizada con Zustand + React Query  

### **Integraciones Pendientes**
🔄 Supabase para persistencia real  
🔄 Autenticación con proveedores OAuth  
🔄 Carga y procesamiento de archivos  
🔄 Sistema de pagos  
🔄 APIs de terceros (Amazon, analytics)  

### **Próximas Funcionalidades**
📋 Sistema de plantillas para libros  
📋 Automatización de marketing  
📋 Informes PDF exportables  
📋 Colaboración entre usuarios  
📋 Integraciones con plataformas de venta  

---

**Publify** representa una solución integral moderna para la gestión editorial profesional, combinando una arquitectura técnica robusta con una experiencia de usuario intuitiva y funcionalidades especializadas para el ecosistema de publicación digital.