import React from 'react'
import { Tabs } from './Tabs'
import { TabsProps } from '@/shared/ui/tabs/Tabs.types'

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  argTypes: {
    activeTab: { control: 'text' },
    onChange: { action: 'tab changed' },
  },
}

export default meta

const defaultTabs = [{ id: '1', label: 'Tabs' }]

export const Default = (args: TabsProps) => <Tabs {...args} />
Default.args = {
  tabs: defaultTabs,
}

export const DefaultActive = (args: TabsProps) => <Tabs {...args} />
DefaultActive.args = {
  tabs: defaultTabs,
  activeTab: '1',
}

export const Active = (args: TabsProps) => <Tabs {...args} />
Active.args = {
  tabs: defaultTabs,
}
Active.parameters = {
  pseudo: { active: true },
}

export const Hover = (args: TabsProps) => <Tabs {...args} />
Hover.args = {
  tabs: defaultTabs,
  activeTab: '1',
}
Hover.parameters = {
  pseudo: { hover: true },
}

export const Focus = (args: TabsProps) => <Tabs {...args} />
Focus.args = {
  tabs: defaultTabs,
  activeTab: '1',
}
Focus.parameters = {
  pseudo: { focus: true },
}

export const Disabled = (args: TabsProps) => <Tabs {...args} />
Disabled.args = {
  tabs: [{ id: '1', label: 'Tabs', disabled: true }],
}
