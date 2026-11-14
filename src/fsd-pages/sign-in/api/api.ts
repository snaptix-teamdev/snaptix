import { baseFetch } from '@/shared/api/baseFetch/baseFetch'
import type { LoginRequestDto, LoginResponseDto } from '@/fsd-pages/sign-in/api/dto'

export const signIn = (data: LoginRequestDto) => {
  return baseFetch<LoginResponseDto>('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
