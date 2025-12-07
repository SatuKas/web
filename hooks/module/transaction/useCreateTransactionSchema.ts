import { BookModule, JournalType } from '@/types/api/transaction';
import { AccountPosition } from '@/types/client/coa';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

const useCreateTransactionSchema = () => {
  const t = useTranslations();

  const createTransactionSchema = z.object({
    description: z.string().nonempty(t('transaction.createTransaction.form.message.error.descriptionRequired')),
    date: z.string().nonempty(t('transaction.createTransaction.form.message.error.dateRequired')),
    type: z.nativeEnum(JournalType, {
      required_error: t('transaction.createTransaction.form.message.error.typeRequired'),
    }),
    refType: z.nativeEnum(BookModule, {
      required_error: t('transaction.createTransaction.form.message.error.refTypeRequired'),
    }),
    entries: z
      .array(
        z
          .object({
            accountId: z.string().nonempty(t('transaction.createTransaction.form.message.error.accountRequired')),
            position: z.number().min(1),
            amount: z.number().min(1).nullable(),
            accountPosition: z.nativeEnum(AccountPosition, {
              required_error: t('transaction.createTransaction.form.message.error.accountPositionRequired'),
            }),
          })
          .refine(
            (entry) => {
              return (
                (entry.accountPosition === AccountPosition.DEBIT && entry.amount && entry.amount > 0) ||
                (entry.accountPosition === AccountPosition.CREDIT && entry.amount && entry.amount > 0)
              );
            },
            {
              message: t('transaction.createTransaction.form.message.error.amountRequired'),
            }
          )
      )
      .min(2, t('transaction.createTransaction.form.message.error.entriesMin'))
      .refine(
        (entries) => {
          const totalDebit = entries.reduce(
            (sum, entry) => sum + (entry.accountPosition === AccountPosition.DEBIT ? entry.amount || 0 : 0),
            0
          );
          const totalCredit = entries.reduce(
            (sum, entry) => sum + (entry.accountPosition === AccountPosition.CREDIT ? entry.amount || 0 : 0),
            0
          );
          return totalDebit === totalCredit;
        },
        {
          message: t('transaction.createTransaction.form.message.error.balanceNotEqual'),
        }
      ),
  });

  return { createTransactionSchema };
};

export default useCreateTransactionSchema;
