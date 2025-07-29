'use client';

import { BookRouteUrl } from '@/types/client/url';
/**
 * This context is used to store the book route context.
 * This book is for accounting book.
 */

import { getBookRouteUrl } from '@/utils/url';
import { createContext, ReactNode } from 'react';

type BookRouteContextType = BookRouteUrl;

const BookRouteContext = createContext<BookRouteContextType>({
  bookDashboardPath: '',
  bookCoaPath: '',
  bookTransactionPath: '',
  bookReportJournalPath: '',
  bookReportLedgerPath: '',
  bookReportBalanceSheetPath: '',
  bookSettingsPath: '',
});

interface BookRouteProviderProps {
  children: ReactNode;
  params: { username: string; bookId: string };
}

export const BookRouteProvider = ({ children, params }: BookRouteProviderProps) => {
  const { username, bookId } = params;

  const {
    bookDashboardPath,
    bookCoaPath,
    bookTransactionPath,
    bookReportJournalPath,
    bookReportLedgerPath,
    bookReportBalanceSheetPath,
    bookSettingsPath,
  } = getBookRouteUrl(username, bookId);

  const value: BookRouteContextType = {
    bookDashboardPath,
    bookCoaPath,
    bookTransactionPath,
    bookReportJournalPath,
    bookReportLedgerPath,
    bookReportBalanceSheetPath,
    bookSettingsPath,
  };

  return <BookRouteContext.Provider value={value}>{children}</BookRouteContext.Provider>;
};

export default BookRouteContext;
