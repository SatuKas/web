import { useTranslations } from 'next-intl';
import { z } from 'zod';

const useBalanceSheetFilterSchema = () => {
  const t = useTranslations();

  const balanceSheetFilterSchema = z.object({
    date: z.string().optional(),
  });

  return { balanceSheetFilterSchema };
};

export default useBalanceSheetFilterSchema;
