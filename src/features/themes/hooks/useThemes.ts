import { useQuery } from '@tanstack/react-query';
import { fetchThemesApi } from '../api/themes.api';
import { ThemeCategory } from '../../../types/theme.types';

export const useThemes = (category: ThemeCategory = 'all') => {
  return useQuery({
    queryKey: ['themes', category],
    queryFn: () => fetchThemesApi(category),
    staleTime: 1000 * 60 * 5,
  });
};
