/**
 * API Service Facade
 * Delegates calls to modular feature-specific API clients.
 * Retains backward compatibility for existing hooks and components.
 */

// Re-export mock data
export * from '../data';

// Re-export feature API functions
export { fetchThemesApi } from '../features/themes/api/themes.api';
export { fetchServicesApi } from '../features/services/api/services.api';
export { fetchPricingPlansApi } from '../features/pricing/api/pricing.api';
export { fetchSettingsApi } from '../features/settings/api/settings.api';
export { submitContactQuoteApi } from '../features/quote/api/quote.api';
export { checkDomainApi } from '../features/domain/api/domain.api';
export { fetchLandingConfigApi } from '../features/landing/api/landingConfig.api';
