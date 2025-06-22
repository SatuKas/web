export enum Locale {
  ID = 'id',
  EN = 'en',
}
import { LocaleMessages } from '@/types/global';
import { MessageKeys, NestedKeyOf } from 'next-intl';

export type TranslationKeys = MessageKeys<LocaleMessages, NestedKeyOf<LocaleMessages>>;
