'use client';

import React, { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LandingConfigProvider } from '@/src/features/landing/context/LandingConfigContext';
import { LandingPageConfig } from '@/src/types/landingConfig.types';

interface ProvidersProps {
  children: ReactNode;
  initialConfig?: LandingPageConfig;
}

export function Providers({ children, initialConfig }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LandingConfigProvider initialConfig={initialConfig}>
        {children}
      </LandingConfigProvider>
    </QueryClientProvider>
  );
}
