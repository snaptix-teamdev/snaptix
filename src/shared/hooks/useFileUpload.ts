import { useState } from 'react'

interface UseFileUploadProps {
  validationErrorMessage: string
  maxSizeInMB?: number
  allowedFormats?: string[]
}

interface UseFileUploadReturn {
  selectedFile: File | null
  previewPhoto: string | null
  error: string | null
  createPreview: (file: File) => boolean
  cancelPreview: () => void
}

export const useFileUpload = ({
  validationErrorMessage,
  maxSizeInMB = 10,
  allowedFormats = ['image/jpeg', 'image/png'],
}: UseFileUploadProps): UseFileUploadReturn => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const validateFile = (file: File): boolean => {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024
    const fileType = file.type.toLowerCase()
    const hasValidSize = file.size <= maxSizeInBytes
    const hasValidFormat = allowedFormats.includes(fileType)

    if (!hasValidSize || !hasValidFormat) {
      setError(validationErrorMessage)
      return false
    }

    setError(null)
    return true
  }

  const createPreview = (file: File): boolean => {
    if (!validateFile(file)) {
      setSelectedFile(null)
      setPreviewPhoto(null)
      return false
    }

    setSelectedFile(file)

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewPhoto(reader.result as string)
      setError(null)
    }
    reader.readAsDataURL(file)
    return true
  }

  const cancelPreview = (): void => {
    setSelectedFile(null)
    setPreviewPhoto(null)
    setError(null)
  }

  return {
    selectedFile,
    previewPhoto,
    error,
    createPreview,
    cancelPreview,
  }
}
