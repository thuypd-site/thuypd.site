'use client';

import React, { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LandingConfigProvider } from '@/src/features/landing/context/LandingConfigContext';
import { LandingPageConfig } from '@/src/types/landingConfig.types';

import { SiteSettings } from '@/src/types/settings.types';

interface ProvidersProps {
  children: ReactNode;
  initialConfig?: LandingPageConfig;
  initialSettings?: SiteSettings;
}

export function Providers({ children, initialConfig, initialSettings }: ProvidersProps) {
  const [queryClient] = useState(
    () => {
      const client = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      });
      if (initialSettings) {
        client.setQueryData(['site-settings'], initialSettings);
      }
      return client;
    }
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LandingConfigProvider initialConfig={initialConfig}>
        {children}
      </LandingConfigProvider>
    </QueryClientProvider>
  );
}
