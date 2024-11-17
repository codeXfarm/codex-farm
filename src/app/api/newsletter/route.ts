import { client } from '@/sanity/lib/client'
import { writeClient } from '@/sanity/lib/client-write'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const validation = newsletterSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { message: 'Invalid email address', errors: validation.error.format() },
        { status: 400 },
      )
    }

    const { email } = validation.data

    console.log('email from api response', email)

    const existingSubscriber = await client.fetch(
      `*[_type == "subscriber" && email == "${email}"][0]`,
      { email },
    )

    if (existingSubscriber) {
      return NextResponse.json(
        { message: 'Email is already subscribed' },
        { status: 409 },
      )
    }

    await writeClient.create({
      _type: 'subscriber',
      email,
    })

    return NextResponse.json({ message: 'Subscription successful!' })
  } catch (error) {
    console.error('Error processing subscription:', error)
    return NextResponse.json(
      { message: 'Error processing subscription' },
      { status: 500 },
    )
  }
}
