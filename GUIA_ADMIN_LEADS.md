# Guía rápida — Admin de Leads Publify

## Acceso

1. Ir a `/admin/login`.
2. Entrar con `test.publify@gmail.com` o `albertosm.iatech@gmail.com` (email/password o Google).
3. Solo estas cuentas tienen rol `admin`; cualquier otra es rechazada.

## Lista de leads (`/admin/leads`)

- Tabla ordenada por fecha (más recientes primero).
- Filtros por **stage** (high-intent, solution-aware, problem-aware, cold) y por **score**.
- Buscador por nombre/email.
- Cada fila muestra: score, stage, nombre, email, fecha y estado de IA.
- Click en una fila → detalle del lead.

## Detalle del lead (`/admin/leads/:id`)

### Columna izquierda — respuestas del diagnóstico
- **Contacto**: nombre, email, fecha de recepción.
- **Perfil editorial**: catálogo, equipo, situación.
- **Dolor**: puntos seleccionados + texto libre.
- **Autodiagnóstico**: ¿necesita sistema? + impacto.
- **Intención**: timing, preferencia de siguiente paso, configurar primero, horario, objeciones, duda principal.
- **Tracking** (si hay): UTMs y landing.

### Columna derecha — IA y acciones

**Aviso al admin**
- Historial de notificaciones por email con estado (pendiente / enviado / fallido), timestamp e intentos.
- Botón "Reintentar" si falló.

**Scoring breakdown**
- Desglose por bloque (FIT / INTENT / URGENCY) con los puntos parciales y la lista de razones.

**Análisis IA**
- Resumen, fricciones, objeciones probables, oportunidad, próximos pasos y preguntas de venta.
- Botón "Regenerar" para volver a llamar a la IA (opcional con prompt personalizado).

**Email sugerido**
- Editor con asunto y cuerpo pre-generados.
- Tokens disponibles: `{{nombre}}`, `{{producto}}`, `{{asin}}`.
- Botones: **Copiar**, **Descargar `.eml`**, **Enviar** (cuando el dominio de email esté configurado).
- Historial de versiones del email enviado/guardado.

## Flujo recomendado

1. Llega lead → recibo notificación por email (cuando el dominio esté activo).
2. Abro `/admin/leads`, ordeno por score descendente.
3. Reviso los high-intent (>70) primero.
4. Leo análisis IA + email sugerido.
5. Ajusto el email si hace falta, copio o envío.
6. Marco internamente el follow-up.

## Seguridad

- Acceso protegido por `AdminProtectedRoute` (verifica sesión + rol `admin` vía `user_roles`).
- Función `has_role` con `SECURITY DEFINER` evita recursión en RLS.
- Solo los dos emails autorizados pueden auto-asignarse rol admin (`ensure_allowed_admin`).
- Webhook `submit-lead` con `client_request_id` para deduplicación.

## Pendiente (requiere configurar dominio de email)

- Envío real de la notificación al admin cuando entra un lead.
- Envío real del email sugerido desde el panel.
- Plantilla transaccional `admin-new-lead`.

Cuando el dominio esté listo: configurar → scaffold transaccional → crear plantilla → activar envíos.
