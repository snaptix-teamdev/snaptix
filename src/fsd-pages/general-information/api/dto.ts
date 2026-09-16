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
