type RecaptchaAction = 'password_forgot'

type Grecaptcha = {
  ready: (callback: () => void) => void
  execute: (siteKey: string, options: { action: RecaptchaAction }) => Promise<string>
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha
  }
}

let scriptPromise: Promise<void> | null = null

const loadRecaptchaScript = (siteKey: string) => {
  if (window.grecaptcha) {
    return Promise.resolve()
  }

  if (scriptPromise) {
    return scriptPromise
  }

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')

    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Google reCAPTCHA script'))

    document.head.appendChild(script)
  })

  return scriptPromise
}

export const executeRecaptcha = async (action: RecaptchaAction) => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  if (!siteKey) {
    throw new Error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not defined')
  }

  await loadRecaptchaScript(siteKey)

  if (!window.grecaptcha) {
    throw new Error('Google reCAPTCHA is not available')
  }

  return new Promise<string>((resolve, reject) => {
    window.grecaptcha!.ready(() => {
      window.grecaptcha!.execute(siteKey, { action }).then(resolve).catch(reject)
    })
  })
}
