'use client'

import { SignUpForm } from '@/widgets/sign-up-form'
import s from './SignUp.module.css'

export const SignUp = () => {
  return (
    <div className={s.container}>
      <SignUpForm />
    </div>
  )
}
