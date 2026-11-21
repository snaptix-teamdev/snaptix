export type GetActiveDevicesResponseDto = {
  ip: string | null
  title: string
  lastActiveDate: string
  deviceId: string
  isCurrent: boolean
}

export type GeoItem = {
  id: number
  name: string
}

export type GetGeoResponseDto = {
  result: GeoItem[]
}

export type UpdateProfileSettingsRequestDto = {
  username: string
  firstName: string
  lastName: string
  birthDate: string | null
  aboutMe: string | null
  countryId: number | null
  regionId: number | null
  cityId: number | null
}

export type GetProfileSettingsResponseDto = {
  userId: string
  username: string
  firstName: string
  lastName: string
  avatarUrl: string | null
  birthDate: string | null
  aboutMe: string | null
  country: GeoItem | null
  region: GeoItem | null
  city: GeoItem | null
}

export type AvatarMimeType = 'image/jpeg' | 'image/png'

export type GetUploadAvatarUrlRequestDto = {
  fileName: string
  mimeType: AvatarMimeType
  contentLengthBytes: number
}

export type GetUploadAvatarUrlResponseDto = {
  fileId: string
  url: string
}

export type AddAvatarRequestDto = {
  fileId: string
}

export type AddAvatarResponseDto = {
  avatarUrl: string
}
