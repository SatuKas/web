'use client';

import BookDetailContext from '@/contexts/BookDetailContext/BookDetailContext';
import { useContext } from 'react';

const useBookDetail = () => {
  const context = useContext(BookDetailContext);

  return context;
};

export default useBookDetail;
