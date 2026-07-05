import React from 'react'
import { Button } from './Button'
import type { ButtonProps } from './Button.types'

const meta = {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    children: { control: 'text' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
}

export default meta

export const Primary = (args: ButtonProps) => <Button {...args} />
Primary.args = {
  variant: 'primary',
  children: 'Primary',
  disabled: false,
}

export const Secondary = (args: ButtonProps) => <Button {...args} />
Secondary.args = {
  variant: 'secondary',
  children: 'Secondary',
  disabled: false,
}

export const Outline = (args: ButtonProps) => <Button {...args} />
Outline.args = {
  variant: 'outline',
  children: 'Outline',
  disabled: false,
}

export const Ghost = (args: ButtonProps) => <Button {...args} />
Ghost.args = {
  variant: 'ghost',
  children: 'Ghost',
  disabled: false,
}

export const Disabled = (args: ButtonProps) => <Button {...args} />
Disabled.args = {
  variant: 'primary',
  children: 'Disabled',
  disabled: true,
}
