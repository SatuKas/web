'use client';

import useBookQuery, { BookQueryType } from '@/hooks/module/book/query/useBookQuery';
import { BookByIdData } from '@/types/client/book';
/**
 * This context is used to store the book detail context.
 * This book is for accounting book.
 */

import { createContext, ReactNode } from 'react';

type BookDetailContextType = {
  book: BookByIdData | undefined;
  isLoadingBook: boolean;
  bookId: string;
};

const BookDetailContext = createContext<BookDetailContextType>({
  book: undefined,
  isLoadingBook: true,
  bookId: '',
});

interface BookDetailProviderProps {
  children: ReactNode;
  params: { bookId: string };
}

export const BookDetailProvider = ({ children, params }: BookDetailProviderProps) => {
  const { bookId } = params;

  const { bookById, bookByIdLoading } = useBookQuery(BookQueryType.GET_BY_ID, bookId);

  const value: BookDetailContextType = {
    book: bookById,
    isLoadingBook: bookByIdLoading,
    bookId: bookId,
  };

  // TECHDEBT: add loading state
  return <BookDetailContext.Provider value={value}>{children}</BookDetailContext.Provider>;
};

export default BookDetailContext;
