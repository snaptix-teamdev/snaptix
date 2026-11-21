import { Suspense } from 'react'
import { CreateNewPassword } from '@/fsd-pages/forgot-password'

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CreateNewPassword />
    </Suspense>
  )
}
