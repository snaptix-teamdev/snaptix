import React from 'react'
import { Input } from './Input'
import type { InputProps } from './Input.types'

const meta = {
  title: 'UI/Input',
  component: Input,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    type: { control: 'text' },
  },
}

export default meta

export const Default = (args: InputProps) => <Input {...args} />
Default.args = {
  label: 'Username',
  placeholder: 'Enter username',
  type: 'text',
  error: '',
}

export const WithError = (args: InputProps) => <Input {...args} />
WithError.args = {
  label: 'Email',
  placeholder: 'Enter email',
  type: 'text',
  error: 'Invalid email address',
}

export const Password = (args: InputProps) => <Input {...args} />
Password.args = {
  label: 'Password',
  placeholder: 'Enter password',
  type: 'password',
  rightIconClickable: true,
}

export const WithLeftIcon = (args: InputProps) => (
  <Input
    {...args}
    leftIcon={() => (
      <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
        <circle cx={12} cy={12} r={10} />
      </svg>
    )}
  />
)
WithLeftIcon.args = {
  label: 'Search',
  placeholder: 'Type something...',
  type: 'text',
}

// ---------------------------------------
// Input с правой иконкой (например toggle)
export const WithRightIcon = (args: InputProps) => (
  <Input
    {...args}
    rightIcon={() => (
      <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
        <circle cx={12} cy={12} r={10} />
      </svg>
    )}
    rightIconClickable={true}
  />
)
WithRightIcon.args = {
  label: 'Input with Right Icon',
  placeholder: 'Click the icon',
  type: 'text',
}
