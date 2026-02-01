'use client';

import Button from '@/components/ui/Button';
import Combobox from '@/components/ui/Combobox';
import Form, { FormField } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import Stack from '@/components/ui/Stack';
import useBookDetail from '@/hooks/common/useBookDetail';
import useAccountQuery from '@/hooks/module/coa/query/useAccountQuery';
import useLedgerFilterForm from '@/hooks/module/ledger/useLedgerFilterForm';
import { LedgerFilterFormData } from '@/types/client/report';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

interface LedgerFilterFormProps {
  onFilterChange?: (data: LedgerFilterFormData | null) => void;
}

const LedgerFilterForm = ({ onFilterChange }: LedgerFilterFormProps) => {
  const t = useTranslations('ledger');
  const { book } = useBookDetail();
  const { accountList } = useAccountQuery(book?.id);
  const { form, onSubmit, handleReset } = useLedgerFilterForm({ onFilterChange });

  const accountOptions = useMemo(() => {
    return (
      accountList?.map((account) => ({
        label: `${account.code} - ${account.name}`,
        value: account.id,
      })) || []
    );
  }, [accountList]);

  return (
    <Form onSubmit={onSubmit} {...form}>
      <Stack direction="row" gap={4} align="end" className="flex-wrap">
        <FormField
          control={form.control}
          name="accountId"
          render={({ field }) => (
            <Combobox
              placeholder={t('filter.form.placeholder.account')}
              label={t('filter.form.label.account')}
              options={accountOptions}
              className="min-w-[250px]"
              {...field}
            />
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <Input
              type="date"
              placeholder={t('filter.form.placeholder.startDate')}
              label={t('filter.form.label.startDate')}
              className="min-w-[180px]"
              {...field}
            />
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <Input
              type="date"
              placeholder={t('filter.form.placeholder.endDate')}
              label={t('filter.form.label.endDate')}
              className="min-w-[180px]"
              {...field}
            />
          )}
        />

        <Stack direction="row" gap={2}>
          <Button type="submit" className="w-fit">
            {t('filter.form.button.apply')}
          </Button>
          <Button type="button" variant="outline" className="w-fit" onClick={handleReset}>
            {t('filter.form.button.reset')}
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default LedgerFilterForm;
