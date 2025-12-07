import Button from '@/components/ui/Button';
import Form, { FormField } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import Stack from '@/components/ui/Stack';
import Switch from '@/components/ui/Switch';
import Textarea from '@/components/ui/Textarea';
import useEditAccountForm from '@/hooks/module/coa/useEditAccountForm';
import { AccountListData } from '@/types/client/coa';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

interface EditAccountFormProps {
  onSuccess?: () => void;
  accountData: AccountListData;
  bookId: string;
}

const EditAccountForm = ({ onSuccess, accountData, bookId }: EditAccountFormProps) => {
  const t = useTranslations('coa');
  const { form, onSubmit, onError, isLoadingUpdateAccount } = useEditAccountForm({
    onSuccess,
    accountId: accountData.id,
    bookId,
  });

  useEffect(() => {
    form.setValue('name', accountData.name);
    form.setValue('description', accountData.description);
    form.setValue('isActive', accountData.isActive);
  }, [accountData, form]);

  return (
    <Form
      onSubmit={onSubmit}
      onError={onError}
      // className="p-6 md:p-8 w-full flex items-center justify-center"
      {...form}
    >
      <Stack gap={6} width="full">
        {/* Name input field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <Input
              type="text"
              placeholder={t('editAccount.form.placeholder.name')}
              label={t('editAccount.form.label.name')}
              required
              {...field}
            />
          )}
        />

        {/* Description textarea field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <Textarea
              placeholder={t('editAccount.form.placeholder.description')}
              label={t('editAccount.form.label.description')}
              {...field}
              value={field.value || ''}
              onChange={(e) => {
                const value = e.target.value ? e.target.value : null;
                field.onChange(value);
              }}
            />
          )}
        />

        {/* Active Switch */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <Switch
              checked={field.value}
              value={field.value ? 'true' : 'false'}
              onCheckedChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              label={t('editAccount.form.label.isActive')}
            />
          )}
        />

        <Stack justify="end" direction="row">
          <Button type="submit" className="w-fit" loading={isLoadingUpdateAccount}>
            {t('editAccount.form.saveAccount')}
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default EditAccountForm;
