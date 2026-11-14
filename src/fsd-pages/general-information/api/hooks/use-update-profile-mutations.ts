'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfileSettings } from '@/fsd-pages/general-information/api'
import { USER_PROFILE_QUERY_KEY } from './use-get-profile-settings'

export const useUpdateProfileSettingsMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProfileSettings,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: USER_PROFILE_QUERY_KEY })
    },
  })
}
