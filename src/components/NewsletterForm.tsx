'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

function NewsletterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.status === 409) {
        toast.error('This email is already subscribed!')
        return
      }

      if (!response.ok) {
        throw new Error('Failed to subscribe')
      }

      toast.success('Thank you for subscribing!')
    } catch (error) {
      console.error('Error:', error)
      toast.error('Something went wrong. Please try again later.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
        Sign up for our newsletter
      </h2>
      <p className="mt-4 text-sm text-neutral-700">
        Subscribe to get the latest design news, articles, resources and
        inspiration.
      </p>
      <div className="relative mt-6">
        <input
          {...register('email')}
          type="email"
          placeholder="Email address"
          autoComplete="email"
          aria-label="Email address"
          className={`block w-full rounded-2xl border ${
            errors.email ? 'border-red-500' : 'border-neutral-300'
          } bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5`}
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="submit"
            aria-label="Submit"
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? '...' : '→'}
          </button>
        </div>
      </div>
      {errors.email && (
        <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
      )}
    </form>
  )
}

export default NewsletterForm
