import { useQuery } from '@tanstack/react-query';
import { fetchServicesApi } from '../api/services.api';
import { ServiceItem } from '../../../types/service.types';

export const useServices = () => {
  const initialServices: ServiceItem[] | undefined =
    typeof window !== 'undefined' && Array.isArray((window as any).__INITIAL_SERVICES__)
      ? (window as any).__INITIAL_SERVICES__
      : undefined;

  return useQuery({
    queryKey: ['services'],
    queryFn: fetchServicesApi,
    initialData: initialServices,
    staleTime: 1000 * 60 * 10,
  });
};
