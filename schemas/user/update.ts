import { z } from 'zod'

export const updateUserSchema = z.object({
  user_id: z.string(),
  name: z.string().min(2, "Preencha seu nome").max(191, "Máximo de caractéres atingido").optional(),
  email: z.string().email("E-mail inválido").optional(),
  role: z.string().optional(),
})

export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>
