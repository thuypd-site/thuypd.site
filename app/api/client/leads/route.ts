export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { proxyToBackend } from '@/src/lib/backend-proxy';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.fullName || !body.phone) {
      return NextResponse.json(
        { success: false, statusCode: 400, message: 'Vui lòng cung cấp họ tên và số điện thoại liên hệ' },
        { status: 400 }
      );
    }

    const res = await proxyToBackend('/api/client/leads', {
      method: 'POST',
      body,
      req,
      timeoutMs: 6000,
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data, { status: 201 });
    }

    const errData = await res.json().catch(() => ({}));
    return NextResponse.json(
      { success: false, statusCode: res.status, message: errData.message || 'Lỗi gửi thông tin tư vấn' },
      { status: res.status }
    );
  } catch (err: any) {
    console.error('[Server Proxy] POST /api/client/leads error:', err);
    return NextResponse.json(
      { success: false, statusCode: 500, message: 'Máy chủ đang bận, vui lòng thử lại sau hoặc liên hệ hotline để được hỗ trợ trực tiếp.' },
      { status: 500 }
    );
  }
}
