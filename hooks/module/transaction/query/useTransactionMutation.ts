'use client';

import { useMutation } from '@/libs/react-query';
import { transactionService } from '@/services/api';
import { ApiResponse } from '@/types/api/common';
import { CreateTransactionPayload, TransactionResponse } from '@/types/api/transaction';
import { useQueryClient } from '@tanstack/react-query';

const CREATE_TRANSACTION_MUTATION_QUERY_KEY = 'create-transaction-mutation';

const useTransactionMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: createTransaction, isPending: isLoadingCreateTransaction } = useMutation<
    TransactionResponse,
    ApiResponse<TransactionResponse>,
    CreateTransactionPayload
  >({
    mutationKey: [CREATE_TRANSACTION_MUTATION_QUERY_KEY],
    mutationFn: (payload: CreateTransactionPayload) => transactionService.createTransactionEntry(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CREATE_TRANSACTION_MUTATION_QUERY_KEY] });
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  return { createTransaction, isLoadingCreateTransaction };
};

export default useTransactionMutation;
