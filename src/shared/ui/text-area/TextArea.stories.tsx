import type { Meta } from '@storybook/nextjs-vite'
import { TextArea } from './TextArea'
import type { TextAreaProps } from './TextArea.types'

const meta: Meta<typeof TextArea> = {
  title: 'UI/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta

export const Default = (args: TextAreaProps) => <TextArea {...args} />
Default.args = {
  placeholder: 'Text-area',
}

export const TextAreaWithBigTextLength = (args: TextAreaProps) => <TextArea {...args} />
TextAreaWithBigTextLength.args = {
  placeholder:
    'Замыкание — это способность функции запоминать и иметь доступ к переменным из своей внешней (лексической) области видимости, даже после того как внешняя функция завершила выполнение',
}

export const WithError = (args: TextAreaProps) => <TextArea {...args} />
WithError.args = {
  placeholder: 'Text-area',
  error: 'Error text',
}

export const DisabledTextArea = (args: TextAreaProps) => <TextArea {...args} />
DisabledTextArea.args = {
  placeholder: 'Text-area',
  disabled: true,
}
