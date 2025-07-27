'use client';

import { bookService } from '@/services/api';
import { BookResponse, CreateBookPayload } from '@/types/api/book';
import { ApiResponse } from '@/types/api/common';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CREATE_BOOK_MUTATION_QUERY_KEY = 'create-book-mutation';
const DELETE_BOOK_MUTATION_QUERY_KEY = 'delete-book-mutation';

const useBookMutation = () => {
  const queryClient = useQueryClient(); // React Query's query client instance

  const { mutate: createBook, isPending: isLoadingCreateBook } = useMutation<
    BookResponse, // response data type, contains token and expires
    ApiResponse<BookResponse>, // error type, contains message and data
    CreateBookPayload
  >({
    mutationKey: [CREATE_BOOK_MUTATION_QUERY_KEY],
    mutationFn: (payload: CreateBookPayload) => bookService.createBook(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CREATE_BOOK_MUTATION_QUERY_KEY] });
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const { mutate: deleteBook, isPending: isLoadingDeleteBook } = useMutation<
    null, // response data type, contains token and expires
    ApiResponse<null>, // error type, contains message and data
    string
  >({
    mutationKey: [DELETE_BOOK_MUTATION_QUERY_KEY],
    mutationFn: (bookId: string) => bookService.deleteBook(bookId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [DELETE_BOOK_MUTATION_QUERY_KEY] }),
    onError: (error) => {
      console.log({ error });
    },
  });

  return { createBook, isLoadingCreateBook, deleteBook, isLoadingDeleteBook };
};

export default useBookMutation;
