/**
 * Environment Configuration
 * Safe accessor for environment variables and API endpoints.
 * In browser runtime, always use relative path '' so all requests go to the Next.js internal API route handlers (/api/...)
 * to completely shield the Backend API domain from client DevTools inspection.
 */
export const envConfig = {
  apiUrl: (typeof window !== 'undefined'
    ? ''
    : (process.env.INTERNAL_API_URL || process.env.BACKEND_API_URL || '')
  ).replace(/\/+$/, ''),
} as const;
