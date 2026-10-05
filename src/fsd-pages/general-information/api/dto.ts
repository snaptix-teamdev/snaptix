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
  birthDate: string | null
  aboutMe: string | null
  country: GeoItem | null
  region: GeoItem | null
  city: GeoItem | null
}
