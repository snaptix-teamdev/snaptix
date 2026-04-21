// app/actions/resend-verification.ts
'use server'

export type ResendVerificationResult = {
  success: boolean
  error?: string
}

export async function resendVerificationAction(data: { email: string }): Promise<ResendVerificationResult> {
  try {
    const res = await fetch('https://snaptix.ru/api/v1/auth/resend-email-confirmation-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const responseData = await res.json()

    if (!res.ok) {
      let errorMessage = 'Failed to resend verification link'

      if (responseData.message) {
        errorMessage = responseData.message
      } else if (responseData.errors?.[0]?.message) {
        errorMessage = responseData.errors[0].message
      }

      return {
        success: false,
        error: errorMessage,
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    }
  }
}
