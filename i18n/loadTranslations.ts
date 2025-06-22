import { Locale } from '@/types/client/locale';
import { createTranslator } from 'next-intl';

export const loadTranslations = async (locale: Locale) => {
  const messages = await import(`./locales/${locale}.json`);
  return createTranslator({ locale, messages: messages.default });
};
