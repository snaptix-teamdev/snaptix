import { getPostByIdServer } from '@/entities/post/api'
import { PostViewModal } from '@/widgets/post-view-modal'
import { ProfileModalActions } from './ProfileModalActions'

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ postId?: string; action?: string }>
}

export default async function ProfileModal({ params, searchParams }: Props) {
  const { id } = await params
  const { postId, action } = await searchParams

  // Просмотр поста: контент доступен всем — рендерим через SSR сразу.
  if (postId && !action) {
    const post = await getPostByIdServer(postId)
    if (!post) return null
    return <PostViewModal post={post} authorId={id} />
  }

  // Остальные модалки (создание/выход) и нормализация URL — на клиенте.
  return <ProfileModalActions id={id} postId={postId} action={action} />
}
