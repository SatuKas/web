import { useTranslations } from 'next-intl';
import { z } from 'zod';

const useEditAccountSchema = () => {
  // Get translation function for auth form messages
  const t = useTranslations();

  // Define Zod schema for login form
  const editAccountSchema = z.object({
    name: z.string().nonempty(t('coa.editAccount.form.message.error.nameRequired')),
    description: z.string().optional(),
    isActive: z.boolean().optional().default(false),
  });

  return { editAccountSchema };
};

export default useEditAccountSchema;
