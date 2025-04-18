
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MenuButtonProps {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export const MenuButton = ({ onClick, active, disabled = false, children }: MenuButtonProps) => (
  <Button
    type="button"
    variant="ghost"
    size="sm"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "h-8 w-8 p-0 text-muted-foreground",
      active && "bg-muted text-foreground"
    )}
  >
    {children}
  </Button>
);
