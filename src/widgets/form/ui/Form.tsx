'use client'
import { Input } from '@/src/shared/ui/Input/Input'
import { EyeIcon } from '@/src/shared/ui/svg/Icon'
import { Button } from '@/src/shared/ui/Button/Button'
import s from './Form.module.css'

export const Form = () => {
  return (
    <div className={s.container}>
      <h2>Sign Up</h2>
      <Input label="Username" type="text" placeholder="Username" />
      <Input label="Email" type="email" placeholder="Email" />
      <Input label="Password" rightIcon={EyeIcon} type="password" rightIconClickable={true} placeholder="Password" />
      <Input
        label="Password confirmation"
        type="password"
        rightIcon={EyeIcon}
        placeholder="Password confirmation"
        rightIconClickable={true}
      />
      <Button variant={'primary'}>Sign Up</Button>
      <p>Do you have an account?</p>
      <Button variant={'ghost'}>Sign In</Button>
    </div>
  )
}
