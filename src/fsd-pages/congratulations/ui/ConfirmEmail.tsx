'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/button/Button'
import { Input } from '@/shared/ui/input/Input'
import { useConfirmEmailMutation } from '@/fsd-pages/congratulations/api/hooks/use-confirm-email-mutation'
import { useResendVerificationMutation } from '@/fsd-pages/congratulations/api/hooks/use-resend-verification-mutation'
import s from './ConfirmEmail.module.css'

type Status = 'loading' | 'success' | 'expired' | 'invalid' | 'error'

export const ConfirmEmail = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<Status>('loading')
  const [email, setEmail] = useState('')

  const code = searchParams.get('code')

  const { mutate: confirm } = useConfirmEmailMutation({
    onSuccess: (data) => {
      if (data.alreadyConfirmed) {
        setStatus('success')
      } else {
        setStatus('success')
      }
    },
    onError: (error) => {
      const errorMessage = error.toLowerCase()
      if (errorMessage.includes('expired') || errorMessage.includes('link_expired')) {
        setStatus('expired')
      } else if (errorMessage.includes('invalid') || errorMessage.includes('link_invalid')) {
        setStatus('invalid')
      } else {
        setStatus('error')
      }
    },
  })

  const { mutate: resend, isPending: isResending } = useResendVerificationMutation({
    onSuccess: () => {
      alert('Verification link has been sent to your email')
    },
    onError: (error) => {
      console.error('Failed to resend:', error)
      alert('Failed to send verification link. Please try again.')
    },
  })

  useEffect(() => {
    if (!code) {
      setStatus('invalid')
      return
    }
    confirm({ confirmationCode: code })
  }, [code, confirm])

  const handleResend = () => {
    if (!email) return
    resend({ email })
  }

  const handleGoToSignIn = () => {
    router.push('/sign-in')
  }

  const handleGoToSignUp = () => {
    router.push('/sign-up')
  }

  if (status === 'loading') {
    return (
      <div className={s.container}>
        <div className={s.card}>
          <h2 className={s.title}>Verifying your email...</h2>
          <p className={s.description}>Please wait while we confirm your email address</p>
          <div className={s.loader}>Loading...</div>
        </div>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className={s.container}>
        <div className={s.card}>
          <h2 className={s.title}>Congratulations! 🎉</h2>
          <p className={s.description}>
            Your email has been successfully confirmed. You can now sign in to your account.
          </p>
          <Button variant={'primary'} onClick={handleGoToSignIn}>
            Sign In
          </Button>
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
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant={'primary'} onClick={handleResend} disabled={isResending || !email}>
            {isResending ? 'Sending...' : 'Resend verification link'}
          </Button>
          <Button variant={'outline'} onClick={handleGoToSignIn}>
            Back to Sign In
          </Button>
        </div>
      </div>
    )
  }

  if (status === 'invalid') {
    return (
      <div className={s.container}>
        <div className={s.card}>
          <h2 className={s.title}>Invalid verification link</h2>
          <p className={s.description}>The verification link you used is invalid or malformed.</p>
          <Button variant={'primary'} onClick={handleGoToSignUp}>
            Go to Sign Up
          </Button>
          <Button variant={'outline'} onClick={handleGoToSignIn}>
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={s.container}>
      <div className={s.card}>
        <h2 className={s.title}>Something went wrong</h2>
        <p className={s.description}>The verification link is invalid.</p>
        <Button variant={'primary'} onClick={() => router.push('/sign-up')}>
          Go to Sign Up
        </Button>
        <Button variant={'outline'} onClick={handleGoToSignIn}>
          Sign In
        </Button>
      </div>
    </div>
  )
}
