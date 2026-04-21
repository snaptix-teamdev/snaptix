export type ConfirmEmailRequestDto = {
  code: string
}

export type ConfirmEmailResponseDto = {
  success: boolean
}

export type ConfirmEmailErrorDto = {
  message: 'LINK_EXPIRED' | 'LINK_INVALID' | (string & {})
}

export type ResendVerificationRequestDto = {
  email: string
}

export type ResendVerificationResponseDto = {
  success: boolean
}
