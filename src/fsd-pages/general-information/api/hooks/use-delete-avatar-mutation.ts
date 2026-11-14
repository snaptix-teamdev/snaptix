'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteAvatar } from '../api'
import type { GetProfileSettingsResponseDto } from '../dto'
import { USER_PROFILE_QUERY_KEY } from './use-get-profile-settings'

export const useDeleteAvatarMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAvatar,
    onSuccess: () => {
      queryClient.setQueryData<GetProfileSettingsResponseDto>(USER_PROFILE_QUERY_KEY, (profile) => {
        return profile ? { ...profile, avatarUrl: null } : profile
      })

      return queryClient.invalidateQueries({ queryKey: USER_PROFILE_QUERY_KEY })
    },
  })
}
