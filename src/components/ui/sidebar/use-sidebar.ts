
import { createContext, useContext } from "react"

export const SIDEBAR_COOKIE_NAME = "sidebar-expanded"
export const SIDEBAR_KEYBOARD_SHORTCUT = "mod+b" // Cmd/Ctrl+B

type SidebarState = {
  expanded: boolean
  hasCollapsedWidth: boolean
  toggleExpanded: () => void
  hide: () => void
  show: () => void
}

export const SidebarContext = createContext<SidebarState | null>(null)

export function useSidebar() {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }

  return context
}
