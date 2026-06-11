import { fetchClient } from '@/lib/fetchClient';
import type { SectionStatistics } from '@/types/SectionStatistics';

/**
 * API service for fetching global section statistics.
 * Endpoint: /some-sections-statistics
 */
export const sectionStatisticsApi = {
  /**
   * Retrieves statistics for all sections.
   */
  getStatistics: async (): Promise<{ data: SectionStatistics; message: string }> => {
    return fetchClient('/some-sections-statistics', {
      method: 'GET',
    });
  },
};
