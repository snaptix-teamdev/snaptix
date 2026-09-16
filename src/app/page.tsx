import s from './page.module.css'
import { SmallPost } from '@/entities/post/ui/small-post/SmallPost'
import { getLatestPostsServer, getRegisteredUsersCountServer } from '@/features/main-page-all-posts/api'
import { RegisteredUsersLabel } from '@/features/main-page-all-posts/ui/RegisteredUsersLabel'

// SSG + ISR: страница пререндерится на билде (где под сборки достаёт до бэкенда)
// и ревалидируется раз в 10 минут. В рантайме под отдаёт готовый HTML, не выходя
// в сеть. Локаль и авторизация — на клиенте (см. TranslationsProvider / AppShell).
export const revalidate = 600 // 10 минут (10 * 60)

const COUNTER_WIDTH = 6
const POSTS_PAGE_SIZE = 4

const formatCounter = (value: number): string[] =>
  Math.max(0, Math.trunc(value)).toString().padStart(COUNTER_WIDTH, '0').split('')

// Ошибки fetch намеренно не глушим: при недоступном бэкенде сборка упадёт (лучше,
// чем задеплоить пустую главную), а фоновая ISR-ревалидация провалится и Next
// сохранит последние удачные данные, а не перезапишет их пустотой.
export default async function MainPage() {
  const [{ posts }, { registeredUsersCount }] = await Promise.all([
    getLatestPostsServer(POSTS_PAGE_SIZE),
    getRegisteredUsersCountServer(),
  ])

  const counterDigits = formatCounter(registeredUsersCount)

  return (
    <section className={s.content}>
      <section className={s.counter}>
        <RegisteredUsersLabel />
        <div className={s.digits}>
          {counterDigits.map((digit, i) => (
            <h2 key={i} className={s.digit}>
              {digit}
            </h2>
          ))}
        </div>
      </section>
      <section className={s.posts}>
        {posts.map((post) => (
          <SmallPost key={post.id} {...post} />
        ))}
      </section>
    </section>
  )
}
