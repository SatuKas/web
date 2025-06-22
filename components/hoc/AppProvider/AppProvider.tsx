import { PropsWithChildren } from 'react';
import ThemeProvider from '../ThemeProvider';
import TranslationProvider from '../TranslationProvider';

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <TranslationProvider>{children}</TranslationProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
