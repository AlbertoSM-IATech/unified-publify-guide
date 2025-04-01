
import * as React from "react"
import { cn } from "@/lib/utils"

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  SidebarFooterProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex px-3 py-4 mt-auto flex-col gap-3 border-t border-sidebar-border",
        className
      )}
      {...props}
    />
  )
})

SidebarFooter.displayName = "SidebarFooter"
