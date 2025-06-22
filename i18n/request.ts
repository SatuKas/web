import * as localeService from '@/services/locale';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  const locale = await localeService.getLocale();

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
