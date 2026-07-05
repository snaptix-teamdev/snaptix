import { baseFetch } from '@/shared/api/baseFetch/baseFetch'
import { CreateNewPasswordRequest, ForgotPasswordRequest } from './dto'

export const forgotPasswordApi = {
  async forgotPassword(data: ForgotPasswordRequest) {
    return baseFetch<Record<string, never>>('/api/v1/auth/password/forgot', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async createNewPassword(data: CreateNewPasswordRequest) {
    return baseFetch<Record<string, never>>('/api/v1/auth/password/reset', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
}
