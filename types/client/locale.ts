/**
 * Enum for supported locales in the application.
 * - ID: Indonesian locale code
 * - EN: English locale code
 */
export enum Locale {
  ID = 'id', // Indonesian language code
  EN = 'en', // English language code
}

import { LocaleMessages } from '@/types/global';
import { MessageKeys, NestedKeyOf } from 'next-intl';

/**
 * TranslationKeys type is used to represent all possible translation key paths
 * for the LocaleMessages object, including nested keys.
 * This helps with type-safe access to translation strings.
 */
export type TranslationKeys = MessageKeys<LocaleMessages, NestedKeyOf<LocaleMessages>>;
