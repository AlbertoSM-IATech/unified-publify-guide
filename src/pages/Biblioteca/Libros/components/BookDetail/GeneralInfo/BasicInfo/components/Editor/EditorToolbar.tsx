
import { Editor } from "@tiptap/react";
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  Strikethrough, 
  Heading1, 
  Heading2,
  Heading3,
  ListOrdered,
  List,
  Link as LinkIcon,
} from "lucide-react";
import { MenuButton } from "./MenuButton";

interface EditorToolbarProps {
  editor: Editor;
  showLinkInput: boolean;
  setShowLinkInput: (show: boolean) => void;
}

export const EditorToolbar = ({ editor, showLinkInput, setShowLinkInput }: EditorToolbarProps) => {
  const toggleHeading = (level: 1 | 2 | 3) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  return (
    <div className="bg-muted/40 p-1 border-b flex flex-wrap gap-1 items-center">
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
        onClick={() => editor.chain().focus().toggleMark('underline').run()}
        active={editor.isActive('underline')}
      >
        <UnderlineIcon className="h-4 w-4" />
      </MenuButton>
      
      <MenuButton 
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive('strike')}
      >
        <Strikethrough className="h-4 w-4" />
      </MenuButton>
      
      <span className="w-[1px] h-6 bg-border mx-1"></span>
      
      <MenuButton 
        onClick={() => toggleHeading(1)}
        active={editor.isActive('heading', { level: 1 })}
      >
        <Heading1 className="h-4 w-4" />
      </MenuButton>
      
      <MenuButton 
        onClick={() => toggleHeading(2)}
        active={editor.isActive('heading', { level: 2 })}
      >
        <Heading2 className="h-4 w-4" />
      </MenuButton>
      
      <MenuButton 
        onClick={() => toggleHeading(3)}
        active={editor.isActive('heading', { level: 3 })}
      >
        <Heading3 className="h-4 w-4" />
      </MenuButton>
      
      <span className="w-[1px] h-6 bg-border mx-1"></span>
      
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
      
      <span className="w-[1px] h-6 bg-border mx-1"></span>
      
      <MenuButton 
        onClick={() => setShowLinkInput(!showLinkInput)}
        active={editor.isActive('link')}
      >
        <LinkIcon className="h-4 w-4" />
      </MenuButton>
    </div>
  );
};
