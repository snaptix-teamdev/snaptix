import s from './OAuthButtons.module.css'
import { GoogleIcon, GithubIcon } from '@/shared/ui/svg/Icon'

/**
 * Декоративные кнопки соц-входа (Google / GitHub) для Sign In / Sign Up.
 * Пока без обработчиков — нужны для соответствия дизайну. OAuth-логику добавим позже.
 */
export const OAuthButtons = () => (
  <div className={s.wrapper}>
    <button type="button" className={s.button} aria-label="Sign in with Google">
      <GoogleIcon />
    </button>
    <button type="button" className={s.button} aria-label="Sign in with GitHub">
      <GithubIcon />
    </button>
  </div>
)
