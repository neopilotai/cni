import { NextResponse } from 'next/server'

type RouteContext = { params: Promise<{ name: string; reference: string }> }

function protocolHeaders() {
  return { 'Docker-Distribution-API-Version': 'registry/2.0', 'Cache-Control': 'no-store' }
}

function validReference(reference: string) {
  return /^sha256:[a-f0-9]{64}$/.test(reference) || /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,127}$/.test(reference)
}

export async function GET(request: Request, context: RouteContext) {
  const { name, reference } = await context.params
  if (!name || !validReference(reference)) return NextResponse.json({ errors: [{ code: 'NAME_INVALID', message: 'Invalid repository or manifest reference' }] }, { status: 400, headers: protocolHeaders() })
  if (!request.headers.get('authorization')) return NextResponse.json({ errors: [{ code: 'UNAUTHORIZED', message: 'authentication required' }] }, { status: 401, headers: { ...protocolHeaders(), 'WWW-Authenticate': 'Bearer realm="/api/auth/token",service="registry.cni.dev"' } })
  return NextResponse.json({ errors: [{ code: 'MANIFEST_UNKNOWN', message: 'manifest storage is not configured for this repository' }] }, { status: 404, headers: protocolHeaders() })
}

export async function PUT(_: Request, context: RouteContext) {
  const { name, reference } = await context.params
  if (!name || !validReference(reference)) return NextResponse.json({ errors: [{ code: 'NAME_INVALID', message: 'Invalid repository or manifest reference' }] }, { status: 400, headers: protocolHeaders() })
  return NextResponse.json({ errors: [{ code: 'UNAUTHORIZED', message: 'authentication required' }] }, { status: 401, headers: { ...protocolHeaders(), 'WWW-Authenticate': 'Bearer realm="/api/auth/token",service="registry.cni.dev"' } })
}

export async function DELETE(_: Request, context: RouteContext) {
  const { name, reference } = await context.params
  if (!name || !validReference(reference)) return NextResponse.json({ errors: [{ code: 'NAME_INVALID', message: 'Invalid repository or manifest reference' }] }, { status: 400, headers: protocolHeaders() })
  return NextResponse.json({ errors: [{ code: 'UNAUTHORIZED', message: 'authentication required' }] }, { status: 401, headers: protocolHeaders() })
}
