import { baseFetch } from '@/shared/api/baseFetch/baseFetch'
import {
  ConfirmRegistrationRequestDto,
  ConfirmRegistrationResponseDto,
  ResendVerificationRequestDto,
  ResendVerificationResponseDto,
} from '@/fsd-pages/congratulations/api/dto'

export const confirmRegistration = (data: ConfirmRegistrationRequestDto) => {
  return baseFetch<ConfirmRegistrationResponseDto>('/api/v1/auth/registration-confirmation', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const resendVerificationLink = (data: ResendVerificationRequestDto) => {
  return baseFetch<ResendVerificationResponseDto>('/api/v1/auth/resend-email-confirmation-code', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
