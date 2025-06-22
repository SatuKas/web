// Type representing the structure of the translation messages imported from id.json
type LocaleMessages = typeof import('@/i18n/locales/id.json');

declare module 'next-intl' {
  interface AppConfig {
    Messages: LocaleMessages;
  }
}

// Utility type that creates dot-notation string literal types from nested object structure
// For example: { a: { b: string } } becomes "a" | "a.b"
// Used for type-safe translation key access
export type NestedKey<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends object ? `${K}` | `${K}.${NestedKey<T[K]>}` : `${K}`;
    }[keyof T & (string | number)]
  : never;
