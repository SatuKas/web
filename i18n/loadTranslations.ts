import { Locale } from '@/types/client/locale';
import { createTranslator } from 'next-intl';

/**
 * Loads translation messages for the given locale and creates a translator instance.
 *
 * @param locale - The locale code (e.g., 'en', 'id') to load translations for.
 * @returns A translator instance with the loaded messages for the specified locale.
 *
 * Note:
 * - This function uses dynamic import to load the JSON file for the requested locale.
 * - The imported messages are accessed via the `.default` property because of ES module import behavior.
 */
export const loadTranslations = async (locale: Locale) => {
  // Dynamically import the translation JSON file based on the locale.
  const messages = await import(`./locales/${locale}.json`);
  // Create and return a translator instance with the loaded messages.
  return createTranslator({ locale, messages: messages.default });
};
