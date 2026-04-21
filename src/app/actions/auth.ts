'use server'

import { baseFetch } from '@/shared/api/baseFetch/baseFetch'
import { SignUpRequestDto, SignUpResponseDto } from '@/fsd-pages/sign-up/api'

export async function signUpAction(data: SignUpRequestDto): Promise<SignUpResponseDto> {
  return baseFetch<SignUpResponseDto>('https://snaptix.ru/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
