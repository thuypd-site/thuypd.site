'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { SectionConfig, LandingPageConfig } from '../../../types/landingConfig.types';
import { defaultLandingConfig } from '../../../data/defaultLandingConfig';
import { fetchLandingConfigApi, normalizeLandingPageConfig } from '../api/landingConfig.api';

export interface LandingConfigContextType {
  config: LandingPageConfig;
  sections: SectionConfig[];
  isLoading: boolean;
  apiError: string | null;
  refreshConfig: () => Promise<void>;
}

const LandingConfigContext = createContext<LandingConfigContextType | undefined>(undefined);

export interface LandingConfigProviderProps {
  children: ReactNode;
  initialConfig?: LandingPageConfig;
}

export const LandingConfigProvider: React.FC<LandingConfigProviderProps> = ({
  children,
  initialConfig,
}) => {
  const hasServerConfig = Boolean(
    initialConfig && Array.isArray(initialConfig.sections) && initialConfig.sections.length > 0
  );

  const isPreviewModeRef = React.useRef<boolean>(false);

  const [config, setConfig] = useState<LandingPageConfig>(() =>
    hasServerConfig ? normalizeLandingPageConfig(initialConfig) : defaultLandingConfig
  );
  const [isLoading, setIsLoading] = useState<boolean>(!hasServerConfig);
  const [apiError, setApiError] = useState<string | null>(null);

  const refreshConfig = useCallback(async () => {
    if (isPreviewModeRef.current) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setApiError(null);
    try {
      const response = await fetchLandingConfigApi();
      if (
        response.success &&
        response.config &&
        Array.isArray(response.config.sections) &&
        response.config.sections.length > 0
      ) {
        setConfig(response.config);
      } else if (response.message) {
        setApiError(response.message);
      }
    } catch (err) {
      setApiError((err as Error).message || 'Không thể tải cấu hình từ máy chủ');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isPreview =
      window.location.search.includes('preview=true') ||
      window.location.pathname.startsWith('/preview') ||
      (window.parent && window.parent !== window);

    if (isPreview) {
      isPreviewModeRef.current = true;
    }

    if (!hasServerConfig && !isPreview) {
      refreshConfig();
    } else if (isPreview && !hasServerConfig) {
      refreshConfig().finally(() => {
        isPreviewModeRef.current = true;
      });
    }
  }, [hasServerConfig, refreshConfig]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMessage = (event: MessageEvent) => {
      if (
        event.data &&
        (event.data.type === 'THUYPD_PREVIEW_UPDATE' || event.data.type === 'LANDING_CONFIG_PREVIEW')
      ) {
        if (event.data.config) {
          isPreviewModeRef.current = true;
          const normalized = normalizeLandingPageConfig(event.data.config);
          setConfig(normalized);
          setIsLoading(false);
        }
      }

      if (event.data && event.data.type === 'THUYPD_SCROLL_TO_SECTION' && event.data.sectionKey) {
        const targetId = `section-${event.data.sectionKey}`;
        const targetEl =
          document.getElementById(targetId) ||
          document.querySelector(`[data-section-id="${event.data.sectionKey}"]`);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    window.addEventListener('message', handleMessage);

    if (window.parent && window.parent !== window) {
      isPreviewModeRef.current = true;
      window.parent.postMessage({ type: 'THUYPD_PREVIEW_READY' }, '*');
      const t1 = setTimeout(() => window.parent.postMessage({ type: 'THUYPD_PREVIEW_READY' }, '*'), 150);
      return () => {
        clearTimeout(t1);
        window.removeEventListener('message', handleMessage);
      };
    }

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return;
    try {
      const channel = new BroadcastChannel('thuypd_landing_channel');
      channel.onmessage = (event) => {
        if (event.data && (event.data.type === 'CONFIG_UPDATED' || event.data.type === 'THUYPD_PREVIEW_UPDATE')) {
          if (event.data.config) {
            setConfig(normalizeLandingPageConfig(event.data.config));
          } else {
            refreshConfig();
          }
        }
      };
      return () => channel.close();
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
