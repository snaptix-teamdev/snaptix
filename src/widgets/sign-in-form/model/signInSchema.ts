import z from 'zod'

export const signInSchema = z.object({
  email: z.email('The email must match the format example@example.com'),
  password: z
    .string()
    .min(6, 'Minimum number of characters 6')
    .max(20, 'Maximum number of characters 20')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~]+$/,
      'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ { | } ~',
    ),
})

export type SignInFormValues = z.infer<typeof signInSchema>
