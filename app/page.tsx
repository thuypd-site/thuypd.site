import React from 'react';
import { Providers } from './providers';
import { ClientApp } from '@/src/components/ClientApp';
import { getServerLandingConfig, getServerSettings } from '@/src/lib/server-data';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [initialConfig, initialSettings] = await Promise.all([
    getServerLandingConfig(),
    getServerSettings(),
  ]);

  return (
    <Providers initialConfig={initialConfig} initialSettings={initialSettings || undefined}>
      <ClientApp />
    </Providers>
  );
}
