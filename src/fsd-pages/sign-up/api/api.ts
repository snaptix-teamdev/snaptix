import { baseFetch } from '@/shared/api/baseFetch/baseFetch'
import { SignUpRequestDto, SignUpResponseDto } from '@/fsd-pages/sign-up/api/dto'

export const signUp = (data: SignUpRequestDto) => {
  return baseFetch<SignUpResponseDto>('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
