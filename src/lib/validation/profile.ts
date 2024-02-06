import { z } from 'zod';

export const profileFormSchema = z.object({
  full_name: z
    .string()
    .min(4, {
      message: 'Username must be at least 2 characters.'
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.'
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.'
    })
    .email(),
  summary: z.string().max(160).optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  twitter: z.string().url().optional(),
  website: z.string().url().optional()
});
