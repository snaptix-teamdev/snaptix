'use client'

import { useState, useEffect } from 'react'

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const authCookie = document.cookie.split('; ').find((row) => row.startsWith('isAuth='))

    const value = authCookie ? authCookie.split('=')[1] === 'true' : false

    // Куки доступны только на клиенте после монтирования — состояние применяем
    // в эффекте намеренно, чтобы SSR/гидрация совпадали (первый рендер — дефолт).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAuth(value)
    setIsLoading(false)
  }, [])

  return { isAuth, isLoading }
}
