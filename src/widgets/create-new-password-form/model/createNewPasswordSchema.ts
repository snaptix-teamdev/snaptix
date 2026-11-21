import z from 'zod'

export const createNewPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, 'Your password must be between 6 and 20 characters')
      .max(20, 'Your password must be between 6 and 20 characters'),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.newPassword === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'The password must match the new password',
  })

export type CreateNewPasswordFormValues = z.infer<typeof createNewPasswordSchema>
