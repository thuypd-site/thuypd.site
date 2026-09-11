export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { proxyToBackend } from '@/src/lib/backend-proxy';

export async function GET(req: NextRequest) {
  try {
    const res = await proxyToBackend('/api/client/services', {
      method: 'GET',
      req,
      timeoutMs: 3500,
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch (err) {
    console.warn('[Server Proxy] /api/client/services error:', err);
  }

  return NextResponse.json({
    success: true,
    statusCode: 200,
    services: [],
    data: [],
  });
}
