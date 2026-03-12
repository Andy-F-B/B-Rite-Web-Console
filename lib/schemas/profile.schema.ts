import { z } from 'zod'

export const profileUpdateSchema = z.object({
  name: z.string().max(255).optional(),
  avatar: z.union([z.string().url(), z.literal('')]).optional(),
})

export type ProfileUpdate = z.infer<typeof profileUpdateSchema>
