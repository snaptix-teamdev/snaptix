import z from 'zod'

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(30, 'Maximum number of characters 30')
      .regex(/^[A-Za-z0-9_-]+$/, 'Only 0-9 A-Z a-z _ - allowed'),
    email: z.email('The email must match the format example@example.com'),
    password: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(20, 'Maximum number of characters 20')
      .regex(/[0-9]/, 'Password must contain at least one digit')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(
        /^[A-Za-z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~]+$/,
        'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ { | } ~',
      ),
    confirmPassword: z.string(),
    agree: z.boolean().refine((val) => val === true, {
      message: 'You must agree to terms',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  })

export type SignUpFormValues = z.infer<typeof signUpSchema>
