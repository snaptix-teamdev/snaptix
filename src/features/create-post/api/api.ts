import { baseFetch } from '@/shared/api/baseFetch/baseFetch'
import type {
  CreatePostRequestDto,
  CreatePostResponseDto,
  GetUploadUrlRequestDto,
  GetUploadUrlResponseDto,
} from './dto'

export const getPhotoUploadUrl = (data: GetUploadUrlRequestDto) => {
  return baseFetch<GetUploadUrlResponseDto>('/api/v1/posts/photo/get-upload-url', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const confirmPhotoUpload = (fileId: string) => {
  return baseFetch<Record<string, never>>(`/api/v1/posts/photo/${fileId}/confirm`, {
    method: 'POST',
  })
}

const putFileToPresignedUrl = async (url: string, file: File): Promise<void> => {
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  })
  if (!res.ok) {
    throw new Error(`S3 upload failed: ${res.status} ${res.statusText}`)
  }
}

export const uploadPostPhoto = async (file: File): Promise<{ fileId: string }> => {
  const mimeType = file.type as GetUploadUrlRequestDto['mimeType']
  const { fileId, url } = await getPhotoUploadUrl({
    fileName: file.name,
    mimeType,
    contentLengthBytes: file.size,
  })
  await putFileToPresignedUrl(url, file)
  await confirmPhotoUpload(fileId)
  return { fileId }
}

export const createPost = (data: CreatePostRequestDto) => {
  return baseFetch<CreatePostResponseDto>('/api/v1/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
