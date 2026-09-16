'use client'

import { useCallback, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { Point, Area } from 'react-easy-crop'
import { uploadPostPhoto, createPost } from '../api'
import { revalidateHomePostsAction } from '@/features/main-page-all-posts/api/revalidate'

export type WizardStep = 'upload' | 'crop' | 'filters' | 'description'

export type PhotoItem = {
  id: string
  originalSrc: string
  croppedSrc: string | null
  crop: Point
  zoom: number
  croppedAreaPixels: Area | null
  filterId: string
}

const MAX_PHOTOS = 10
const MAX_SIZE_MB = 20
const ALLOWED_TYPES = ['image/jpeg', 'image/png']

const STEPS: WizardStep[] = ['upload', 'crop', 'filters', 'description']

const createPhotoItem = (file: File): PhotoItem => ({
  id: `photo-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  originalSrc: URL.createObjectURL(file),
  croppedSrc: null,
  crop: { x: 0, y: 0 },
  zoom: 1,
  croppedAreaPixels: null,
  filterId: 'normal',
})

export const useCreatePostWizard = (onClose: () => void) => {
  const queryClient = useQueryClient()
  const [step, setStep] = useState<WizardStep>('upload')
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [description, setDescription] = useState('')
  const [isCloseConfirmOpen, setIsCloseConfirmOpen] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_SIZE_MB * 1024 * 1024 || !ALLOWED_TYPES.includes(file.type.toLowerCase())) {
      return 'The photo must be less than 20 Mb and have JPEG or PNG format'
    }
    return null
  }

  const addPhoto = useCallback(
    (file: File): boolean => {
      const error = validateFile(file)
      if (error) {
        setUploadError(error)
        return false
      }
      if (photos.length >= MAX_PHOTOS) return false
      setPhotos((prev) => [...prev, createPhotoItem(file)])
      return true
    },
    [photos.length],
  )

  const removePhoto = useCallback((id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id))
    setCurrentPhotoIndex((prev) => Math.max(0, prev - 1))
  }, [])

  const updateCrop = useCallback((id: string, crop: Point) => {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, crop } : p)))
  }, [])

  const updateZoom = useCallback((id: string, zoom: number) => {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, zoom } : p)))
  }, [])

  const updateCroppedAreaPixels = useCallback((id: string, pixels: Area) => {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, croppedAreaPixels: pixels } : p)))
  }, [])

  const setPhotoFilter = useCallback((id: string, filterId: string) => {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, filterId } : p)))
  }, [])

  const setCroppedSrc = useCallback((id: string, src: string) => {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, croppedSrc: src } : p)))
  }, [])

  const doReset = useCallback(() => {
    setPhotos((prev) => {
      prev.forEach((p) => {
        URL.revokeObjectURL(p.originalSrc)
        if (p.croppedSrc?.startsWith('blob:')) URL.revokeObjectURL(p.croppedSrc)
      })
      return []
    })
    setStep('upload')
    setCurrentPhotoIndex(0)
    setDescription('')
    setIsCloseConfirmOpen(false)
    setIsPublishing(false)
    setUploadError(null)
  }, [])

  const requestClose = useCallback(
    (hasPhotos: boolean) => {
      if (hasPhotos) {
        setIsCloseConfirmOpen(true)
      } else {
        doReset()
        onClose()
      }
    },
    [doReset, onClose],
  )

  const goNext = useCallback(() => {
    const idx = STEPS.indexOf(step)
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1])
  }, [step])

  const goBack = useCallback(
    (hasPhotos: boolean) => {
      const idx = STEPS.indexOf(step)
      if (idx > 1) {
        setStep(STEPS[idx - 1])
      } else if (idx === 1) {
        requestClose(hasPhotos)
      }
    },
    [step, requestClose],
  )

  const confirmClose = useCallback(() => {
    setIsCloseConfirmOpen(false)
    doReset()
    onClose()
  }, [doReset, onClose])

  const publish = useCallback(async () => {
    setIsPublishing(true)
    try {
      const uploadResults = await Promise.all(
        photos.map((p) => {
          const src = p.croppedSrc ?? p.originalSrc
          return fetch(src)
            .then((r) => r.blob())
            .then((blob) => uploadPostPhoto(new File([blob], 'photo.jpg', { type: 'image/jpeg' })))
        }),
      )
      await createPost({
        description,
        media: uploadResults.map((r) => ({ fileId: r.fileId })),
      })
      queryClient.invalidateQueries({ queryKey: ['posts', 'my'] })
      await revalidateHomePostsAction()
      doReset()
      onClose()
    } finally {
      setIsPublishing(false)
    }
  }, [photos, description, doReset, onClose, queryClient])

  return {
    step,
    photos,
    currentPhotoIndex,
    description,
    isCloseConfirmOpen,
    isPublishing,
    uploadError,
    addPhoto,
    removePhoto,
    setCurrentPhoto: setCurrentPhotoIndex,
    updateCrop,
    updateZoom,
    updateCroppedAreaPixels,
    setPhotoFilter,
    setCroppedSrc,
    setDescription,
    goNext,
    goBack,
    requestClose,
    confirmClose,
    closeCloseConfirm: () => setIsCloseConfirmOpen(false),
    clearUploadError: () => setUploadError(null),
    publish,
  }
}
