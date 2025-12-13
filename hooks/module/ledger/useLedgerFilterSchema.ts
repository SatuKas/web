import { z } from 'zod';

const useLedgerFilterSchema = () => {
  const ledgerFilterSchema = z.object({
    accountId: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  });

  return { ledgerFilterSchema };
};

export default useLedgerFilterSchema;
