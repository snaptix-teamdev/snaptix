'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStatus } from '@/shared/api/auth'

export default function ProfilePage() {
  const router = useRouter()
  const { user, isLoading } = useAuthStatus()
  const userId = user?.id

  useEffect(() => {
    if (isLoading) return
    router.replace(userId ? `/profile/${userId}` : '/')
  }, [isLoading, router, userId])

  return null
}
