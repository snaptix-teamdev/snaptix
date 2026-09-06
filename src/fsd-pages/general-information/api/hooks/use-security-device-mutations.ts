'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SECURITY_DEVICES_QUERY_KEY } from './use-security-devices-query'
import { terminateAllOtherSessions, terminateSessionByDeviceId } from '../api'

export const useTerminateAllOtherSessionsMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: terminateAllOtherSessions,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: SECURITY_DEVICES_QUERY_KEY })
    },
  })
}

export const useTerminateSessionByDeviceIdMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: terminateSessionByDeviceId,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: SECURITY_DEVICES_QUERY_KEY })
    },
  })
}
