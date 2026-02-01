import { LEDGER_FILTER_FORM_DEFAULT_VALUES } from '@/constants/ledger';
import { LedgerFilterFormData } from '@/types/client/report';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import useLedgerFilterSchema from './useLedgerFilterSchema';

interface UseLedgerFilterFormProps {
  onFilterChange?: (data: LedgerFilterFormData | null) => void;
}

const useLedgerFilterForm = ({ onFilterChange }: UseLedgerFilterFormProps = {}) => {
  const { ledgerFilterSchema } = useLedgerFilterSchema();

  const form = useForm<LedgerFilterFormData>({
    resolver: zodResolver(ledgerFilterSchema),
    defaultValues: LEDGER_FILTER_FORM_DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<LedgerFilterFormData> = (data) => {
    onFilterChange?.(data);
  };

  const handleReset = () => {
    form.reset();
    onFilterChange?.(null);
  };

  return { form, onSubmit, handleReset };
};

export default useLedgerFilterForm;
