'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

/**
 * ThemeProvider component to wrap the app with theme context.
 * Uses next-themes to enable system-based dark/light mode switching.
 *
 * @param children - React children nodes to be rendered within the theme context
 */
const ThemeProvider = ({ children }: PropsWithChildren) => {
  // NextThemeProvider handles theme switching and applies the theme class to the HTML element.
  // attribute="class": sets the theme by adding a class to the HTML element.
  // defaultTheme="system": uses the user's system preference as the default theme.
  // enableSystem: allows switching based on system settings.
  // disableTransitionOnChange: disables CSS transitions when changing themes for smoother UX.
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemeProvider>
  );
};

export default ThemeProvider;
