import { BALANCE_SHEET_FILTER_FORM_DEFAULT_VALUES } from '@/constants/balanceSheet';
import { BalanceSheetFilterFormData } from '@/types/client/report';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import useBalanceSheetFilterSchema from './useBalanceSheetFilterSchema';

interface UseBalanceSheetFilterFormProps {
  onFilterChange?: (data: BalanceSheetFilterFormData) => void;
}

const useBalanceSheetFilterForm = ({ onFilterChange }: UseBalanceSheetFilterFormProps = {}) => {
  const { balanceSheetFilterSchema } = useBalanceSheetFilterSchema();

  const form = useForm<BalanceSheetFilterFormData>({
    resolver: zodResolver(balanceSheetFilterSchema),
    defaultValues: BALANCE_SHEET_FILTER_FORM_DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<BalanceSheetFilterFormData> = (data) => {
    onFilterChange?.(data);
  };

  const handleReset = () => {
    form.reset();
    onFilterChange?.(BALANCE_SHEET_FILTER_FORM_DEFAULT_VALUES);
  };

  return { form, onSubmit, handleReset };
};

export default useBalanceSheetFilterForm;
