'use client'

import { CreateNewPasswordForm } from '@/widgets/create-new-password-form'
import { ForgotPasswordForm } from '@/widgets/forgot-password-form'
import s from './ForgotPassword.module.css'

export const ForgotPassword = () => {
  return (
    <div className={s.container}>
      <ForgotPasswordForm />
    </div>
  )
}

export const CreateNewPassword = () => {
  return (
    <div className={s.container}>
      <CreateNewPasswordForm />
    </div>
  )
}
