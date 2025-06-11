
# Rutas de la Aplicación

## Rutas Públicas

### Landing Page
- `/` - Página principal con información del producto

### Autenticación
- `/login` - Página de inicio de sesión
- `/register` - Página de registro de usuarios
- `/forgot-password` - Recuperación de contraseña
- `/reset-password` - Restablecimiento de contraseña
- `/verify-email` - Verificación de email

### Checkout y Pagos
- `/checkout` - Página de checkout para suscripciones
  - Query params: `?plan=starter|pro`
- `/checkout/success` - Página de confirmación de pago exitoso
- `/checkout/cancel` - Página de pago cancelado

### Páginas Legales y Contacto
- `/terminos-y-condiciones` - Términos y condiciones
- `/politica-privacidad` - Política de privacidad
- `/contacto` - Página de contacto

## Rutas Protegidas (Requieren autenticación)

### Dashboard
- `/dashboard` - Panel principal del usuario

### Biblioteca
- `/biblioteca` - Redirecciona a `/biblioteca/libros`
- `/biblioteca/libros` - Lista de libros del usuario
- `/biblioteca/libros/:id` - Detalle de un libro específico
- `/biblioteca/colecciones` - Lista de colecciones/series
- `/biblioteca/colecciones/:id` - Detalle de una colección específica
- `/biblioteca/investigaciones` - Lista de investigaciones

### Otras Secciones
- `/marketing` - Herramientas de marketing
- `/finanzas` - Gestión financiera
- `/configuracion` - Configuración de la cuenta
- `/perfil` - Perfil del usuario

## Rutas Especiales
- `/index.html` - Redirecciona a `/`
- `*` (cualquier otra ruta) - Página 404 (NotFound)

## Notas
- Todas las rutas protegidas requieren autenticación
- Las rutas de checkout están preparadas para integración con Stripe
- La aplicación usa React Router v6 con lazy loading en algunas rutas
