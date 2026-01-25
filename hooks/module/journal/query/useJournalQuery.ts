'use client';

import { useQuery } from '@/libs/react-query';
import { journalService } from '@/services/api';
import { JournalQueryParams } from '@/types/api/report';
import { JournalListData } from '@/types/client/report';
import { mapSnakeCaseToCamelCase } from '@/utils/data';
import { useMemo } from 'react';

const JOURNAL_QUERY_KEY = 'journal-report';

/**
 * Custom hook to fetch and manage journal report data.
 * Handles data fetching, pagination, and transformation of snake_case API responses to camelCase.
 *
 * @param params - The query parameters for the journal report, primarily requiring `book_id`.
 * @param enabled - Optional flag to enable or disable the query execution. Defaults to true.
 */
const useJournalQuery = (params: JournalQueryParams, enabled: boolean = true) => {
  const {
    data: journalData,
    isLoading: journalLoading,
    refetch: refetchJournal,
    pagination,
    setPagination,
    paginationResponse,
  } = useQuery({
    // Unique key for caching, scoped to the specific book_id.
    queryKey: [JOURNAL_QUERY_KEY, params.book_id],
    queryFn: ({ paginationParam }) =>
      journalService.getJournalReport({
        book_id: params.book_id,
        ...paginationParam,
      } as JournalQueryParams),
    // Ensures the query only runs when enabled and a valid book_id exists.
    enabled: enabled && !!params.book_id,
  });

  /**
   * Memoized list of journal data transformed for client consumption.
   * Converts snake_case keys from the API to camelCase.
   */
  const journalList = useMemo(() => {
    if (journalData) {
      return mapSnakeCaseToCamelCase(journalData) as JournalListData[];
    }
    return [];
  }, [journalData]);

  return {
    journalList,
    pagination,
    paginationResponse,
    journalLoading,
    refetchJournal,
    setPagination,
  };
};

export default useJournalQuery;
