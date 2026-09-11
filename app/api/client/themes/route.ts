export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { proxyToBackend } from '@/src/lib/backend-proxy';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const query = category ? `?category=${encodeURIComponent(category)}` : '';

    const res = await proxyToBackend(`/api/client/themes${query}`, {
      method: 'GET',
      req,
      timeoutMs: 4000,
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch (err) {
    console.warn('[Server Proxy] /api/client/themes error:', err);
  }

  return NextResponse.json({
    success: true,
    statusCode: 200,
    data: [],
    themes: [],
  });
}
