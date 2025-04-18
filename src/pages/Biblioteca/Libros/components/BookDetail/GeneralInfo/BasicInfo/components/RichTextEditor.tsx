
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { EditorToolbar } from "./Editor/EditorToolbar";
import { LinkInput } from "./Editor/LinkInput";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  readOnly?: boolean;
}

export const RichTextEditor = ({ content, onChange, readOnly = false }: RichTextEditorProps) => {
  const [linkUrl, setLinkUrl] = useState<string>('');
  const [showLinkInput, setShowLinkInput] = useState<boolean>(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
    ],
    content: content || "",
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const setLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run();
      
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

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
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
