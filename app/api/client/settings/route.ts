export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { proxyToBackend } from '@/src/lib/backend-proxy';
import { siteConfig } from '@/src/config/site.config';

export async function GET(req: NextRequest) {
  try {
    const res = await proxyToBackend('/api/client/settings', {
      method: 'GET',
      req,
      timeoutMs: 3500,
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch (err) {
    console.warn('[Server Proxy] /api/client/settings error:', err);
  }

  return NextResponse.json({
    success: true,
    statusCode: 200,
    data: siteConfig,
    settings: siteConfig,
  });
}
