'use client';

import Button from '@/components/ui/Button';
import Form, { FormField } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import Stack from '@/components/ui/Stack';
import useBalanceSheetFilterForm from '@/hooks/module/balanceSheet/useBalanceSheetFilterForm';
import { BalanceSheetFilterFormData } from '@/types/client/report';
import { useTranslations } from 'next-intl';

interface BalanceSheetFilterFormProps {
  onFilterChange?: (data: BalanceSheetFilterFormData) => void;
}

const BalanceSheetFilterForm = ({ onFilterChange }: BalanceSheetFilterFormProps) => {
  const t = useTranslations('balanceSheet');
  const { form, onSubmit, handleReset } = useBalanceSheetFilterForm({ onFilterChange });

  return (
    <Form onSubmit={onSubmit} {...form}>
      <Stack direction="row" gap={4} align="end" className="flex-wrap">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <Input
              type="date"
              placeholder={t('filter.form.placeholder.date')}
              label={t('filter.form.label.date')}
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

export default BalanceSheetFilterForm;
