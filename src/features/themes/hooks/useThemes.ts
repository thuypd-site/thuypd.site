import { useQuery } from '@tanstack/react-query';
import { fetchThemesApi } from '../api/themes.api';
import { ThemeCategory, ThemeItem } from '../../../types/theme.types';

export const useThemes = (category: ThemeCategory = 'all') => {
  const initialThemes: ThemeItem[] | undefined =
    typeof window !== 'undefined' && Array.isArray((window as any).__INITIAL_THEMES__)
      ? (window as any).__INITIAL_THEMES__
      : undefined;

  return useQuery({
    queryKey: ['themes', category],
    queryFn: () => fetchThemesApi(category),
    initialData: category === 'all' ? initialThemes : undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
