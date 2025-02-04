import { NextRequest, NextResponse } from 'next/server'
import { generateCaption } from '@/lib/gemini'
import { generateCaptionValidator } from '@/lib/validators'
import { ZodError } from 'zod'

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const body = await req.json()
    const { imageUrl, prompt } = generateCaptionValidator.parse(body)

    // Generate caption
    const caption = await generateCaption(imageUrl, prompt)
    if (!caption) {
      return NextResponse.json(
        { error: 'Failed to generate caption' },
        { status: 500 }
      )
    }

    return NextResponse.json({ caption })
  } catch (error) {
    console.error('Error generating caption:', error)

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
