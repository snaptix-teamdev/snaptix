'use client'

import s from './DeleteConfirmationCard.module.css'
import { Button } from '@/shared/ui/button/Button'
import Card from '@/shared/ui/card/Card'

interface DeleteConfirmationCardProps {
  isOpen: boolean
  onCloseAction: () => void
  onConfirmAction: () => void
}

export const DeleteConfirmationCard = ({ isOpen, onCloseAction, onConfirmAction }: DeleteConfirmationCardProps) => {
  return (
    <Card width={438} height={240} isOpen={isOpen} onCloseAction={onCloseAction} title="Delete Photo">
      <div className={s.deleteCardContainer}>
        <p className={s.deleteText}>Are you sure you want to delete this photo?</p>
        <div className={s.deleteActions}>
          <Button variant="outline" width="auto" onClick={onCloseAction}>
            No
          </Button>
          <Button variant="primary" width="auto" onClick={onConfirmAction}>
            Yes
          </Button>
        </div>
      </div>
    </Card>
  )
}
