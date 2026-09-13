export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { proxyToBackend } from '@/src/lib/backend-proxy';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get('domain') || '';
    const tld = searchParams.get('tld') || '.com';

    const res = await proxyToBackend(`/api/client/domain/check?domain=${encodeURIComponent(domain)}&tld=${encodeURIComponent(tld)}`, {
      method: 'GET',
      req,
      timeoutMs: 6000,
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }

    const errData = await res.json().catch(() => ({}));
    return NextResponse.json(errData, { status: res.status });
  } catch (err: any) {
    console.warn('[Server Proxy] /api/client/domain/check error:', err?.message || err);
    return NextResponse.json(
      { success: false, statusCode: 500, message: 'Không thể kết nối máy chủ tra cứu tên miền.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const res = await proxyToBackend('/api/client/domain/check', {
      method: 'POST',
      body,
      req,
      timeoutMs: 6000,
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }

    const errData = await res.json().catch(() => ({}));
    return NextResponse.json(errData, { status: res.status });
  } catch (err: any) {
    console.warn('[Server Proxy] /api/client/domain/check POST error:', err?.message || err);
    return NextResponse.json(
      { success: false, statusCode: 500, message: 'Không thể kết nối máy chủ tra cứu tên miền.' },
      { status: 500 }
    );
  }
}
