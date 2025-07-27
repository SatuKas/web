import { useTranslations } from 'next-intl';
import { z } from 'zod';

const useCreateBookSchema = () => {
  // Get translation function for auth form messages
  const t = useTranslations();

  // Define Zod schema for login form
  const createBookSchema = z.object({
    name: z.string().nonempty(t('dashboardWorkspace.bookList.createBook.form.message.error.nameRequired')),
    description: z
      .string()
      .max(200, t('common.message.error.maxCharacter', { max: 200 }))
      .optional(),
  });

  return { createBookSchema };
};

export default useCreateBookSchema;
