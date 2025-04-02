
import * as React from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { SidebarContext, SIDEBAR_COOKIE_NAME, SIDEBAR_KEYBOARD_SHORTCUT } from "./use-sidebar"
import Cookies from "js-cookie"
import { useHotkeys } from "react-hotkeys-hook"
import { useIsMobile } from "@/hooks/use-mobile"

export interface SidebarProviderProps {
  children: React.ReactNode
  /**
   * The default expanded state of the sidebar.
   * @default true
   */
  defaultExpanded?: boolean
  /**
   * Define a custom condition to determine if the sidebar should have a collapsed width.
   */
  hasCollapsedWidth?: boolean
}

export function SidebarProvider({
  children,
  defaultExpanded = true,
  hasCollapsedWidth = false,
}: SidebarProviderProps) {
  const [expanded, setExpanded] = React.useState(defaultExpanded)
  const [openMobile, setOpenMobile] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const isMobile = useIsMobile()

  React.useEffect(() => {
    const savedExpanded = Cookies.get(SIDEBAR_COOKIE_NAME)
    if (savedExpanded) {
      setExpanded(savedExpanded === "true")
    }
  }, [])

  React.useEffect(() => {
    // If the screen size changes to mobile, collapse the sidebar
    if (!isDesktop) {
      setExpanded(false)
    }
  }, [isDesktop])

  function toggleExpanded() {
    setExpanded((prev) => {
      const next = !prev
      Cookies.set(SIDEBAR_COOKIE_NAME, String(next), { expires: 365 })
      return next
    })
  }

  function toggleSidebar() {
    toggleExpanded()
  }

  function hide() {
    setExpanded(false)
  }

  function show() {
    setExpanded(true)
  }

  // Toggle sidebar with keyboard shortcut
  useHotkeys(
    SIDEBAR_KEYBOARD_SHORTCUT,
    (event) => {
      event.preventDefault()
      toggleExpanded()
    },
    [toggleExpanded]
  )

  const state = expanded ? "expanded" : "collapsed"

  return (
    <SidebarContext.Provider
      value={{
        expanded,
        toggleExpanded,
        hasCollapsedWidth,
        hide,
        show,
        // Additional properties
        isMobile,
        state,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
