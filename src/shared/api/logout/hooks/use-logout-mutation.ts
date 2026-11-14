'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { logout } from '../logout'
import { clearAuthAction } from '@/app/actions/actions'

export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await clearAuthAction()
      queryClient.clear()
      router.push('/signIn')
      router.refresh()
    },
    onError: (error) => {
      console.error('Ошибка при выходе:', error)
    },
  })
}
