import { PropsWithChildren } from 'react';
import QueryProvider from '../QueryProvider';
import ThemeProvider from '../ThemeProvider';
import ToastProvider from '../ToastProvider';
import TranslationProvider from '../TranslationProvider';

/**
 * AppProvider is a higher-order component that wraps the application with
 * several context providers to enable global features:
 * - ThemeProvider: handles theme and color mode for the app.
 * - ToastProvider: provides toast notification context.
 * - QueryProvider: sets up React Query for data fetching and caching.
 * - TranslationProvider: enables i18n translation context.
 *
 * @param children - React children nodes to be rendered inside all providers.
 */
const AppProvider = ({ children }: PropsWithChildren) => {
  // The order of providers matters: ThemeProvider at the top to ensure theme context is available for all children.
  return (
    <ThemeProvider>
      {/* ToastProvider supplies toast notification context to the app */}
      <ToastProvider>
        {/* QueryProvider enables React Query for data fetching and caching */}
        <QueryProvider>
          {/* TranslationProvider enables i18n translation context */}
          <TranslationProvider>{children}</TranslationProvider>
        </QueryProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
