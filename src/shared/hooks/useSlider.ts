import { useState } from 'react'
import type { Media } from '@/entities/post/ui/Post.types'

type Props = {
  images: Array<Media>
}

export const useSlider = ({ images }: Props) => {
  const [currentImageId, setCurrentImageId] = useState(0)

  const hasMultipleImages = images?.length > 1

  const currentImageUrl = images?.[currentImageId]?.url || ''

  const prevImage = () => {
    if (currentImageId > 0) {
      setCurrentImageId((prev) => prev - 1)
    }
  }
  const nextImage = () => {
    if (currentImageId < images.length - 1) {
      setCurrentImageId((prev) => prev + 1)
    }
  }
  return { hasMultipleImages, currentImageUrl, currentImageId, prevImage, nextImage }
}
