import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, userEvent, within } from 'storybook/test'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TranslationsProvider } from '@/shared/lib/i18n/TranslationsProvider'
import type { Post } from '../Post.types'
import { DefaultPostModal } from './DefaultPostModal'

const post: Post = {
  id: 'post-1',
  description: 'Original description',
  media: [{ mediaId: 'photo-1', url: '/img/defaultPhoto.jpg' }],
  createdAt: '2026-10-01T12:00:00.000Z',
  updatedAt: '2026-10-01T12:00:00.000Z',
}

const queryClient = new QueryClient()
queryClient.setQueryData(['auth', 'me'], { id: 'owner-1', username: 'Author' })

const PostDemo = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <QueryClientProvider client={queryClient}>
      <TranslationsProvider>
        {isOpen && <DefaultPostModal post={post} userName="Author" onCloseAction={() => setIsOpen(false)} canManage />}
      </TranslationsProvider>
    </QueryClientProvider>
  )
}

const meta: Meta<typeof DefaultPostModal> = {
  title: 'Post/DefaultPostModal',
  component: DefaultPostModal,
  render: () => <PostDemo />,
}

export default meta
type Story = StoryObj<typeof DefaultPostModal>

export const EscapeKeepsUnsavedDescription: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('button', { name: '•••' }))
    await userEvent.click(canvas.getByRole('button', { name: /Редактировать|Edit Post/ }))

    const editor = canvasElement.querySelector('textarea')
    if (!editor) throw new Error('Description editor did not open')
    await userEvent.clear(editor)
    await userEvent.type(editor, 'Draft description')

    await userEvent.keyboard('{Escape}')
    await expect(canvas.getByText(/Закрыть пост|Close Post/)).toBeVisible()
    await expect(editor).toHaveValue('Draft description')

    await userEvent.keyboard('{Escape}')
    await expect(canvas.queryByText(/Закрыть пост|Close Post/)).not.toBeInTheDocument()
    await expect(editor).toHaveValue('Draft description')

    await userEvent.keyboard('{Escape}')
    await userEvent.click(canvas.getByRole('button', { name: /^(Нет|No)$/ }))
    await expect(editor).toHaveValue('Draft description')

    await userEvent.keyboard('{Escape}')
    await userEvent.click(canvas.getByRole('button', { name: /^(Да|Yes)$/ }))
    await expect(editor).not.toBeInTheDocument()
    await expect(canvas.getByText('Original description')).toBeVisible()

    await userEvent.keyboard('{Escape}')
    await expect(canvas.queryByText('Original description')).not.toBeInTheDocument()
  },
}
