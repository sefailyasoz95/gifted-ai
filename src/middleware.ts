import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createRateLimit } from '@/lib/rate-limit'

const apiRateLimiter = createRateLimit({
  requestsPerMinute: 20,
  message: 'Too many requests. Please try again in a minute.',
})

export async function middleware(request: NextRequest) {
  // Only apply to API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Basic security headers
    const headers = new Headers(request.headers)
    headers.set('X-Frame-Options', 'DENY')
    headers.set('X-Content-Type-Options', 'nosniff')
    headers.set('Referrer-Policy', 'origin-when-cross-origin')
    headers.set('Content-Security-Policy', "default-src 'self'; img-src 'self' blob: data:; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';")

    // Check rate limit
    const rateLimit = await apiRateLimiter(request)
    if (rateLimit) return rateLimit

    // For caption generation endpoint
    if (request.nextUrl.pathname === '/api/generate') {
      // Validate request method
      if (request.method !== 'POST') {
        return NextResponse.json(
          { error: 'Method not allowed' },
          { status: 405, headers }
        )
      }

      // Validate content type
      const contentType = request.headers.get('content-type')
      if (!contentType?.includes('application/json')) {
        return NextResponse.json(
          { error: 'Content-Type must be application/json' },
          { status: 400, headers }
        )
      }
    }

    // Clone the response and add security headers
    const response = NextResponse.next()
    headers.forEach((value, key) => {
      response.headers.set(key, value)
    })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
