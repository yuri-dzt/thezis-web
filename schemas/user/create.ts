import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(2, "Preencha seu nome").max(191, "Máximo de caractéres atingido"),
  email: z.string().min(2, "Preencha seu e-mail").email("E-mail inválido"),
  password: z.string().min(2, "Preencha sua senha").max(191, "Senha inválida"),
})

export type CreateUserSchemaType = z.infer<typeof createUserSchema>
