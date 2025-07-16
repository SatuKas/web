import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { PropsWithChildren } from 'react';

/**
 * TranslationProvider is a higher-order component that wraps its children
 * with NextIntlClientProvider, providing internationalization (i18n) context.
 *
 * @param {PropsWithChildren} props - React props with children to be rendered inside the provider.
 *   - children: ReactNode - The components that will have access to the translation context.
 * @returns {JSX.Element} The wrapped children with translation context.
 */
const TranslationProvider = async ({ children }: PropsWithChildren) => {
  // Fetch translation messages for the current locale from the server.
  const messages = await getMessages();

  // Provide the fetched messages to all child components via NextIntlClientProvider.
  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
};

export default TranslationProvider;
