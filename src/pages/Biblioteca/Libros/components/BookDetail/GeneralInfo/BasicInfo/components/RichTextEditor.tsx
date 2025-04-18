
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
}

export const RichTextEditor = ({ content, onChange, readOnly = false }: RichTextEditorProps) => {
  const [linkUrl, setLinkUrl] = useState<string>('');
  const [showLinkInput, setShowLinkInput] = useState<boolean>(false);

  const editor = useEditor({
    extensions: editorExtensions,
    content: content || "",
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync content with parent
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor]);

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
    return null;
  }

  if (readOnly) {
    return (
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <EditorContent editor={editor} />
      </div>
    );
  }

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
      
      <div className="bg-background p-3 prose prose-sm max-w-none dark:prose-invert">
        <EditorContent editor={editor} className="min-h-[150px]" />
      </div>
    </div>
  );
};
