import { Suspense } from 'react'
import { ConfirmEmail } from '@/fsd-pages/confirm-email'

export default function ConfirmEmailPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ConfirmEmail />
    </Suspense>
  )
}
