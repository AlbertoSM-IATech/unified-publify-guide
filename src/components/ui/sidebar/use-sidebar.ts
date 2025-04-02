
import { createContext, useContext } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useIsMobile } from "@/hooks/use-mobile"

export const SIDEBAR_COOKIE_NAME = "sidebar-expanded"
export const SIDEBAR_KEYBOARD_SHORTCUT = "mod+b" // Cmd/Ctrl+B
export const SIDEBAR_WIDTH_MOBILE = "280px"

export type SidebarState = {
  expanded: boolean
  hasCollapsedWidth: boolean
  toggleExpanded: () => void
  hide: () => void
  show: () => void
  // Additional properties needed for components
  isMobile: boolean
  state: "expanded" | "collapsed"
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  toggleSidebar: () => void
}

export const SidebarContext = createContext<SidebarState | null>(null)

export function useSidebar() {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }

  return context
}
