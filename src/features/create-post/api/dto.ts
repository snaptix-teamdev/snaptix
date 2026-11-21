export type GetUploadUrlRequestDto = {
  fileName: string
  mimeType: 'image/jpeg' | 'image/png'
  contentLengthBytes: number
}

export type GetUploadUrlResponseDto = {
  fileId: string
  url: string
}

export type CreatePostRequestDto = {
  description: string
  media: Array<{ fileId: string }>
}

export type CreatePostResponseDto = {
  id: string
  description: string | null
  media: Array<{ mediaId: string; url: string }>
  updatedAt: string
  createdAt: string
}
