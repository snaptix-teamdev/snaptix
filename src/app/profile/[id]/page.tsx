import { Profile } from '@/fsd-pages/profile'

export default async function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <Profile key={id} userId={id} />
}
