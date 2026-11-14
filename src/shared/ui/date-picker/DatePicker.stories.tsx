import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { addDays } from 'date-fns'
import { DatePicker } from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'UI/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'radio',
      options: ['single', 'range'],
    },
    locale: {
      control: 'radio',
      options: ['ru', 'en'],
    },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    errorText: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof DatePicker>

const today = new Date()
const nextWeek = addDays(today, 7)

export const DatePickerDefault: Story = {
  args: {
    mode: 'single',
    locale: 'ru',
  },
}

export const DatePickerRangeWithValue: Story = {
  args: {
    mode: 'range',
    value: { from: today, to: nextWeek },
    locale: 'ru',
  },
}
