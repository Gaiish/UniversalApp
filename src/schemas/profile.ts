import { z } from 'zod'

export const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().regex(/^[\d\s\-()+]+$/, 'Please enter a valid phone number'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  notifications: z.object({
    email: z.boolean().optional(),
    push: z.boolean().optional(),
    sms: z.boolean().optional(),
  }).optional(),
  preferences: z.object({
    currency: z.enum(['USD', 'EUR', 'GBP', 'CAD']).optional(),
    language: z.enum(['en', 'es', 'fr', 'de']).optional(),
  }).optional(),
})

export type ProfileFormData = z.infer<typeof profileSchema>