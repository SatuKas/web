import * as localeService from '@/services/locale';
import { getRequestConfig } from 'next-intl/server';

/**
 * Get Next.js internationalization request config.
 *
 * This function dynamically determines the user's locale using the localeService,
 * then loads the corresponding translation messages from the locales directory.
 *
 * @returns {Promise<{ locale: string, messages: Record<string, string> }>}
 *   - locale: the current user's locale code (e.g., 'en', 'id')
 *   - messages: translation key-value pairs for the selected locale
 */
export default getRequestConfig(async () => {
  // Get the user's locale, e.g., from cookies or headers
  const locale = await localeService.getLocale();

  // Dynamically import the translation messages for the detected locale
  // This enables code splitting and only loads the necessary locale file
  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
