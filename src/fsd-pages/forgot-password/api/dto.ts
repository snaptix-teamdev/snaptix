export type ForgotPasswordRequest = {
  email: string
  recaptchaToken: string
}

export type CreateNewPasswordRequest = {
  password: string
  code: string
}
