'use client'

import { useState } from 'react'
import { POST_FILTERS } from '../../model/filters'
import type { PhotoItem } from '../../model/useCreatePostWizard'
import { useMeQuery } from '@/shared/api/auth'
import s from './DescriptionStep.module.css'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'

const MAX_CHARS = 500

type Props = {
  photos: PhotoItem[]
  description: string
  onDescriptionChangeAction: (text: string) => void
}

export const DescriptionStep = ({ photos, description, onDescriptionChangeAction }: Props) => {
  const dict = useTranslations()
  const [currentIndex, setCurrentIndex] = useState(0)
  const { data: me } = useMeQuery()
  const current = photos[currentIndex]
  const src = current?.croppedSrc ?? current?.originalSrc
  const filter = POST_FILTERS.find((f) => f.id === current?.filterId) ?? POST_FILTERS[0]
  const isOver = description.length > MAX_CHARS

  if (!current) return null

  const avatarLetter = me?.username?.[0]?.toUpperCase() ?? 'U'
  const displayName = me?.username ?? dict.createPost.myProfile

  return (
    <div>
      <div className={s.layout}>
        <div className={s.photoPreview}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={dict.createPost.preview} className={s.photoImg} style={filter.style} />
        </div>

        <div className={s.form}>
          <div className={s.userRow}>
            <div className={s.avatar}>
              <div className={s.avatarPlaceholder}>{avatarLetter}</div>
            </div>
            <span className={s.username}>{displayName}</span>
          </div>

          <div className={s.fieldBlock}>
            <textarea
              className={s.textarea}
              value={description}
              onChange={(e) => onDescriptionChangeAction(e.target.value)}
              placeholder={dict.createPost.addDescription}
              maxLength={MAX_CHARS}
            />
            <span className={`${s.counter} ${isOver ? s.counterOver : ''}`}>
              {description.length}/{MAX_CHARS}
            </span>
          </div>
        </div>
      </div>

      {photos.length > 1 && (
        <div className={s.thumbnailStrip}>
          {photos.map((photo, idx) => {
            const thumbSrc = photo.croppedSrc ?? photo.originalSrc
            const photoFilter = POST_FILTERS.find((f) => f.id === photo.filterId) ?? POST_FILTERS[0]
            return (
              <button
                key={photo.id}
                className={`${s.thumbBtn} ${idx === currentIndex ? s.thumbBtnActive : ''}`}
                onClick={() => setCurrentIndex(idx)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumbSrc} alt="" className={s.thumbImg} style={photoFilter.style} />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
