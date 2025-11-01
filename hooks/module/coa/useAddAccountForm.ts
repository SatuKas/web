import { ADD_ACCOUNT_FORM_DEFAULT_VALUES } from '@/constants/coa';
import useDialog from '@/hooks/common/useDialog';
import { CreateAccountPayload } from '@/types/api/coa';
import { AddAccountData } from '@/types/client/coa';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import useAccountMutation from './query/useAccountMutation';
import useAddAccountSchema from './useAddAccountSchema';

interface UseAddAccountFormProps {
  onSuccess?: () => void;
  bookId: string;
}

const useAddAccountForm = ({ onSuccess, bookId }: UseAddAccountFormProps) => {
  const { closeDialog } = useDialog();

  const { createAccount, isLoadingCreateAccount } = useAccountMutation();
  const { addAccountSchema } = useAddAccountSchema();
  const t = useTranslations();
  // Initialize react-hook-form with zod resolver and default values
  const form = useForm<AddAccountData>({
    resolver: zodResolver(addAccountSchema),
    defaultValues: ADD_ACCOUNT_FORM_DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<AddAccountData> = (data) => {
    const payload: CreateAccountPayload = {
      book_id: bookId,
      name: data.name,
      description: data.description,
      code: data.code,
      type: data.type,
      balance: data.balance,
      parent_id: data.parentAccount,
    };

    createAccount(payload, {
      onSuccess: () => {
        onSuccess?.();
        closeDialog();
      },
      onError: (error) => {
        console.log({ error });
      },
    });
  };

  const onError: SubmitErrorHandler<AddAccountData> = (errors) => {
    console.log({ errors });
  };

  return { form, onSubmit, onError, isLoadingCreateAccount };
};

export default useAddAccountForm;
