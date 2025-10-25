import { AccountCategory, AccountType } from '@/types/client/coa';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

const useAddAccountSchema = () => {
  // Get translation function for auth form messages
  const t = useTranslations();

  // Define Zod schema for login form
  const addAccountSchema = z.object({
    name: z.string().nonempty(t('coa.createAccount.form.message.error.nameRequired')),
    code: z.string().nonempty(t('coa.createAccount.form.message.error.codeRequired')),
    type: z.nativeEnum(AccountType, {
      required_error: t('coa.createAccount.form.message.error.typeRequired'),
    }),
    balance: z.number().optional(),
    parentAccount: z.string().optional(),
    category: z.nativeEnum(AccountCategory, {
      required_error: t('coa.createAccount.form.message.error.categoryRequired'),
    }),
    description: z.string().optional(),
    isParentGroup: z.boolean().optional().default(false),
  });

  return { addAccountSchema };
};

export default useAddAccountSchema;
