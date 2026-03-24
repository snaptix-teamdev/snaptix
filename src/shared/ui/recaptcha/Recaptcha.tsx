import styles from './Recaptcha.module.scss'
import { RecaptchaProps } from '@/src/shared/ui/recaptcha/Recaptcha.types'
import { CheckedIcon } from '@/src/shared/ui/svg/CheckedIcon'
import { RecaptchaLogo } from '@/src/shared/ui/svg/RecaptchaLogo'

const errorMessage = 'Please verify that you are not a robot'
const expiredMessage = 'Verification expired. Check the checkbox' + 'again.'

export const Recaptcha = ({ isChecked, isError, isLoading, isExpired }: RecaptchaProps) => {
  return (
    <div className={`${isError ? styles.errorWrapper : styles.none}`}>
      <div className={styles.mainContainer}>
        <div className={`${isExpired ? styles.expiredWrapper : styles.none}`}>
          {isExpired && <span className={styles.errorMessage}>{expiredMessage}</span>}
          <div className={styles.checkBoxContainer}>
            {isLoading ? (
              <div className={styles.spinner}></div>
            ) : isChecked ? (
              <CheckedIcon className={styles.checkBox} />
            ) : (
              <input type="checkbox" checked={isChecked} readOnly className={styles.checkBox} />
            )}
            <span className={styles.checkBoxText}>I’m not a robot</span>
          </div>
        </div>
        <div className={styles.recaptchaContainer}>
          <RecaptchaLogo className={styles.recaptchaLabel} />
          <span className={styles.recaptchaText}>reCAPTCHA</span>
          <span className={styles.recaptchaContainerText}>
            <span className={styles.link}>Privacy</span> - Terms
          </span>
        </div>
      </div>
      {isError && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  )
}
