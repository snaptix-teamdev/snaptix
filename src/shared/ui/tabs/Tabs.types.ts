export type Tab = {
  id: string
  label: string
  disabled?: boolean
}

export type TabsProps = {
  tabs: Tab[]
  activeTab: string
  onChange: (id: string) => void
}

export type TabItemProps = {
  tab: Tab
  isActive: boolean
  onClick: (id: string) => void
}
