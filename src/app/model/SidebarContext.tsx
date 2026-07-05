import { createContext, useState, type FC, type PropsWithChildren } from 'react'

export type SidebarContextType = {
  openedId: string | null
  toggleGroup: (id: string) => void
}

export const ContextSidebar = createContext<SidebarContextType | null>(null)

export const SidebarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [openedId, setOpenedId] = useState<string | null>(null)

  const toggleGroup = (id: string) => {
    setOpenedId((prev) => (prev === id ? null : id))
  }

  return <ContextSidebar.Provider value={{ openedId, toggleGroup }}>{children}</ContextSidebar.Provider>
}
