export const getPostCreatedTime = (date: string) => {
  const postDate = new Date(date).getTime()
  const now = new Date().getTime()
  const diffInMs = now - postDate

  // Преобразуем мс в минуты
  const minutes = Math.floor(diffInMs / (1000 * 60))

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} min ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hours ago`

  // Если больше суток — детерминированный формат DD.MM.YYYY,
  // не зависящий от локали окружения (иначе ошибка гидрации server/client)
  const d = new Date(date)
  const day = String(d.getUTCDate()).padStart(2, '0')
  const month = String(d.getUTCMonth() + 1).padStart(2, '0')
  const year = d.getUTCFullYear()
  return `${day}.${month}.${year}`
}
