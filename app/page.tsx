import React from 'react';
import { Providers } from './providers';
import { ClientApp } from '@/src/components/ClientApp';
import { BACKEND_URL } from '@/src/lib/backend-proxy';
import { defaultLandingConfig } from '@/src/data/defaultLandingConfig';
import { LandingPageConfig } from '@/src/types/landingConfig.types';

export const dynamic = 'force-dynamic';

async function getInitialServerConfig(): Promise<LandingPageConfig> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`${BACKEND_URL}/api/landing-config`, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const cfg = data.data || data.config || data;
      if (cfg && Array.isArray(cfg.sections) && cfg.sections.length > 0) {
        return cfg;
      }
    }
  } catch (err) {
    console.warn('[Server Component SSR] Failed to pre-fetch config, using default:', err);
  }

  return defaultLandingConfig;
}

export default async function HomePage() {
  const initialConfig = await getInitialServerConfig();

  return (
    <Providers initialConfig={initialConfig}>
      <ClientApp />
    </Providers>
  );
}
