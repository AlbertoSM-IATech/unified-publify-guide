
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import BubbleMenu from '@tiptap/extension-bubble-menu';
// Asegúrate de que TwoColumnsNode y ImageGalleryNode estén definidos e importados correctamente si los usas.
// import { TwoColumnsNode } from './Nodes/TwoColumnsNode'; 
// import { ImageGalleryNode } from './Nodes/ImageGalleryNode';
// import Placeholder from '@tiptap/extension-placeholder' // Si necesitas placeholder

export const editorExtensions = [
  StarterKit.configure({
    // StarterKit ya incluye bold, italic, strike, underline, heading, bulletList, orderedList, etc.
    // Si necesitas configurar el placeholder, puedes hacerlo aquí o con la extensión Placeholder.
    // placeholder: {
    //   placeholder: 'Escribe aquí...',
    // },
  }),
  Link.configure({
    openOnClick: true,
    autolink: true,
    linkOnPaste: true,
    // Considera validar las URLs si es necesario
    // validate: href => /^https?:\/\//.test(href), 
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    defaultAlignment: 'left',
  }),
  BubbleMenu.configure({
    // Aquí puedes configurar las opciones de Tippy.js si es necesario,
    // o el pluginKey si tienes múltiples bubble menus.
    // tippyOptions: { duration: 100, animation: 'scale-subtle' },
  }),
  // Si estás usando nodos personalizados como TwoColumnsNode o ImageGalleryNode,
  // asegúrate de que estén importados y añadidos aquí.
  // Ejemplo:
  // TwoColumnsNode,
  // ImageGalleryNode,

  // Si necesitas la extensión Placeholder explícitamente:
  // Placeholder.configure({
  //   placeholder: 'Comienza a escribir tu descripción...',
  // })
];

// Nota: Si TwoColumnsNode y ImageGalleryNode no existen o no están siendo usados,
// puedes eliminar los comentarios relacionados o implementarlos.
// Por ahora, los he comentado para evitar errores si no están definidos.

