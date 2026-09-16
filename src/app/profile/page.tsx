import { redirect } from 'next/navigation'

export default function ProfilePage() {
  const isAuth = true
  const currentUserId = 123

  if (isAuth) {
    redirect(`/profile/${currentUserId}`)
  }

  redirect(`/`)
}
