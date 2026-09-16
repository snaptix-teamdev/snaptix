'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/button/Button'
import { Input } from '@/shared/ui/input/Input'
import { useConfirmRegistrationMutation } from '@/fsd-pages/congratulations/api/hooks/use-confirm-registration-mutation'
import { useResendVerificationMutation } from '@/fsd-pages/congratulations/api/hooks/use-resend-verification-mutation'
import s from './Congratulations.module.css'

type Status = 'loading' | 'success' | 'expired' | 'error'

export const Congratulations = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<Status>('loading')
  const [email, setEmail] = useState('')

  const code = searchParams.get('code')
  const hasConfirmedRef = useRef(false)

  const { mutate: confirm } = useConfirmRegistrationMutation({
    onSuccess: () => {
      setStatus('success')
    },
    onError: (error) => {
      const errStatus = error?.errors?.[0]?.status
      if (errStatus === 404 || errStatus === 400) {
        setStatus('expired')
      } else {
        setStatus('error')
      }
    },
  })

  const { mutate: resend, isPending: isResending } = useResendVerificationMutation({
    onSuccess: () => {
      setStatus('loading')
    },
    onError: () => {
      setStatus('error')
    },
  })

  useEffect(() => {
    if (!code) {
      // Статус зависит от наличия кода подтверждения из URL, доступного на
      // клиенте после монтирования; выставляем в эффекте намеренно.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus('error')
      return
    }
    if (hasConfirmedRef.current) return
    hasConfirmedRef.current = true
    confirm({ code })
  }, [code, confirm])

  const handleResend = () => {
    if (!email) return
    resend({ email })
  }

  if (status === 'loading') {
    return (
      <div className={s.container}>
        <p>Verifying your email...</p>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className={s.container}>
        <div className={s.card}>
          <h2 className={s.title}>Congratulations!</h2>
          <p className={s.description}>Your email has been confirmed</p>
          <Button variant={'primary'} onClick={() => router.push('/signIn')}>
            Sign In
          </Button>
          <Image
            className={s.image}
            src="/img/email-confirmed.png"
            alt="Email confirmed"
            width={432}
            height={300}
            priority
          />
        </div>
      </div>
    )
  }

  if (status === 'expired') {
    return (
      <div className={s.container}>
        <div className={s.card}>
          <h2 className={s.title}>Email verification link expired</h2>
          <p className={s.description}>
            Looks like the verification link has expired. Not to worry, we can send the link again
          </p>
          <Input
            label="Email"
            type="email"
            placeholder="Epam@epam.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant={'primary'} onClick={handleResend} disabled={isResending || !email}>
            {isResending ? 'Sending...' : 'Resend verification link'}
          </Button>
          <Image
            className={s.image}
            src="/img/rafiki.png"
            alt="Verification link expired"
            width={300}
            height={240}
            priority
          />
        </div>
      </div>
    )
  }

  return (
    <div className={s.container}>
      <div className={s.card}>
        <h2 className={s.title}>Something went wrong</h2>
        <p className={s.description}>The verification link is invalid.</p>
        <Button variant={'primary'} onClick={() => router.push('/signup')}>
          Go to Sign Up
        </Button>
      </div>
    </div>
  )
}
