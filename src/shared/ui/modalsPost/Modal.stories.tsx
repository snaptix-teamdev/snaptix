import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Modal } from './Modal'
import { Button } from '@/shared/ui/button/Button'

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Modal>

/* ---- Вспомогательный компонент-обёртка ---- */

function ModalDemo({
  size,
  title,
  children,
  footer,
}: {
  size?: 'sm' | 'md' | 'lg'
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  const [open, setOpen] = useState(true)

  return (
    <>
      <button onClick={() => setOpen(true)}>Открыть модалку</button>
      <Modal open={open} onOpenChangeAction={setOpen} title={title} size={size} footer={footer}>
        {children}
      </Modal>
    </>
  )
}

/* ---- Стори ---- */

/** Информационное модальное окно с одной кнопкой */
export const EmailSent: Story = {
  render: () => (
    <ModalDemo
      title="Email sent"
      footer={
        <Button variant={'primary'} type={'button'} width={'auto'}>
          {'OK'}
        </Button>
      }
    >
      <p style={{ margin: 0 }}>We have sent a link to confirm your email to epam@epam.com</p>
    </ModalDemo>
  ),
}

/** Модальное окно подтверждения с двумя кнопками */
export const Confirmation: Story = {
  render: () => (
    <ModalDemo
      title="Delete item?"
      footer={
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant={'ghost'} type={'button'}>
            {'Cansel'}
          </Button>
          <Button variant={'primary'} type={'button'} width={'auto'}>
            {'Delete'}
          </Button>
        </div>
      }
    >
      <p style={{ margin: 0 }}>This action cannot be undone. Are you sure you want to continue?</p>
    </ModalDemo>
  ),
}

/** Средний размер модалки */
export const MediumSize: Story = {
  render: () => (
    <ModalDemo title="Terms of Service" size="md">
      <p style={{ margin: 0 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>
    </ModalDemo>
  ),
}

/** Большой размер модалки — для форм, таблиц и т.д. */
export const LargeSize: Story = {
  render: () => (
    <ModalDemo title="Settings" size="lg">
      <p style={{ margin: 0 }}>
        A wider modal for content that needs more horizontal space — forms, tables, side-by-side layouts, etc.
      </p>
    </ModalDemo>
  ),
}
