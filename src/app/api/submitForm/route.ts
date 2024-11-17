// app/api/submitForm/route.ts
import { InquirySchema } from '@/lib/validationSchema'
import { writeClient } from '@/sanity/lib/client-write'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate request body using Zod schema
    const validation = InquirySchema.safeParse(data)
    if (!validation.success) {
      return NextResponse.json(
        { message: 'Invalid form data', errors: validation.error.format() },
        { status: 400 },
      )
    }

    // Send validated data to Sanity
    await writeClient.create({
      _type: 'workInquiry',
      ...validation.data,
    })

    return NextResponse.json({ message: 'Inquiry submitted successfully!' })
  } catch (error) {
    console.error('Error submitting inquiry:', error)
    return NextResponse.json(
      { message: 'Error submitting inquiry' },
      { status: 500 },
    )
  }
}
