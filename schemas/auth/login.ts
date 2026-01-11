import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(2, "Preencha seu e-mail").email("E-mail inválido"),
  password: z.string().min(2, "Preencha sua senha").max(191, "Senha inválida"),
})

export type LoginSchemaType = z.infer<typeof loginSchema>
