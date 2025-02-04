import { rateLimit } from 'express-rate-limit'
import { NextResponse } from 'next/server'

export function createRateLimit(options: {
  requestsPerMinute?: number
  message?: string
}) {
  const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: options.requestsPerMinute || 10,
    message: options.message || 'Too many requests, please try again later.',
    legacyHeaders: false,
    standardHeaders: true,
  })

  return async function rateLimitMiddleware(request: Request) {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const limiterResponse = await new Promise((resolve) => {
      limiter(
        { ip, headers: request.headers } as any,
        { json: (data: any) => resolve(data), status: (status: number) => ({ json: (data: any) => resolve({ ...data, status }) }) } as any,
        () => resolve(null)
      )
    })

    if (limiterResponse) {
      return NextResponse.json(
        { error: (limiterResponse as any).message || 'Rate limit exceeded' },
        { status: (limiterResponse as any).status || 429 }
      )
    }

    return null
  }
}
