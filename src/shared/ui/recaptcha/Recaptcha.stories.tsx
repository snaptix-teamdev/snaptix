import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Recaptcha } from './Recaptcha'
import { RecaptchaProps } from '@/src/shared/ui/recaptcha/Recaptcha.types'

const meta = {
  title: 'UI/Recaptcha',
  component: Recaptcha,
  tags: ['autodocs'],
  parameters: {},
  args: {
    checked: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Recaptcha>

export const Default = (args: RecaptchaProps) => <Recaptcha {...args} />
Default.args = {
  isChecked: false,
  isError: false,
  isExpired: false,
  isLoading: false,
}
export const Checked = (args: RecaptchaProps) => <Recaptcha {...args} />
Checked.args = {
  isChecked: true,
  isError: false,
  isExpired: false,
  isLoading: false,
}

export const Error = (args: RecaptchaProps) => <Recaptcha {...args} />
Error.args = {
  isChecked: false,
  isError: true,
  isExpired: false,
  isLoading: false,
}

export const Loading = (args: RecaptchaProps) => <Recaptcha {...args} />
Loading.args = {
  isLoading: true,
}
