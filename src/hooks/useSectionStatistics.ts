import { useQuery } from '@tanstack/react-query';
import { sectionStatisticsApi } from '@/api/sectionStatisticsApi';

/**
 * Hook to fetch global section statistics.
 * Caches the result under the `statistics` query key.
 */
export const useSectionStatistics = () => {
  return useQuery({
    queryKey: ['section-statistics'],
    queryFn: async () => sectionStatisticsApi.getStatistics(),
  });
};
