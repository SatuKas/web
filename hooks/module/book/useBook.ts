import { useContext } from 'react';

import BookListContext from '@/contexts/BookListContext';

const useBook = () => {
  const {
    bookList,
    bookSharedList,
    isLoadingBookList,
    isLoadingBookSharedList,
    refetchBookList,
    refetchBookSharedList,
  } = useContext(BookListContext);

  return {
    bookList,
    bookSharedList,
    isLoadingBookList,
    isLoadingBookSharedList,
    refetchBookList,
    refetchBookSharedList,
  };
};

export default useBook;
