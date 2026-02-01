'use client';

import { useQuery } from '@/libs/react-query';
import { bookService } from '@/services/api';
import { BookByIdData, BookListData } from '@/types/client/book';
import { mapSnakeCaseToCamelCase } from '@/utils/data';
import { useMemo } from 'react';

const BOOK_LIST_QUERY_KEY = 'book-list';
const BOOK_SHARED_LIST_QUERY_KEY = 'book-shared-list';
const BOOK_GET_BY_ID_QUERY_KEY = 'book-get-by-id';

export enum BookQueryType {
  LIST = 'list',
  SHARED_LIST = 'shared-list',
  GET_BY_ID = 'get-by-id',
}

const useBookQuery = (queryType: BookQueryType, bookId?: string) => {
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

  const {
    data: bookByIdData,
    isLoading: bookByIdLoading,
    refetch: refetchBookById,
  } = useQuery({
    queryKey: [BOOK_GET_BY_ID_QUERY_KEY],
    queryFn: () => bookService.getBookById(bookId as string),
    enabled: queryType === BookQueryType.GET_BY_ID && !!bookId,
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

  const bookById = useMemo(() => {
    if (bookByIdData) {
      return mapSnakeCaseToCamelCase(bookByIdData) as BookByIdData;
    }
    return undefined;
  }, [bookByIdData]);

  return {
    bookList,
    bookListLoading,
    bookSharedList,
    bookSharedListLoading,
    bookById,
    bookByIdLoading,
    refetchBookList,
    refetchBookSharedList,
    refetchBookById,
  };
};

export default useBookQuery;
