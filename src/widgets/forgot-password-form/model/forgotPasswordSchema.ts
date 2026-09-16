import z from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.email('The email must match the format example@example.com'),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
