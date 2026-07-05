import type { ApiError } from '@/shared/api/baseFetch/baseFetch'

export const isRecoveryCodeError = (error: ApiError) => {
  return error.errors.some((item) => {
    const code = item.code?.toLowerCase() ?? ''
    const message = item.message?.toLowerCase() ?? ''
    const field = item.field?.toLowerCase() ?? ''
    const details = `${code} ${message} ${field}`

    const isCodeRelated =
      field === 'code' ||
      details.includes('code') ||
      details.includes('token') ||
      details.includes('link') ||
      details.includes('recovery') ||
      details.includes('reset')

    const isExpired = details.includes('expired') || code.includes('expire') || message.includes('expire')

    return isCodeRelated && isExpired
  })
}
