'use client'

import s from './SignIn.module.css'
import { SignInForm } from '@/widgets/sign-in-form'

export const SignIn = () => {
  return (
    <div className={s.container}>
      <SignInForm />
    </div>
  )
}
