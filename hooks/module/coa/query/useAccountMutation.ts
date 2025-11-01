'use client';

import { coaService } from '@/services/api';
import { AccountResponse, CreateAccountPayload, UpdateAccountPayload } from '@/types/api/coa';
import { ApiResponse } from '@/types/api/common';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CREATE_ACCOUNT_MUTATION_QUERY_KEY = 'create-account-mutation';
const DELETE_ACCOUNT_MUTATION_QUERY_KEY = 'delete-account-mutation';
const UPDATE_ACCOUNT_MUTATION_QUERY_KEY = 'update-account-mutation';

const useAccountMutation = () => {
  const queryClient = useQueryClient(); // React Query's query client instance

  const { mutate: createAccount, isPending: isLoadingCreateAccount } = useMutation<
    AccountResponse, // response data type, contains token and expires
    ApiResponse<AccountResponse>, // error type, contains message and data
    CreateAccountPayload
  >({
    mutationKey: [CREATE_ACCOUNT_MUTATION_QUERY_KEY],
    mutationFn: (payload: CreateAccountPayload) => coaService.createAccount(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CREATE_ACCOUNT_MUTATION_QUERY_KEY] });
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const { mutate: updateAccount, isPending: isLoadingUpdateAccount } = useMutation<
    AccountResponse, // response data type, contains token and expires
    ApiResponse<AccountResponse>, // error type, contains message and data
    UpdateAccountPayload
  >({
    mutationKey: [UPDATE_ACCOUNT_MUTATION_QUERY_KEY],
    mutationFn: (payload: UpdateAccountPayload) => coaService.updateAccount(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UPDATE_ACCOUNT_MUTATION_QUERY_KEY] });
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  // const { mutate: deleteBook, isPending: isLoadingDeleteBook } = useMutation<
  //   null, // response data type, contains token and expires
  //   ApiResponse<null>, // error type, contains message and data
  //   string
  // >({
  //   mutationKey: [DELETE_BOOK_MUTATION_QUERY_KEY],
  //   mutationFn: (bookId: string) => bookService.deleteBook(bookId),
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: [DELETE_BOOK_MUTATION_QUERY_KEY] }),
  //   onError: (error) => {
  //     console.log({ error });
  //   },
  // });

  return { createAccount, isLoadingCreateAccount, updateAccount, isLoadingUpdateAccount };
};

export default useAccountMutation;
