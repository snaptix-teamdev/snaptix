import React from 'react'
import { Checkbox } from './Checkbox'
import type { CheckBoxProps } from './CheckBox.types'

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
}

export default meta

export const Default = (args: CheckBoxProps) => <Checkbox {...args} />
Default.args = {
  label: 'Check-box',
  checked: false,
  disabled: false,
}

export const Checked = (args: CheckBoxProps) => <Checkbox {...args} />
Checked.args = {
  label: 'Check-box',
  checked: true,
}

export const Hover = (args: CheckBoxProps) => <Checkbox {...args} />
Hover.args = {
  label: 'Check-box',
}
Hover.parameters = {
  pseudo: { hover: true },
}

export const Focus = (args: CheckBoxProps) => <Checkbox {...args} />
Focus.args = {
  label: 'Check-box',
}
Focus.parameters = {
  pseudo: { focusVisible: true },
}

export const Disabled = (args: CheckBoxProps) => <Checkbox {...args} />
Disabled.args = {
  label: 'Check-box',
  disabled: true,
}
