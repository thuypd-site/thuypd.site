import { useQuery } from '@tanstack/react-query';
import { fetchPricingPlansApi } from '../api/pricing.api';
import { PricingPlan } from '../../../types/pricing.types';

export const usePricing = () => {
  const initialPricing: PricingPlan[] | undefined =
    typeof window !== 'undefined' && Array.isArray((window as any).__INITIAL_PRICING__)
      ? (window as any).__INITIAL_PRICING__
      : undefined;

  return useQuery({
    queryKey: ['pricing-plans'],
    queryFn: fetchPricingPlansApi,
    initialData: initialPricing,
    staleTime: 1000 * 60 * 10,
  });
};
