'use client'

import Link from 'next/link'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { PASSWORD_RECOVERY_EMAIL_STORAGE_KEY } from '@/fsd-pages/forgot-password/model/constants'
import { useForgotPasswordMutation } from '@/fsd-pages/forgot-password/api/hooks/use-forgot-password-mutation'
import { executeRecaptcha } from '@/shared/lib/recaptcha/executeRecaptcha'
import { Button } from '@/shared/ui/button/Button'
import { Input } from '@/shared/ui/input/Input'
import { Modal } from '@/shared/ui/modalsPost/Modal'
import { ForgotPasswordFormValues, forgotPasswordSchema } from '../model/forgotPasswordSchema'
import s from './ForgotPasswordForm.module.css'

export const ForgotPasswordForm = () => {
  const [recaptchaError, setRecaptchaError] = useState('')
  const [isRecaptchaPending, setIsRecaptchaPending] = useState(false)
  const [sentEmail, setSentEmail] = useState('')
  const [, setSuccessCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    },
  })

  const { mutate, isPending, isSuccess } = useForgotPasswordMutation()

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setRecaptchaError('')
    setIsRecaptchaPending(true)

    let recaptchaToken = ''

    try {
      recaptchaToken = await executeRecaptcha('password_forgot')
    } catch {
      setRecaptchaError('reCAPTCHA verification failed. Please try again.')
      setIsRecaptchaPending(false)
      return
    }

    mutate(
      { email: data.email, recaptchaToken },
      {
        onSuccess: () => {
          sessionStorage.setItem(PASSWORD_RECOVERY_EMAIL_STORAGE_KEY, data.email)
          setSentEmail(data.email)
          setSuccessCount((count) => {
            const nextCount = count + 1

            if (nextCount > 1) {
              setIsModalOpen(true)
            }

            return nextCount
          })
        },
        onSettled: () => {
          setIsRecaptchaPending(false)
        },
      },
    )
  }

  return (
    <>
      <form className={s.card} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.content}>
          <h2 className={s.title}>Forgot Password</h2>

          <Input
            label="Email"
            type="email"
            placeholder="Epam@epam.com"
            autoComplete="email"
            {...register('email')}
            error={errors.email?.message}
          />

          <p className={s.hint}>Enter your email address and we will send you further instructions</p>

          {recaptchaError && <p className={s.recaptchaError}>{recaptchaError}</p>}
        </div>

        <div className={s.actions}>
          {isSuccess && (
            <div className={s.sentInfo}>
              <p className={s.sentText}>
                The link has been sent by email.
                <br />
                If you don&apos;t receive an email send link again
              </p>
            </div>
          )}

          <Button variant="primary" type="submit" disabled={!isValid || isPending || isRecaptchaPending}>
            {isPending || isRecaptchaPending ? 'Sending...' : isSuccess ? 'Send Link Again' : 'Send Link'}
          </Button>

          <Link className={s.backLink} href="/signIn">
            Back to Sign In
          </Link>
        </div>
      </form>

      {isModalOpen && (
        <Modal
          open={isModalOpen}
          title="Email sent"
          onOpenChangeAction={setIsModalOpen}
          footer={
            <Button
              variant="primary"
              onClick={() => {
                setIsModalOpen(false)
              }}
            >
              OK
            </Button>
          }
        >
          <p className={s.modalText}>We have sent a link to confirm your email to {sentEmail}</p>
        </Modal>
      )}
    </>
  )
}
