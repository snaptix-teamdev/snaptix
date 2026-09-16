import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { RadioGroup } from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/Rradio-group',
  component: RadioGroup,
  argTypes: {
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

const options = [
  { label: 'Apple Fruit', value: 'apple' },
  { label: 'Banana Fruit', value: 'banana' },
]

export const RadioDefault: Story = {
  render: (args) => {
    const [value, setValue] = useState('')

    return <RadioGroup {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  },
  args: {
    groupLabel: 'Выбор фруктов:',
    options,
    name: 'fruits',
  },
}

export const RadioDisabled: Story = {
  args: {
    options,
    name: 'fruits',
    value: 'apple',
    disabled: true,
  },
}
