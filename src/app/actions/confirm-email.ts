'use server'

export type ConfirmEmailResult = {
  success: boolean
  alreadyConfirmed?: boolean
  error?: string
}

export async function confirmEmailAction(data: { confirmationCode: string }): Promise<ConfirmEmailResult> {
  const res = await fetch('https://snaptix.ru/api/v1/auth/registration-confirmation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: data.confirmationCode,
    }),
  })

  const responseData = await res.json()

  if (!res.ok) {
    if (responseData.errors) {
      const errorMessage = responseData.errors[0]?.message || ''

      if (errorMessage.includes('already confirmed')) {
        return {
          success: true,
          alreadyConfirmed: true,
        }
      }

      return {
        success: false,
        error: errorMessage || 'Ошибка подтверждения',
      }
    }

    return {
      success: false,
      error: 'Неизвестная ошибка',
    }
  }

  return {
    success: true,
    alreadyConfirmed: false,
  }
}
