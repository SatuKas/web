'use server';
import { cookies } from 'next/headers';

import { LOCALE_AVAILABLE, LOCALE_COOKIE_KEY, LOCALE_DEFAULT } from '@/constants/locale';
import { Locale } from '@/types/client/locale';

/**
 * Get the current locale from cookies.
 * If the cookie is not set, will fallback to the default locale.
 * @returns {Promise<Locale>} The current locale value.
 */
export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();

  // Try to get the locale from cookies, fallback to default if not found
  return (cookieStore.get(LOCALE_COOKIE_KEY)?.value as Locale) ?? LOCALE_DEFAULT;
}

/**
 * Set the locale value in cookies.
 * @param {string} locale - The locale code to be set (e.g., 'en', 'id').
 */
export async function setLocale(locale: string) {
  const cookieStore = await cookies();

  // Set the locale cookie with the provided value
  cookieStore.set(LOCALE_COOKIE_KEY, locale);
}

/**
 * Get the list of available locales.
 * @returns {string[]} Array of available locale codes.
 */
export async function getAvaliableLocales() {
  // Return the list of supported locales from constant
  return LOCALE_AVAILABLE;
}
