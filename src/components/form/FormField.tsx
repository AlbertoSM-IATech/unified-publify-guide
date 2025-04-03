
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, className, icon, id, ...props }, ref) => {
    const fieldId = id || label.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="space-y-2">
        <Label htmlFor={fieldId} className="block text-sm font-medium">
          {label}
        </Label>
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {icon}
            </div>
          )}
          <Input
            ref={ref}
            id={fieldId}
            className={cn(
              icon && "pl-10",
              error && "border-destructive focus:ring-destructive",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";
