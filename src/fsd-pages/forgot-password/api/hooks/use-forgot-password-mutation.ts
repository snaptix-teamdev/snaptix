import { useMutation } from '@tanstack/react-query'
import { forgotPasswordApi } from '../api'

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: forgotPasswordApi.forgotPassword,
  })
}
