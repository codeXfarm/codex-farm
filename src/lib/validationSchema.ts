import { z } from 'zod'

export const InquirySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  budget: z.string().min(1, 'Budget selection is required'),
})

export type InquiryData = z.infer<typeof InquirySchema>

export const feedbackSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(2, 'Message is required'),
})

export type FeedbackFormData = z.infer<typeof feedbackSchema>
