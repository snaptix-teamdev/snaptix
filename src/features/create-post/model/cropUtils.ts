import type { Area } from 'react-easy-crop'
import { POST_FILTERS } from './filters'

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', reject)
    img.setAttribute('crossOrigin', 'anonymous')
    img.src = url
  })

export const getCroppedImg = async (imageSrc: string, pixelCrop: Area): Promise<string> => {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) throw new Error('No 2d context')

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'))
        return
      }
      resolve(URL.createObjectURL(blob))
    }, 'image/jpeg')
  })
}

export const getPhotoFileForUpload = async (src: string, filterId: string): Promise<File> => {
  const sourceResponse = await fetch(src)
  if (!sourceResponse.ok) throw new Error('Could not read photo')

  const sourceBlob = await sourceResponse.blob()
  if (sourceBlob.type !== 'image/jpeg' && sourceBlob.type !== 'image/png') {
    throw new Error('Unsupported photo format')
  }

  const filter = POST_FILTERS.find((item) => item.id === filterId)
  if (!filter) throw new Error('Unknown photo filter')

  if (filterId === 'normal') {
    const extension = sourceBlob.type === 'image/png' ? 'png' : 'jpg'
    return new File([sourceBlob], `photo.${extension}`, { type: sourceBlob.type })
  }

  const image = await createImage(src)
  const canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight

  const context = canvas.getContext('2d')
  if (!context) throw new Error('No 2d context')

  context.filter = filter.style.filter ?? 'none'
  context.drawImage(image, 0, 0)

  const filteredBlob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Canvas is empty'))),
      sourceBlob.type,
    )
  })
  const extension = filteredBlob.type === 'image/png' ? 'png' : 'jpg'
  return new File([filteredBlob], `photo.${extension}`, { type: filteredBlob.type })
}
