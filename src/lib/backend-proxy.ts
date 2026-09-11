import { NextRequest } from 'next/server';

export const BACKEND_URL = (
  process.env.BACKEND_API_URL ||
  process.env.INTERNAL_API_URL ||
  process.env.REMOTE_API_ROOT ||
  ''
).replace(/\/+$/, '');

export interface ProxyOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  timeoutMs?: number;
  req?: NextRequest;
}

/**
 * Proxies an HTTP request from Landing Next.js Server to the central Backend API.
 * Completely shields the main backend domain from client-side visibility.
 */
export async function proxyToBackend(
  endpoint: string,
  options: ProxyOptions = {}
): Promise<Response> {
  const {
    method = 'GET',
    headers = {},
    body,
    timeoutMs = 5000,
    req,
  } = options;

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${BACKEND_URL}${cleanEndpoint}`;

  const requestHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...headers,
  };

  if (body !== undefined && typeof body === 'object' && !(body instanceof FormData)) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  // Forward incoming client IP or user-agent for accurate lead analytics
  if (req) {
    const forwardedFor = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip');
    if (forwardedFor) {
      requestHeaders['X-Forwarded-For'] = forwardedFor;
    }
    const userAgent = req.headers.get('user-agent');
    if (userAgent) {
      requestHeaders['User-Agent'] = userAgent;
    }
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body !== undefined ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}
