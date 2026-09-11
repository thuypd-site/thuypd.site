export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { proxyToBackend } from '@/src/lib/backend-proxy';
import { defaultLandingConfig } from '@/src/data/defaultLandingConfig';

export async function GET(req: NextRequest) {
  try {
    const res = await proxyToBackend('/api/landing-config', {
      method: 'GET',
      req,
      timeoutMs: 4000,
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch (err) {
    console.warn('[Server Proxy] /api/landing-config proxy error, serving default config:', err);
  }

  // Fallback to embedded default config if backend is unreachable
  return NextResponse.json({
    success: true,
    statusCode: 200,
    message: 'Lấy cấu hình thành công (fallback)',
    config: defaultLandingConfig,
    data: defaultLandingConfig,
  });
}
