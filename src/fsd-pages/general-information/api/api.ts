import { baseFetch } from '@/shared/api/baseFetch/baseFetch'
import type {
  AddAvatarRequestDto,
  AddAvatarResponseDto,
  GetActiveDevicesResponseDto,
  GetGeoResponseDto,
  GetProfileSettingsResponseDto,
  GetUploadAvatarUrlRequestDto,
  GetUploadAvatarUrlResponseDto,
  UpdateProfileSettingsRequestDto,
} from './dto'

const SECURITY_DEVICES_URL = '/api/v1/security/devices'
const GEO_ITEMS_URL = '/api/v1/geo'
const PROFILE_SETTINGS_URL = '/api/v1/users/me/profile-settings'
const AVATAR_URL = `${PROFILE_SETTINGS_URL}/avatar`

export const getSecurityDevices = () => {
  return baseFetch<GetActiveDevicesResponseDto[]>(SECURITY_DEVICES_URL, { method: 'GET' })
}

export const terminateAllOtherSessions = () => {
  return baseFetch<Record<string, never>>(SECURITY_DEVICES_URL, { method: 'DELETE' })
}

export const terminateSessionByDeviceId = (deviceId: string) => {
  return baseFetch<Record<string, never>>(`${SECURITY_DEVICES_URL}/${deviceId}`, { method: 'DELETE' })
}

export const getGeoItems = (countryId?: number, regionId?: number) => {
  const params = new URLSearchParams()

  if (countryId) params.append('countryId', countryId.toString())
  if (regionId) params.append('regionId', regionId.toString())

  const queryString = params.toString() ? `?${params.toString()}` : ''

  return baseFetch<GetGeoResponseDto>(`${GEO_ITEMS_URL}${queryString}`, { method: 'GET' })
}

export const getProfileSettings = () => {
  return baseFetch<GetProfileSettingsResponseDto>(PROFILE_SETTINGS_URL, { method: 'GET' })
}

export const updateProfileSettings = (data: UpdateProfileSettingsRequestDto) => {
  return baseFetch<void>(PROFILE_SETTINGS_URL, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export const getAvatarUploadUrl = (data: GetUploadAvatarUrlRequestDto) => {
  return baseFetch<GetUploadAvatarUrlResponseDto>(`${AVATAR_URL}/get-upload-url`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const uploadAvatarFileToStorage = async (url: string, file: File): Promise<void> => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  })

  if (!response.ok) {
    throw new Error(`Avatar upload failed: ${response.status} ${response.statusText}`)
  }
}

export const confirmAvatarUpload = (fileId: string) => {
  return baseFetch<Record<string, never>>(`${AVATAR_URL}/${encodeURIComponent(fileId)}/confirm`, {
    method: 'POST',
  })
}

export const addAvatar = (data: AddAvatarRequestDto) => {
  return baseFetch<AddAvatarResponseDto>(`${PROFILE_SETTINGS_URL}/add-avatar`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const uploadAvatar = async (file: File): Promise<AddAvatarResponseDto> => {
  const mimeType = file.type as GetUploadAvatarUrlRequestDto['mimeType']
  const { fileId, url } = await getAvatarUploadUrl({
    fileName: file.name,
    mimeType,
    contentLengthBytes: file.size,
  })

  await uploadAvatarFileToStorage(url, file)
  await confirmAvatarUpload(fileId)

  return addAvatar({ fileId })
}

export const deleteAvatar = () => {
  return baseFetch<void>(AVATAR_URL, { method: 'DELETE' })
}
