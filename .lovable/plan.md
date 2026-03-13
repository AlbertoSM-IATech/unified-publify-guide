

## Plan: Reemplazar formularios de waitlist por popup con iframe de Notion

### Resumen
Todos los formularios inline de la landing se eliminan. Los botones CTA existentes se mantienen pero ahora abren un popup (Dialog) con el iframe de Notion incrustado.

### Cambios

**1. Nuevo componente: `src/components/WaitlistDialog.tsx`**
- Dialog reutilizable con el iframe de Notion dentro
- Props `open`/`onOpenChange` para control externo
- iframe: `src="https://wild-paperback-a33.notion.site/ebd//32283e512fb280f5aa76e0ed984c866f"`, width 100%, height 600

**2. `Hero.tsx`**
- Eliminar inputs de nombre/email y lógica de submit
- Dejar solo el botón CTA ("Bloquear precio desde 15€/mes") que abre el popup
- Quitar imports de `useWaitlistForm` y `WaitlistSuccessState`

**3. `PreventaSection.tsx`**
- Eliminar formulario sticky de la columna derecha (inputs + submit)
- Reemplazar con tarjeta sticky con botón CTA que abre el popup
- Las tarjetas info de la izquierda no se tocan

**4. `FinalCtaSection.tsx`**
- El botón deja de hacer scroll y abre el popup

**5. `StickyMobileCTA.tsx`**
- El botón deja de hacer scroll y abre el popup

**6. `WaitlistFormSection.tsx`**
- Eliminar o vaciar — verificar si sigue usándose en `LandingPage.tsx`

**7. Limpieza**
- Eliminar `useWaitlistForm` / `useWaitlistState` / `WaitlistProvider` si ya no se usan en ningún sitio

