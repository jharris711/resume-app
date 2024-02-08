import * as z from 'zod';

export const WorkHistoryValidation = z.object({
  job_title: z.string().max(30).min(2),
  company_name: z.string().max(30).min(2),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  job_description: z.string().max(800).optional(),
  location: z.string().max(30).min(2).optional()
});
