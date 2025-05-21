
import { Editor } from "@tiptap/react";
import { 
  Bold, 
  Italic, 
  Underline, // This is the Lucide icon, not the Tiptap extension
  List, 
  ListOrdered,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Columns,
  Images
} from "lucide-react";
import { MenuButton } from "./MenuButton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface EditorToolbarProps {
  editor: Editor;
  showLinkInput: boolean;
  setShowLinkInput: (show: boolean) => void;
}

export const EditorToolbar = ({
  editor,
  showLinkInput,
  setShowLinkInput,
}: EditorToolbarProps) => {
  if (!editor) {
    return null;
  }

  // Handle text alignment
  const setTextAlign = (align: 'left' | 'center' | 'right') => {
    editor.chain().focus().setTextAlign(align).run();
  };

  // Insert two columns layout
  const insertTwoColumns = () => {
    editor.chain()
      .focus()
      .insertContent({
        type: 'twoColumns',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Columna izquierda' }]
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Columna derecha' }]
          }
        ]
      })
      .run();
  };

  // Insert image gallery placeholder
  const insertImageGallery = () => {
    editor.chain()
      .focus()
      .insertContent({
        type: 'imageGallery',
        content: [{ type: 'text', text: '[Galería de imágenes - Haga clic para editar]' }]
      })
      .run();
  };

  return (
    <div className="border-b p-1 flex flex-wrap gap-1 bg-muted/30">
      <MenuButton 
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
      >
        <Bold className="h-4 w-4" />
      </MenuButton>
      
      <MenuButton 
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
      >
        <Italic className="h-4 w-4" />
      </MenuButton>
      
      <MenuButton 
        onClick={() => editor.chain().focus().toggleMark('underline').run()} // Changed from toggleUnderline()
        active={editor.isActive('underline')}
      >
        <Underline className="h-4 w-4" />
      </MenuButton>
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
      <MenuButton 
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        active={editor.isActive('heading', { level: 1 })}
      >
        <Heading1 className="h-4 w-4" />
      </MenuButton>
      
      <MenuButton 
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive('heading', { level: 2 })}
      >
        <Heading2 className="h-4 w-4" />
      </MenuButton>
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
      <MenuButton 
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')}
      >
        <List className="h-4 w-4" />
      </MenuButton>
      
      <MenuButton 
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')}
      >
        <ListOrdered className="h-4 w-4" />
      </MenuButton>
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
      <MenuButton 
        onClick={() => setShowLinkInput(!showLinkInput)}
        active={editor.isActive('link')}
      >
        <LinkIcon className="h-4 w-4" />
      </MenuButton>
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
      <MenuButton 
        onClick={() => setTextAlign('left')}
        active={editor.isActive({ textAlign: 'left' })}
      >
        <AlignLeft className="h-4 w-4" />
      </MenuButton>
      
      <MenuButton 
        onClick={() => setTextAlign('center')}
        active={editor.isActive({ textAlign: 'center' })}
      >
        <AlignCenter className="h-4 w-4" />
      </MenuButton>
      
      <MenuButton 
        onClick={() => setTextAlign('right')}
        active={editor.isActive({ textAlign: 'right' })}
      >
        <AlignRight className="h-4 w-4" />
      </MenuButton>
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
      {/* Advanced A+ content tools */}
      <MenuButton onClick={insertTwoColumns}>
        <Columns className="h-4 w-4" />
      </MenuButton>
      
      <MenuButton onClick={insertImageGallery}>
        <Images className="h-4 w-4" />
      </MenuButton>
    </div>
  );
};

