'use server';
import { cookies } from 'next/headers';

import { LOCALE_AVAILABLE, LOCALE_COOKIE_KEY, LOCALE_DEFAULT } from '@/constants/locale';
import { Locale } from '@/types/client/locale';

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();

  return (cookieStore.get(LOCALE_COOKIE_KEY)?.value as Locale) ?? LOCALE_DEFAULT;
}

export async function setLocale(locale: string) {
  const cookieStore = await cookies();

  cookieStore.set(LOCALE_COOKIE_KEY, locale);
}

export async function getAvaliableLocales() {
  return LOCALE_AVAILABLE;
}
