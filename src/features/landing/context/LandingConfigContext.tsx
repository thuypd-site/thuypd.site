'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { SectionConfig, LandingPageConfig } from '../../../types/landingConfig.types';
import { defaultLandingConfig } from '../../../data/defaultLandingConfig';
import { fetchLandingConfigApi, normalizeLandingPageConfig } from '../api/landingConfig.api';

const STORAGE_KEY = 'thuypd_landing_client_config';

export interface LandingConfigContextType {
  config: LandingPageConfig;
  sections: SectionConfig[];
  isLoading: boolean;
  isUsingLiveApi: boolean;
  apiError: string | null;
  refreshConfig: () => Promise<void>;
}

const LandingConfigContext = createContext<LandingConfigContextType | undefined>(undefined);

export interface LandingConfigProviderProps {
  children: ReactNode;
  initialConfig?: LandingPageConfig;
}

export const LandingConfigProvider: React.FC<LandingConfigProviderProps> = ({ children, initialConfig }) => {
  const [config, setConfig] = useState<LandingPageConfig>(() => {
    if (initialConfig && Array.isArray(initialConfig.sections) && initialConfig.sections.length > 0) {
      return normalizeLandingPageConfig(initialConfig);
    }

    if (typeof window !== 'undefined') {
      // 1. Pre-fetched server-side configuration from SSR
      if (
        (window as any).__INITIAL_LANDING_CONFIG__ &&
        Array.isArray((window as any).__INITIAL_LANDING_CONFIG__.sections) &&
        (window as any).__INITIAL_LANDING_CONFIG__.sections.length > 0
      ) {
        return normalizeLandingPageConfig((window as any).__INITIAL_LANDING_CONFIG__);
      }


      // 2. Client cached configuration from previous session
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && Array.isArray(parsed.sections) && parsed.sections.length > 0) {
            return normalizeLandingPageConfig(parsed);
          }
        }
      } catch (err) {
        console.warn('[LandingConfig] Could not parse stored config:', err);
      }
    }
    return defaultLandingConfig;
  });

  const [isLoading, setIsLoading] = useState<boolean>(() => {
    // If SSR provided the initial config, initial loading is already complete!
    if (typeof window !== 'undefined' && (window as any).__INITIAL_LANDING_CONFIG__?.sections?.length) {
      return false;
    }
    return true;
  });
  const [isUsingLiveApi, setIsUsingLiveApi] = useState<boolean>(() => {
    return Boolean(typeof window !== 'undefined' && (window as any).__INITIAL_LANDING_CONFIG__?.sections?.length);
  });
  const [apiError, setApiError] = useState<string | null>(null);

  // Synchronize configuration from Backend API on mount
  const refreshConfig = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const response = await fetchLandingConfigApi();
      if (response && response.success && response.config && Array.isArray(response.config.sections) && response.config.sections.length > 0) {
        // Pure API mode: use the normalized server configuration directly without hardcoded defaults
        const serverConfig = response.config;

        setConfig(serverConfig);
        setIsUsingLiveApi(true);

        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(serverConfig));
          } catch {
            // ignore localStorage quota errors
          }
        }
      } else {
        if (response && response.message) {
          setApiError(response.message);
        }
      }
    } catch (err) {
      const errorMsg = (err as Error).message || 'Không thể tải cấu hình từ máy chủ';
      setApiError(errorMsg);
      console.warn('[LandingConfig] Failed to fetch server configuration, using cached/default config:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshConfig();
  }, [refreshConfig]);

  // Support real-time Live Preview via iframe postMessage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data && (event.data.type === 'THUYPD_PREVIEW_UPDATE' || event.data.type === 'LANDING_CONFIG_PREVIEW')) {
        const rawConfig = event.data.config;
        if (rawConfig) {
          try {
            const normalized = normalizeLandingPageConfig(rawConfig);
            setConfig(normalized);
            setIsLoading(false);
          } catch (err) {
            console.warn('[LandingConfig Preview] Error applying preview config:', err);
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);

    // If embedded in an iframe, signal parent that preview client is ready
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'THUYPD_PREVIEW_READY' }, '*');
    }

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <LandingConfigContext.Provider
      value={{
        config,
        sections: config.sections,
        isLoading,
        isUsingLiveApi,
        apiError,
        refreshConfig,
      }}
    >
      {children}
    </LandingConfigContext.Provider>
  );
};

export const useLandingConfig = () => {
  const context = useContext(LandingConfigContext);
  if (!context) {
    throw new Error('useLandingConfig must be used within a LandingConfigProvider');
  }
  return context;
};
