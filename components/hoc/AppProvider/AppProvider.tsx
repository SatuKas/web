import { PropsWithChildren } from 'react';
import QueryProvider from '../QueryProvider';
import ThemeProvider from '../ThemeProvider';
import ToastProvider from '../ToastProvider';
import TranslationProvider from '../TranslationProvider';

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <QueryProvider>
          <TranslationProvider>{children}</TranslationProvider>
        </QueryProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
