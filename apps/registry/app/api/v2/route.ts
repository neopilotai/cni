import { NextResponse } from 'next/server'

export function GET() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Docker-Distribution-API-Version': 'registry/2.0',
      'Cache-Control': 'no-store',
    },
  })
}
