import Button from '@/components/ui/Button';
import Combobox from '@/components/ui/Combobox';
import Form, { FormField } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Stack from '@/components/ui/Stack';
import Switch from '@/components/ui/Switch';
import Textarea from '@/components/ui/Textarea';
import {
  ACCOUNT_ASSET_TYPES,
  ACCOUNT_EQUITY_TYPES,
  ACCOUNT_EXPENSE_TYPES,
  ACCOUNT_INCOME_TYPES,
  ACCOUNT_LIABILITY_TYPES,
} from '@/constants/coa';
import useAddAccountForm from '@/hooks/module/coa/useAddAccountForm';
import { AccountCategory, AccountListData } from '@/types/client/coa';
import { generateAccountCode } from '@/utils/coa';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo } from 'react';

interface AddAccountFormProps {
  onSuccess?: () => void;
  accountList?: AccountListData[];
  bookId: string;
}

const AddAccountForm = ({ onSuccess, accountList, bookId }: AddAccountFormProps) => {
  const t = useTranslations('coa');
  const tCommon = useTranslations('common');
  const { form, onSubmit, onError, isLoadingCreateAccount } = useAddAccountForm({ onSuccess, bookId });

  const accountCategory = form.watch('category');
  const parentAccountId = form.watch('parentAccount');

  // const isOpenAccountBalance = useMemo(() => {
  //   return (
  //     accountCategory === AccountCategory.ASSET ||
  //     accountCategory === AccountCategory.LIABILITY ||
  //     accountCategory === AccountCategory.EQUITY
  //   );
  // }, [accountCategory]);

  const accountTypeOptions = useMemo(() => {
    if (accountCategory === AccountCategory.ASSET) {
      return ACCOUNT_ASSET_TYPES.map((type) => ({
        label: tCommon(`accountType.${type}`),
        value: type,
      }));
    }

    if (accountCategory === AccountCategory.LIABILITY) {
      return ACCOUNT_LIABILITY_TYPES.map((type) => ({
        label: tCommon(`accountType.${type}`),
        value: type,
      }));
    }

    if (accountCategory === AccountCategory.EQUITY) {
      return ACCOUNT_EQUITY_TYPES.map((type) => ({
        label: tCommon(`accountType.${type}`),
        value: type,
      }));
    }

    if (accountCategory === AccountCategory.INCOME) {
      return ACCOUNT_INCOME_TYPES.map((type) => ({
        label: tCommon(`accountType.${type}`),
        value: type,
      }));
    }

    if (accountCategory === AccountCategory.EXPENSE) {
      return ACCOUNT_EXPENSE_TYPES.map((type) => ({
        label: tCommon(`accountType.${type}`),
        value: type,
      }));
    }

    return [];
  }, [accountCategory, tCommon]);

  const parentAccountOptions = useMemo(() => {
    return (
      accountList?.map((account) => ({
        label: `${account.code} - ${account.name}`,
        value: account.id,
      })) || []
    );
  }, [accountList]);

  const currentParentAccount = useMemo(() => {
    const getParentAccount = accountList?.find((account) => account.id === parentAccountId);
    if (getParentAccount) {
      return getParentAccount;
    }
    return undefined;
  }, [accountList, parentAccountId]);

  const getAccountChild = useCallback(
    (parentAccountId: string) => {
      return accountList?.filter((account) => account.parentId === parentAccountId);
    },
    [accountList]
  );

  useEffect(() => {
    if (currentParentAccount) {
      form.setValue('category', currentParentAccount.category);
      form.setValue(
        'code',
        generateAccountCode(currentParentAccount.code, getAccountChild(currentParentAccount.id)?.[0]?.code)
      );
    }
  }, [currentParentAccount, form, getAccountChild]);

  useEffect(() => {
    if (accountCategory) {
      form.setValue('type', accountTypeOptions[0].value);
    }
  }, [accountCategory, accountTypeOptions, form]);

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
              placeholder={t('createAccount.form.placeholder.name')}
              label={t('createAccount.form.label.name')}
              required
              {...field}
            />
          )}
        />

        {/* Parent Account input field */}
        <FormField
          control={form.control}
          name="parentAccount"
          render={({ field }) => (
            <Combobox
              placeholder={t('createAccount.form.placeholder.parentAccount')}
              label={t('createAccount.form.label.parentAccount')}
              options={parentAccountOptions}
              fullWidth
              {...field}
            />
          )}
        />

        {/* Parent Group Switch */}
        <FormField
          control={form.control}
          name="isParentGroup"
          render={({ field }) => (
            <Switch
              value={field.value ? 'true' : 'false'}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              label={t('createAccount.form.label.isParentGroup')}
            />
          )}
        />

        {/* Code input field */}
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <Input
              type="text"
              placeholder={t('createAccount.form.placeholder.code')}
              label={t('createAccount.form.label.code')}
              required
              {...field}
            />
          )}
        />

        {/* Category input field */}
        <FormField
          control={form.control}
          name="category"
          disabled={!!currentParentAccount}
          render={({ field }) => (
            <Select
              placeholder={t('createAccount.form.placeholder.category')}
              label={t('createAccount.form.label.category')}
              options={Object.values(AccountCategory).map((category) => ({
                label: tCommon(`accountCategory.${category}`),
                value: category,
              }))}
              fullWidth
              required
              {...field}
            />
          )}
        />

        {/* Type input field */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <Select
              placeholder={t('createAccount.form.placeholder.type')}
              label={t('createAccount.form.label.type')}
              options={accountTypeOptions}
              fullWidth
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
              placeholder={t('createAccount.form.placeholder.description')}
              label={t('createAccount.form.label.description')}
              {...field}
            />
          )}
        />
        <Stack justify="end" direction="row">
          <Button type="submit" className="w-fit" loading={isLoadingCreateAccount}>
            {t('createAccount.form.saveAccount')}
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default AddAccountForm;
