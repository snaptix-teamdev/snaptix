import { Suspense } from 'react'
import { Congratulations } from '@/fsd-pages/congratulations'

export default function CongratulationsPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Congratulations />
    </Suspense>
  )
}
