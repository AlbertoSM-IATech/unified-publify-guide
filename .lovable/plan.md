

## Plan: Conectar Notion como CMS para el blog

### Cómo funcionará

Escribirás tus artículos en una **base de datos de Notion**. La web los leerá automáticamente desde ahí. Para añadir, editar o eliminar artículos, solo tienes que hacerlo en Notion.

### Pasos

**1. Conectar Notion MCP**
- Conectar el conector MCP de Notion desde los ajustes del proyecto para que podamos acceder a tu workspace y crear la estructura necesaria.

**2. Crear base de datos en Notion**
- Una base de datos con las columnas: Título, Slug, Excerpt, Categoría, Fecha, Tiempo de lectura, Autor, Rol del autor, Featured (checkbox), Contenido (página completa)

**3. Edge function para leer artículos**
- `supabase/functions/notion-blog/index.ts`: consulta la base de datos de Notion y devuelve los artículos formateados
- Convierte los bloques de Notion a HTML/markdown para el contenido del artículo

**4. Actualizar el frontend**
- `src/pages/Blog/blogData.ts` → convertir en un hook `useBlogPosts` que llame a la edge function via React Query
- `src/pages/Blog/Blog.tsx` → usar el hook en vez de datos hardcodeados
- `src/pages/Blog/BlogPost.tsx` → cargar contenido completo del artículo desde Notion
- Añadir estados de carga (skeleton) mientras se cargan los datos
- Mantener los datos hardcodeados como fallback inicial

### Requisitos previos
- Conectar el MCP de Notion (lo haremos primero)
- Tener Lovable Cloud habilitado para la edge function

