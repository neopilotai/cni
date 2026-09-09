import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

function headers() {
  return { 'Docker-Distribution-API-Version': 'registry/2.0', 'Cache-Control': 'no-store' }
}

function validName(name: string) {
  return /^[a-z0-9]+(?:[._-][a-z0-9]+)*(?:\/[a-z0-9]+(?:[._-][a-z0-9]+)*)*$/.test(name)
}

export async function POST(request: NextRequest, context: { params: Promise<{ name: string }> }) {
  const { name } = await context.params
  if (!validName(name)) return NextResponse.json({ errors: [{ code: 'NAME_INVALID', message: 'Invalid repository name' }] }, { status: 400, headers: headers() })
  if (!request.headers.get('authorization')) return NextResponse.json({ errors: [{ code: 'UNAUTHORIZED', message: 'authentication required' }] }, { status: 401, headers: { ...headers(), 'WWW-Authenticate': 'Bearer realm="/api/auth/token",service="registry.cni.dev"' } })

  const body = await request.arrayBuffer()
  if (body.byteLength > 100 * 1024 * 1024) return NextResponse.json({ errors: [{ code: 'TOOMANYREQUESTS', message: 'blob exceeds 100 MB request limit' }] }, { status: 413, headers: headers() })
  if (!body.byteLength) return NextResponse.json({ errors: [{ code: 'BLOB_UPLOAD_INVALID', message: 'request body is empty' }] }, { status: 400, headers: headers() })

  const blob = await put(`registry/${name}/uploads/${crypto.randomUUID()}`, Buffer.from(body), { access: 'private', contentType: request.headers.get('content-type') || 'application/octet-stream', addRandomSuffix: false })
  return new NextResponse(null, { status: 202, headers: { ...headers(), Location: `/api/v2/${name}/blobs/uploads/${blob.pathname.split('/').pop()}`, Range: '0-0', 'Docker-Upload-UUID': blob.pathname.split('/').pop() || '' } })
}
