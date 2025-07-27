'use client';

import useBookQuery, { BookQueryType } from '@/hooks/module/book/query/useBookQuery';
import { BookListData } from '@/types/client/book';
import { createContext, ReactNode } from 'react';

interface BookListContextType {
  bookList: BookListData[];
  bookSharedList: BookListData[];
  isLoadingBookList: boolean;
  isLoadingBookSharedList: boolean;
  refetchBookList: () => void;
  refetchBookSharedList: () => void;
}

const BookListContext = createContext<BookListContextType>({
  bookList: [],
  bookSharedList: [],
  isLoadingBookList: false,
  isLoadingBookSharedList: false,
  refetchBookList: () => {},
  refetchBookSharedList: () => {},
});

interface BookListProviderProps {
  children: ReactNode;
}

export const BookListProvider = ({ children }: BookListProviderProps) => {
  const { bookList, bookListLoading, refetchBookList } = useBookQuery(BookQueryType.LIST);
  const { bookSharedList, bookSharedListLoading, refetchBookSharedList } = useBookQuery(BookQueryType.SHARED_LIST);

  const value: BookListContextType = {
    bookList: bookList || [],
    bookSharedList: bookSharedList || [],
    isLoadingBookList: bookListLoading,
    isLoadingBookSharedList: bookSharedListLoading,
    refetchBookList,
    refetchBookSharedList,
  };

  return <BookListContext.Provider value={value}>{children}</BookListContext.Provider>;
};

export default BookListContext;
