'use client';

import { bookService } from '@/services/api';
import { BookListData } from '@/types/client/book';
import { mapSnakeCaseToCamelCase } from '@/utils/data';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

const BOOK_LIST_QUERY_KEY = 'book-list';
const BOOK_SHARED_LIST_QUERY_KEY = 'book-shared-list';

export enum BookQueryType {
  LIST = 'list',
  SHARED_LIST = 'shared-list',
}

const useBookQuery = (queryType: BookQueryType) => {
  const {
    data: bookListData,
    isLoading: bookListLoading,
    refetch: refetchBookList,
  } = useQuery({
    queryKey: [BOOK_LIST_QUERY_KEY],
    queryFn: () => bookService.getBooks(),
    enabled: queryType === BookQueryType.LIST,
  });

  const {
    data: bookSharedListData,
    isLoading: bookSharedListLoading,
    refetch: refetchBookSharedList,
  } = useQuery({
    queryKey: [BOOK_SHARED_LIST_QUERY_KEY],
    queryFn: () => bookService.getSharedBooks(),
    enabled: queryType === BookQueryType.SHARED_LIST,
  });

  const bookList = useMemo(() => {
    if (bookListData) {
      return mapSnakeCaseToCamelCase(bookListData) as BookListData[];
    }
    return undefined;
  }, [bookListData]);

  const bookSharedList = useMemo(() => {
    if (bookSharedListData) {
      return mapSnakeCaseToCamelCase(bookSharedListData) as BookListData[];
    }
    return undefined;
  }, [bookSharedListData]);

  return { bookList, bookListLoading, bookSharedList, bookSharedListLoading, refetchBookList, refetchBookSharedList };
};

export default useBookQuery;
