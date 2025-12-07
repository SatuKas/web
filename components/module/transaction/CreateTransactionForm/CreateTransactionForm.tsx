'use client';

import Button from '@/components/ui/Button';
import Combobox from '@/components/ui/Combobox';
import Form, { FormField } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Stack from '@/components/ui/Stack';
import Textarea from '@/components/ui/Textarea';
import useBookDetail from '@/hooks/common/useBookDetail';
import useAccountQuery from '@/hooks/module/coa/query/useAccountQuery';
import useCreateTransactionForm from '@/hooks/module/transaction/useCreateTransactionForm';
import { BookModule, JournalType } from '@/types/api/transaction';
import { AccountPosition } from '@/types/client/coa';
import { TransactionEntryData } from '@/types/client/transaction';
import { Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

interface CreateTransactionFormProps {
  onSuccess?: () => void;
}

const CreateTransactionForm = ({ onSuccess }: CreateTransactionFormProps) => {
  const t = useTranslations('transaction');
  const tCommon = useTranslations('common');
  const { book } = useBookDetail();
  const { form, onSubmit, onError, isLoadingCreateTransaction } = useCreateTransactionForm({
    onSuccess,
    bookId: book?.id || '',
  });

  const { accountList } = useAccountQuery(book?.id);

  const entries = form.watch('entries');

  const accountOptions = useMemo(() => {
    return (
      accountList?.map((account) => ({
        label: `${account.code} - ${account.name}`,
        value: account.id,
      })) || []
    );
  }, [accountList]);

  const refTypeOptions = useMemo(
    () => [
      {
        label: tCommon('bookModule.EXPENSE'),
        value: BookModule.EXPENSE,
      },
      {
        label: tCommon('bookModule.INCOME'),
        value: BookModule.INCOME,
      },
      {
        label: tCommon('bookModule.TRANSFER'),
        value: BookModule.TRANSFER,
      },
    ],
    [tCommon]
  );

  const accountPositionOptions = useMemo(
    () => [
      {
        label: tCommon('accountPosition.DEBIT'),
        value: AccountPosition.DEBIT,
      },
      {
        label: tCommon('accountPosition.CREDIT'),
        value: AccountPosition.CREDIT,
      },
    ],
    [tCommon]
  );

  const transactionTypeOptions = useMemo(
    () => [
      {
        label: tCommon('journalType.GENERAL'),
        value: JournalType.GENERAL,
      },
    ],
    [tCommon]
  );

  const totalDebit = useMemo(() => {
    return entries.reduce(
      (sum, entry) => sum + (entry.accountPosition === AccountPosition.DEBIT ? entry.amount || 0 : 0),
      0
    );
  }, [entries]);

  const totalCredit = useMemo(() => {
    return entries.reduce(
      (sum, entry) => sum + (entry.accountPosition === AccountPosition.CREDIT ? entry.amount || 0 : 0),
      0
    );
  }, [entries]);

  const isBalanceEqual = totalDebit === totalCredit && totalDebit > 0;

  const handleAddEntry = () => {
    const newPosition = entries.length + 1;
    const newEntry: TransactionEntryData = {
      accountId: '',
      position: newPosition,
      amount: null,
      accountPosition: newPosition % 2 === 0 ? AccountPosition.CREDIT : AccountPosition.DEBIT,
    };
    form.setValue('entries', [...entries, newEntry]);
  };

  const handleRemoveEntry = (index: number) => {
    if (entries.length <= 2) return;
    const newEntries = entries
      .filter((_, i) => i !== index)
      .map((entry, i) => ({
        ...entry,
        position: i + 1,
      }));
    form.setValue('entries', newEntries);
  };

  const handleEntryChange = (index: number, field: keyof TransactionEntryData, value: string | number | null) => {
    const newEntries = [...entries];
    newEntries[index] = {
      ...newEntries[index],
      [field]: value,
    };

    form.setValue('entries', newEntries);
  };

  return (
    <Form onSubmit={onSubmit} onError={onError} {...form}>
      <Stack gap={6} width="full">
        {/* Date field */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <Input
              type="date"
              placeholder={t('createTransaction.form.placeholder.date')}
              label={t('createTransaction.form.label.date')}
              required
              className="w-fit"
              {...field}
            />
          )}
        />

        {/* Description field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <Textarea
              placeholder={t('createTransaction.form.placeholder.description')}
              label={t('createTransaction.form.label.description')}
              required
              {...field}
            />
          )}
        />

        {/* Type field */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <Select
              placeholder={t('createTransaction.form.placeholder.type')}
              label={t('createTransaction.form.label.type')}
              options={transactionTypeOptions}
              fullWidth
              required
              {...field}
            />
          )}
        />

        {/* Ref Type field */}
        <FormField
          control={form.control}
          name="refType"
          render={({ field }) => (
            <Select
              placeholder={t('createTransaction.form.placeholder.refType')}
              label={t('createTransaction.form.label.refType')}
              options={refTypeOptions}
              fullWidth
              required
              {...field}
            />
          )}
        />

        {/* Entries section */}
        <Stack gap={4} width="full">
          <Stack direction="row" justify="between" align="center">
            <label className="text-sm font-medium">
              {t('createTransaction.form.label.entries')} <span className="text-red-500">*</span>
            </label>
            <Button type="button" variant="outline" size="sm" onClick={handleAddEntry}>
              <Plus className="size-4" /> {t('createTransaction.form.button.addEntry')}
            </Button>
          </Stack>

          {entries.map((entry, index) => (
            <Stack key={index} gap={3} className="border rounded-lg p-4">
              <Stack direction="row" justify="between" align="center">
                <span className="text-sm font-medium">
                  {t('createTransaction.form.label.entry')} {entry.position}
                </span>
                {entries.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveEntry(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                )}
              </Stack>

              <FormField
                control={form.control}
                name={`entries.${index}.accountId`}
                render={({ field }) => (
                  <Combobox
                    placeholder={t('createTransaction.form.placeholder.account')}
                    label={t('createTransaction.form.label.account')}
                    options={accountOptions}
                    fullWidth
                    required
                    {...field}
                  />
                )}
              />

              {/* Account Position field */}
              <FormField
                control={form.control}
                name={`entries.${index}.accountPosition`}
                render={({ field }) => (
                  <Select
                    placeholder={t('createTransaction.form.placeholder.accountPosition')}
                    label={t('createTransaction.form.label.accountPosition')}
                    options={accountPositionOptions}
                    fullWidth
                    required
                    {...field}
                  />
                )}
              />

              <FormField
                control={form.control}
                name={`entries.${index}.amount`}
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder={t('createTransaction.form.placeholder.amount')}
                    label={t('createTransaction.form.label.amount')}
                    fullWidth
                    required
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => {
                      const value = e.target.value ? parseFloat(e.target.value) : null;
                      handleEntryChange(index, 'amount', value);
                    }}
                  />
                )}
              />
            </Stack>
          ))}

          {/* Balance summary */}
          <Stack direction="row" justify="end" gap={4} className="pt-2 border-t">
            <Stack direction="row" gap={2} align="center">
              <span className="text-sm font-medium">{t('createTransaction.form.label.totalDebit')}:</span>
              <span className="text-sm">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalDebit)}
              </span>
            </Stack>
            <Stack direction="row" gap={2} align="center">
              <span className="text-sm font-medium">{t('createTransaction.form.label.totalCredit')}:</span>
              <span className="text-sm">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalCredit)}
              </span>
            </Stack>
            {!isBalanceEqual && (
              <span className="text-sm text-destructive">
                {t('createTransaction.form.message.error.balanceNotEqual')}
              </span>
            )}
          </Stack>
        </Stack>

        <Stack justify="end" direction="row">
          <Button type="submit" className="w-fit" loading={isLoadingCreateTransaction} disabled={!isBalanceEqual}>
            {t('createTransaction.form.button.submit')}
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default CreateTransactionForm;
