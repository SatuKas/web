import { CREATE_TRANSACTION_FORM_DEFAULT_VALUES } from '@/constants/transaction';
import { CreateTransactionPayload } from '@/types/api/transaction';
import { AccountPosition } from '@/types/client/coa';
import { TransactionFormData } from '@/types/client/transaction';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import useTransactionMutation from './query/useTransactionMutation';
import useCreateTransactionSchema from './useCreateTransactionSchema';

interface UseCreateTransactionFormProps {
  onSuccess?: () => void;
  bookId: string;
}

const useCreateTransactionForm = ({ onSuccess, bookId }: UseCreateTransactionFormProps) => {
  const { createTransaction, isLoadingCreateTransaction } = useTransactionMutation();
  const { createTransactionSchema } = useCreateTransactionSchema();

  const form = useForm<TransactionFormData>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: CREATE_TRANSACTION_FORM_DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<TransactionFormData> = (data) => {
    const dateValue = data.date.includes('T') ? data.date : `${data.date}T00:00:00.000Z`;
    const payload: CreateTransactionPayload = {
      book_id: bookId,
      description: data.description,
      date: new Date(dateValue).toISOString(),
      type: data.type,
      ref_type: data.refType,
      entries: data.entries.map((entry) => ({
        account_id: entry.accountId,
        position: entry.position,
        debit: entry.accountPosition === AccountPosition.DEBIT ? entry.amount : null,
        credit: entry.accountPosition === AccountPosition.CREDIT ? entry.amount : null,
      })),
    };

    createTransaction(payload, {
      onSuccess: () => {
        onSuccess?.();
        form.reset();
      },
      onError: (error) => {
        console.log({ error });
      },
    });
  };

  const onError: SubmitErrorHandler<TransactionFormData> = (errors) => {
    console.log({ errors });
  };

  return { form, onSubmit, onError, isLoadingCreateTransaction };
};

export default useCreateTransactionForm;
