
import { Button } from "@/components/ui/button";

interface LinkInputProps {
  linkUrl: string;
  setLinkUrl: (url: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const LinkInput = ({ linkUrl, setLinkUrl, onSave, onCancel }: LinkInputProps) => (
  <div className="p-2 bg-muted/20 flex items-center gap-2">
    <input
      type="text"
      value={linkUrl}
      onChange={(e) => setLinkUrl(e.target.value)}
      placeholder="https://ejemplo.com"
      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    />
    <Button size="sm" onClick={onSave} className="h-9">
      Guardar
    </Button>
    <Button size="sm" variant="ghost" onClick={onCancel} className="h-9">
      Cancelar
    </Button>
  </div>
);
