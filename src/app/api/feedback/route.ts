import { feedbackSchema } from '@/lib/validationSchema'
import { writeClient } from '@/sanity/lib/client-write'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // Validate input using zod
    const validation = feedbackSchema.safeParse(data)
    if (!validation.success) {
      return NextResponse.json(
        { message: 'Invalid form data', errors: validation.error.format() },
        { status: 400 },
      )
    }

    // Submit the feedback to Sanity
    await writeClient.create({
      _type: 'feedbacks',
      ...validation.data,
    })

    return NextResponse.json({ message: 'Feedback submitted successfully!' })
  } catch (error) {
    console.error('Error submitting feedback:', error)
    return NextResponse.json(
      { message: 'Error submitting feedback.....' },
      { status: 500 },
    )
  }
}
