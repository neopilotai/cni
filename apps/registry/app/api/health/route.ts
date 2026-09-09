import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({ service: 'registry', status: 'operational' }, { headers: { 'Cache-Control': 'no-store' } })
}
