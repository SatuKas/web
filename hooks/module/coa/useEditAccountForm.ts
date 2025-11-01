import { EDIT_ACCOUNT_FORM_DEFAULT_VALUES } from '@/constants/coa';
import useDialog from '@/hooks/common/useDialog';
import { UpdateAccountPayload } from '@/types/api/coa';
import { EditAccountData } from '@/types/client/coa';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import useAccountMutation from './query/useAccountMutation';
import useEditAccountSchema from './useEditAccountSchema';

interface useEditAccountFormProps {
  onSuccess?: () => void;
  bookId: string;
  accountId: string;
}

const useEditAccountForm = ({ onSuccess, bookId, accountId }: useEditAccountFormProps) => {
  const { closeDialog } = useDialog();

  const { updateAccount, isLoadingUpdateAccount } = useAccountMutation();
  const { editAccountSchema } = useEditAccountSchema();
  const t = useTranslations();
  // Initialize react-hook-form with zod resolver and default values
  const form = useForm<EditAccountData>({
    resolver: zodResolver(editAccountSchema),
    defaultValues: EDIT_ACCOUNT_FORM_DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<EditAccountData> = (data) => {
    const payload: UpdateAccountPayload = {
      id: accountId,
      book_id: bookId,
      name: data.name,
      description: data.description,
      is_active: data.isActive,
    };

    updateAccount(payload, {
      onSuccess: () => {
        onSuccess?.();
        closeDialog();
      },
      onError: (error) => {
        console.log({ error });
      },
    });
  };

  const onError: SubmitErrorHandler<EditAccountData> = (errors) => {
    console.log({ errors });
  };

  return { form, onSubmit, onError, isLoadingUpdateAccount };
};

export default useEditAccountForm;
