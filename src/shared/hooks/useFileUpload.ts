import { useState } from 'react'

interface UseFileUploadProps {
  maxSizeInMB?: number
  allowedFormats?: string[]
}

interface UseFileUploadReturn {
  profilePhoto: string | null
  previewPhoto: string | null
  error: string | null
  setProfilePhoto: (photo: string | null) => void
  setPreviewPhoto: (photo: string | null) => void
  validateFile: (file: File) => boolean
  createPreview: (file: File) => boolean
  savePhoto: () => void
  cancelPreview: () => void
  clearError: () => void
}

export const useFileUpload = ({
  maxSizeInMB = 3,
  allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'],
}: UseFileUploadProps = {}): UseFileUploadReturn => {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const validateFile = (file: File): boolean => {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024

    if (file.size > maxSizeInBytes) {
      setError(`Photo size should not exceed ${maxSizeInMB} MB`)
      return false
    }

    const fileType = file.type.toLowerCase()

    if (!allowedFormats.includes(fileType)) {
      setError('The format of the uploaded photo must be PNG and JPEG')
      return false
    }

    setError(null)
    return true
  }

  const createPreview = (file: File): boolean => {
    if (!validateFile(file)) {
      return false
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewPhoto(reader.result as string)
      setError(null)
    }
    reader.readAsDataURL(file)
    return true
  }

  const savePhoto = (): void => {
    if (previewPhoto) {
      setProfilePhoto(previewPhoto)
      setPreviewPhoto(null)
      setError(null)
    }
  }

  const cancelPreview = (): void => {
    setPreviewPhoto(null)
    setError(null)
  }

  const clearError = (): void => {
    setError(null)
  }

  return {
    profilePhoto,
    previewPhoto,
    error,
    setProfilePhoto,
    setPreviewPhoto,
    validateFile,
    createPreview,
    savePhoto,
    cancelPreview,
    clearError,
  }
}
