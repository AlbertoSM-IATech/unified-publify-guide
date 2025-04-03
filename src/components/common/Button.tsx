
import { Button as ShadcnButton } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";
import { forwardRef } from "react";

/**
 * Primary button component that standardizes the look and feel across the application
 * Wraps the shadcn/ui Button component with our custom styling defaults
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = "default", size = "default", ...props }, ref) => {
    return (
      <ShadcnButton
        ref={ref}
        variant={variant}
        size={size}
        className={className}
        {...props}
      >
        {children}
      </ShadcnButton>
    );
  }
);

Button.displayName = "Button";

export type { ButtonProps };
