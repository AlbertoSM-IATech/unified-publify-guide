import { useState, useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { EditorToolbar } from "./Editor/EditorToolbar";
import { LinkInput } from "./Editor/LinkInput";
import { editorExtensions } from "./Editor/EditorExtensions";
import "./Editor/editor.css";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  readOnly?: boolean;
  placeholder?: string;
}

export const RichTextEditor = ({ content, onChange, readOnly = false, placeholder }: RichTextEditorProps) => {
  const [linkUrl, setLinkUrl] = useState<string>('');
  const [showLinkInput, setShowLinkInput] = useState<boolean>(false);

  const editor = useEditor({
    extensions: editorExtensions,
    content: content || "",
    editable: !readOnly,
    editorProps: {
        attributes: {
          // Asegúrate de que estas clases no impidan la edición. 'focus:outline-none' es estándar.
          class: 'prose prose-sm max-w-none dark:prose-invert min-h-[150px] focus:outline-none',
        },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log("RichTextEditor onUpdate: User typed. HTML:", html);
      onChange(html);
    },
  });

  // Sincronizar contenido con el padre cuando el prop 'content' cambia.
  // Hacemos esto menos agresivo para no interrumpir la escritura.
  useEffect(() => {
    if (editor && !readOnly) {
      const editorHtml = editor.getHTML();
      console.log("RichTextEditor useEffect [content, editor, readOnly]: Current 'content' prop:", content);
      console.log("RichTextEditor useEffect [content, editor, readOnly]: Current editorHTML:", editorHtml);
      
      // Solo actualizar si el contenido del prop es diferente Y el editor no está enfocado.
      // Esto previene que se interrumpa la escritura, asumiendo que si está enfocado, el usuario está escribiendo.
      if (content !== editorHtml && !editor.isFocused) {
        console.log("RichTextEditor: External content change detected (not focused). Updating editor content.");
        // El segundo argumento 'false' evita que se emita otro evento 'onUpdate'.
        editor.commands.setContent(content || "", false);
      } else if (content !== editorHtml && editor.isFocused) {
        console.log("RichTextEditor: Content prop differs, but editor IS FOCUSED. Not calling setContent to avoid disrupting user input.");
      } else if (content === editorHtml) {
        console.log("RichTextEditor: Content prop matches editor HTML. No change needed.");
      }
    }
  }, [content, editor, readOnly]); // readOnly añadido como dependencia

  // Actualizar el estado 'editable' del editor cuando 'readOnly' cambia.
  useEffect(() => {
    if (editor) {
      console.log("RichTextEditor useEffect [readOnly, editor]: readOnly prop changed to:", readOnly, "Setting editor editable to:", !readOnly);
      editor.setEditable(!readOnly);
    }
  }, [readOnly, editor]);


  // Handle link setting
  const setLink = useCallback(() => {
    if (!editor || !linkUrl) return;
    
    // Check if the link has a protocol, if not add https://
    let url = linkUrl;
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
    
    setLinkUrl('');
    setShowLinkInput(false);
  }, [editor, linkUrl]);

  if (!editor) {
    console.log("RichTextEditor: Editor instance is null. Rendering null.");
    return null;
  }

  // Si es readOnly, mostramos solo el contenido sin la barra de herramientas.
  if (readOnly) {
    console.log("RichTextEditor: Rendering read-only view.");
    // Aseguramos que el contenido del editor esté actualizado incluso en modo readOnly
    if (editor.getHTML() !== content) {
        editor.commands.setContent(content || "", false);
    }
    return (
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <EditorContent editor={editor} />
      </div>
    );
  }

  // Si no es readOnly (es decir, estamos en modo edición)
  console.log("RichTextEditor: Rendering editable view. Placeholder:", placeholder, "Editor has text:", editor.getText().length > 0);
  return (
    <div className="border rounded-md overflow-hidden">
      <EditorToolbar
        editor={editor}
        showLinkInput={showLinkInput}
        setShowLinkInput={setShowLinkInput}
      />
      
      {showLinkInput && (
        <LinkInput
          linkUrl={linkUrl}
          setLinkUrl={setLinkUrl}
          onSave={setLink}
          onCancel={() => setShowLinkInput(false)}
        />
      )}
      
      <div className="bg-background p-3 min-h-[150px] relative">
        <EditorContent 
          editor={editor} 
          // La clase 'prose' ya está en editorProps.attributes.class, aquí podemos omitirla o ser más específicos.
          // className="prose prose-sm max-w-none dark:prose-invert min-h-[150px]" 
        />
        {placeholder && !editor.getText() && (
          <div className="absolute top-3 left-3 text-muted-foreground pointer-events-none opacity-50">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
};
