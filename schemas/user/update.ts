import { z } from 'zod'

export const updateUserSchema = z.object({
  user_id: z.string(),
  name: z.string().min(2, "Preencha seu nome").max(191, "Máximo de caractéres atingido").optional(),
  email: z.string().min(2, "Preencha seu e-mail").email("E-mail inválido").optional(),
  password: z.string().min(2, "Preencha sua senha").max(191, "Senha inválida").optional(),
  role: z.enum(["user", "admin"]).optional(),
})

export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>
