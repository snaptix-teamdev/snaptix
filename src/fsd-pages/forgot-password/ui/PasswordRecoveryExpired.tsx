'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PASSWORD_RECOVERY_EMAIL_STORAGE_KEY } from '@/fsd-pages/forgot-password/model/constants'
import { useForgotPasswordMutation } from '@/fsd-pages/forgot-password/api/hooks/use-forgot-password-mutation'
import { executeRecaptcha } from '@/shared/lib/recaptcha/executeRecaptcha'
import { Button } from '@/shared/ui/button/Button'
import { Modal } from '@/shared/ui/modalsPost/Modal'
import s from './PasswordRecoveryExpired.module.css'

export const PasswordRecoveryExpired = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [recaptchaError, setRecaptchaError] = useState('')
  const [isRecaptchaPending, setIsRecaptchaPending] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { mutate, isPending } = useForgotPasswordMutation()

  useEffect(() => {
    // sessionStorage доступен только на клиенте после монтирования — читаем и
    // применяем в эффекте намеренно, чтобы не было рассинхрона гидрации.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmail(sessionStorage.getItem(PASSWORD_RECOVERY_EMAIL_STORAGE_KEY) ?? '')
  }, [])

  const handleResend = async () => {
    if (!email) {
      router.push('/forgot-password')
      return
    }

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
      { email, recaptchaToken },
      {
        onSuccess: () => {
          setIsModalOpen(true)
        },
        onSettled: () => {
          setIsRecaptchaPending(false)
        },
      },
    )
  }

  return (
    <div className={s.container}>
      <section className={s.card}>
        <h2 className={s.title}>Email verification link expired</h2>
        <p className={s.description}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>
        {recaptchaError && <p className={s.error}>{recaptchaError}</p>}
        <Button variant="primary" onClick={handleResend} disabled={isPending || isRecaptchaPending}>
          {isPending || isRecaptchaPending ? 'Sending...' : 'Resend link'}
        </Button>
        <Image
          className={s.image}
          src="/img/rafiki.png"
          alt="Password recovery link expired"
          width={300}
          height={240}
          priority
        />
      </section>

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
          <p className={s.modalText}>We have sent a link to confirm your email to {email}</p>
        </Modal>
      )}
    </div>
  )
}
