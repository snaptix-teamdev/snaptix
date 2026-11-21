import { TabItemProps } from '@/shared/ui/tabs/Tabs.types'
import s from './Tabs.module.css'

export const TabsItem = ({ tab, isActive, onClick }: TabItemProps) => {
  const handleClick = () => {
    if (!tab.disabled) {
      onClick(tab.id)
    }
  }
  let className = s.tab
  if (isActive) {
    className += ` ${s.active}`
  }

  if (tab.disabled) {
    className += ` ${s.disabled}`
  }
  return (
    <button className={className} onClick={handleClick} disabled={tab.disabled}>
      {tab.label}
    </button>
  )
}
