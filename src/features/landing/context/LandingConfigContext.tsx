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
  const isPreviewModeRef = React.useRef<boolean>(false);

  const [config, setConfig] = useState<LandingPageConfig>(() => {
    // 1. If server provides initialConfig from SSR, prioritize it and sync to localStorage
    if (initialConfig && Array.isArray(initialConfig.sections) && initialConfig.sections.length > 0) {
      const normalized = normalizeLandingPageConfig(initialConfig);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
        } catch {}
      }
      return normalized;
    }

    if (typeof window !== 'undefined') {
      // Check if in preview mode (iframe or ?preview=true or /preview)
      const isPreview =
        window.location.search.includes('preview=true') ||
        window.location.pathname.startsWith('/preview') ||
        (window.parent && window.parent !== window);

      if (isPreview) {
        isPreviewModeRef.current = true;
      }

      // 2. Pre-fetched server-side configuration from SSR
      if (
        (window as any).__INITIAL_LANDING_CONFIG__ &&
        Array.isArray((window as any).__INITIAL_LANDING_CONFIG__.sections) &&
        (window as any).__INITIAL_LANDING_CONFIG__.sections.length > 0
      ) {
        return normalizeLandingPageConfig((window as any).__INITIAL_LANDING_CONFIG__);
      }

      // 3. Client cached configuration from previous session
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
    // If preview mode is actively controlled by Admin, do not overwrite with stale API data
    if (isPreviewModeRef.current) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setApiError(null);
    try {
      const response = await fetchLandingConfigApi();
      if (response && response.success && response.config && Array.isArray(response.config.sections) && response.config.sections.length > 0) {
        const serverConfig = response.config;
        setConfig(serverConfig);
        setIsUsingLiveApi(true);

        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(serverConfig));
          } catch {}
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
      // 1. Realtime configuration update from Admin
      if (event.data && (event.data.type === 'THUYPD_PREVIEW_UPDATE' || event.data.type === 'LANDING_CONFIG_PREVIEW')) {
        const rawConfig = event.data.config;
        if (rawConfig) {
          try {
            isPreviewModeRef.current = true;
            const normalized = normalizeLandingPageConfig(rawConfig);
            setConfig(normalized);
            setIsLoading(false);

            // Dynamically apply theme color css variables if provided
            if (normalized.theme?.primaryColor) {
              document.documentElement.style.setProperty('--primary', normalized.theme.primaryColor);
            }
          } catch (err) {
            console.warn('[LandingConfig Preview] Error applying preview config:', err);
          }
        }
      }

      // 2. Scroll to section request from Admin
      if (event.data && event.data.type === 'THUYPD_SCROLL_TO_SECTION' && event.data.sectionKey) {
        const targetId = `section-${event.data.sectionKey}`;
        const targetEl = document.getElementById(targetId) || document.querySelector(`[data-section-id="${event.data.sectionKey}"]`);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    window.addEventListener('message', handleMessage);

    // If embedded in an iframe, signal parent that preview client is ready
    if (window.parent && window.parent !== window) {
      isPreviewModeRef.current = true;
      window.parent.postMessage({ type: 'THUYPD_PREVIEW_READY' }, '*');
      // Re-signal after short delay to ensure parent listener is attached
      const t1 = setTimeout(() => window.parent.postMessage({ type: 'THUYPD_PREVIEW_READY' }, '*'), 100);
      const t2 = setTimeout(() => window.parent.postMessage({ type: 'THUYPD_PREVIEW_READY' }, '*'), 300);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        window.removeEventListener('message', handleMessage);
      };
    }

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Support cross-tab real-time sync via BroadcastChannel (Instant Publish)
  useEffect(() => {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return;

    try {
      const channel = new BroadcastChannel('thuypd_landing_channel');
      channel.onmessage = (event) => {
        if (event.data && (event.data.type === 'CONFIG_UPDATED' || event.data.type === 'THUYPD_PREVIEW_UPDATE')) {
          if (event.data.config) {
            const normalized = normalizeLandingPageConfig(event.data.config);
            setConfig(normalized);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
            } catch {}
          } else {
            refreshConfig();
          }
        }
      };

      return () => {
        channel.close();
      };
    } catch {
      // ignore
    }
  }, [refreshConfig]);

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
