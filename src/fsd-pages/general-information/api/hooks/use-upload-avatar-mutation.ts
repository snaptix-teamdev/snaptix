'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadAvatar } from '../api'
import type { GetProfileSettingsResponseDto } from '../dto'
import { USER_PROFILE_QUERY_KEY } from './use-get-profile-settings'

export const useUploadAvatarMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: uploadAvatar,
    onSuccess: ({ avatarUrl }) => {
      queryClient.setQueryData<GetProfileSettingsResponseDto>(USER_PROFILE_QUERY_KEY, (profile) => {
        return profile ? { ...profile, avatarUrl } : profile
      })

      return queryClient.invalidateQueries({ queryKey: USER_PROFILE_QUERY_KEY })
    },
  })
}
